package com.hv.springboot.fitnesstrackingapp.services.impl.test;


import com.hv.springboot.fitnesstrackingapp.entity.*;
import com.hv.springboot.fitnesstrackingapp.repositories.UserRepository;
import com.hv.springboot.fitnesstrackingapp.repositories.TrainerRepository;
import com.hv.springboot.fitnesstrackingapp.services.UserService;
import com.hv.springboot.fitnesstrackingapp.services.impl.UserServiceImpl;
import com.hv.springboot.fitnesstrackingapp.services.TrainerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private UserEntity user;

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setCity("City");
        user.setState("State");
        user.setCountry("Country");
        user.setRole(UserRole.ROLE_USER);
        user.setGroupStatus(GroupStatus.NULL);
    }

    @Test
    void testSaveOrUpdateUser_NewUser() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        userService.saveOrUpdateUser("testuser", "test@example.com", "password", "City", "State", "Country");

        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    void testAuthenticateUser_Success() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        Optional<UserEntity> result = userService.authenticateUser("test@example.com", "password");

        assertTrue(result.isPresent());
    }

    @Test
    void testAuthenticateUser_Failure() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        Optional<UserEntity> result = userService.authenticateUser("test@example.com", "wrongpassword");

        assertFalse(result.isPresent());
    }
    @Test
    void testGetAllUsers() {
        List<UserEntity> users = Arrays.asList(user, new UserEntity());
        when(userRepository.findAll()).thenReturn(users);
        List<UserEntity> result = userService.getAllUsers();
        assertEquals(users, result);
    }

    @Test
    void testGetUserById_Found() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        Optional<UserEntity> result = userService.getUserById(1L);
        assertTrue(result.isPresent());
        assertEquals(user, result.get());
    }

    @Test
    void testGetUserById_NotFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());
        Optional<UserEntity> result = userService.getUserById(1L);
        assertFalse(result.isPresent());
    }

//    @Test
//    void testSendGroupInvitation_NewInvitation() {
//        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
//        ResponseEntity<Object> response = userService.sendGroupInvitation(1L, 1L, "morning");
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        verify(userRepository, times(1)).save(any(UserEntity.class));
//    }
    @Test
    void testSendGroupInvitation_NewInvitation() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        user.setGroupStatus(GroupStatus.NULL);
        ResponseEntity<Object> response = userService.sendGroupInvitation(1L, 1L, "morning");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Trainee invited to the morning group.", response.getBody());
        assertEquals(GroupStatus.INVITED, user.getGroupStatus());
        assertEquals("morning", user.getGroupType());
        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    void testSendGroupInvitation_AlreadyInvited() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        user.setGroupStatus(GroupStatus.INVITED);
        user.setGroupType("morning");
        ResponseEntity<Object> response = userService.sendGroupInvitation(1L, 1L, "morning");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Trainee already invited to the morning group.", response.getBody());
        assertEquals(GroupStatus.INVITED, user.getGroupStatus());
        assertEquals("morning", user.getGroupType());
        verify(userRepository, times(0)).save(any(UserEntity.class));
    }

    @Test
    void testSendGroupInvitation_TraineeNotFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());
        ResponseEntity<Object> response = userService.sendGroupInvitation(1L, 1L, "morning");
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Trainee not found.", response.getBody());
    }

    @Test
    void testAcceptGroupInvitation() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        userService.acceptGroupInvitation(1L, "morning");

        assertEquals(GroupStatus.ACCEPTED, user.getGroupStatus());
        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    void testRejectGroupInvitation() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        userService.rejectGroupInvitation(1L);

        assertEquals(GroupStatus.REJECTED, user.getGroupStatus());
        verify(userRepository, times(1)).save(any(UserEntity.class));
    }
}