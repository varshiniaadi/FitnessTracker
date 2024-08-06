//
//package com.hv.springboot.fitnesstrackingapp.controllers.test;
//
//import static org.hamcrest.Matchers.*;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import com.hv.springboot.fitnesstrackingapp.controllers.UserController;
//import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;
//import com.hv.springboot.fitnesstrackingapp.services.UserService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//@ExtendWith(MockitoExtension.class)
//public class UserControllerTest {
//
//    @Mock
//    private UserService userService;
//
//    @InjectMocks
//    private UserController userController;
//
//    @Autowired
//    private MockMvc mockMvc;
//    @BeforeEach
//    public void setUp() {
//        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
//    }
//
//    @Test
//    public void testSaveUser() throws Exception {
//        UserEntity user = new UserEntity();
//        user.setUsername("Test User");
//        user.setEmail("user@example.com");
//        user.setPassword("password");
//        user.setCity("City");
//        user.setState("State");
//        user.setCountry("Country");
//
//        mockMvc.perform(post("/trainee/createuser")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(asJsonString(user)))
//                .andExpect(status().isCreated())
//                .andExpect(content().string("User created successfully"));
//
//        verify(userService).saveOrUpdateUser(any(), any(), any(), any(), any(), any());
//    }
//    
//
//    @Test
//    public void testLoginUser_ValidCredentials() throws Exception {
//        UserEntity user = new UserEntity();
//        user.setId(1L);
//        user.setUsername("testuser");
//        user.setEmail("testuser@example.com");
//        user.setPassword("testpass");
//
//        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
//
//        when(userService.authenticateUser(any(), any())).thenReturn(Optional.of(user));
//
//        mockMvc.perform(post("/trainee/loginuser")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content("{ \"email\": \"testuser@example.com\", \"password\": \"testpass\" }")
//                .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id", is(1)))
//                .andExpect(jsonPath("$.username", is("testuser")));
//    }
//
//    @Test
//    public void testLoginUser_InvalidCredentials() throws Exception {
//        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
//
//        when(userService.authenticateUser(any(), any())).thenReturn(Optional.empty());
//
//        mockMvc.perform(post("/trainee/loginuser")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content("{ \"email\": \"invalid@example.com\", \"password\": \"invalidpass\" }")
//                .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isUnauthorized())
//                .andExpect(content().string(containsString("Invalid username or password")));
//    }
//
//    @Test
//    public void testGetUsers() throws Exception {
//        List<UserEntity> users = new ArrayList<>();
//        UserEntity user1 = new UserEntity();
//        user1.setId(1L);
//        user1.setUsername("user1");
//        user1.setEmail("user1@example.com");
//        users.add(user1);
//
//        UserEntity user2 = new UserEntity();
//        user2.setId(2L);
//        user2.setUsername("user2");
//        user2.setEmail("user2@example.com");
//        users.add(user2);
//
//        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
//
//        when(userService.getAllUsers()).thenReturn(users);
//
//        mockMvc.perform(get("/trainee/users")
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hasSize(2)))
//                .andExpect(jsonPath("$[0].id", is(1)))
//                .andExpect(jsonPath("$[0].username", is("user1")))
//                .andExpect(jsonPath("$[1].id", is(2)))
//                .andExpect(jsonPath("$[1].username", is("user2")));
//    }
//
//    @Test
//    public void testGetUserById_ValidId() throws Exception {
//        UserEntity user = new UserEntity();
//        user.setId(1L);
//        user.setUsername("testuser");
//        user.setEmail("testuser@example.com");
//
//        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
//
//        when(userService.getUserById(1L)).thenReturn(Optional.of(user));
//
//        mockMvc.perform(get("/trainee/users/1")
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id", is(1)))
//                .andExpect(jsonPath("$.username", is("testuser")));
//    }
//
//    @Test
//    public void testGetUserById_InvalidId() throws Exception {
//        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
//
//        when(userService.getUserById(1L)).thenReturn(Optional.empty());
//
//        mockMvc.perform(get("/trainee/users/1")
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isNotFound());
//    }
//    private String asJsonString(final Object obj) {
//        try {
//            return new ObjectMapper().writeValueAsString(obj);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//}
//
package com.hv.springboot.fitnesstrackingapp.controllers.test;

import com.hv.springboot.fitnesstrackingapp.controllers.UserController;
import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;
import com.hv.springboot.fitnesstrackingapp.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        // Mocking setup if needed
    }

    @Test
    public void testSaveUser_Success() {
        UserEntity newUser = new UserEntity();
        newUser.setUsername("testUser");
        newUser.setEmail("test@example.com");
        newUser.setPassword("password");
        newUser.setCity("City");
        newUser.setState("State");
        newUser.setCountry("Country");

        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");

        // Mocking the void method call
        doNothing().when(userService).saveOrUpdateUser(
                eq("testUser"), eq("test@example.com"), eq("password"),
                eq("City"), eq("State"), eq("Country"));

        ResponseEntity<String> actualResponse = userController.saveUser(newUser);

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());
    }

    @Test
    public void testSaveUser_Error() {
        UserEntity newUser = new UserEntity();
        newUser.setUsername("testUser");
        newUser.setEmail("test@example.com");
        newUser.setPassword("password");
        newUser.setCity("City");
        newUser.setState("State");
        newUser.setCountry("Country");

        // Mocking the void method call to throw a RuntimeException
        doThrow(new RuntimeException("Database connection failed"))
                .when(userService).saveOrUpdateUser(
                        any(), any(), any(), any(), any(), any());

        ResponseEntity<String> actualResponse = userController.saveUser(newUser);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, actualResponse.getStatusCode());
        assertEquals("Error creating user: Database connection failed", actualResponse.getBody());
    }

    @Test
    public void testLoginUser_Success() {
        UserEntity loginUser = new UserEntity();
        loginUser.setEmail("test@example.com");
        loginUser.setPassword("password");

        UserEntity mockUser = new UserEntity();
        mockUser.setId(1L);
        mockUser.setUsername("testUser");

        when(userService.authenticateUser(eq("test@example.com"), eq("password")))
                .thenReturn(Optional.of(mockUser));

        ResponseEntity<Object> expectedResponse = ResponseEntity.ok().body("{\"id\": 1, \"username\": \"testUser\"}");

        ResponseEntity<Object> actualResponse = userController.loginUser(loginUser);

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());
    }

    @Test
    public void testLoginUser_Unauthorized() {
        UserEntity loginUser = new UserEntity();
        loginUser.setEmail("test@example.com");
        loginUser.setPassword("password");

        when(userService.authenticateUser(any(), any()))
                .thenReturn(Optional.empty());

        ResponseEntity<Object> actualResponse = userController.loginUser(loginUser);

        assertEquals(HttpStatus.UNAUTHORIZED, actualResponse.getStatusCode());
        assertEquals("Invalid username or password", actualResponse.getBody());
    }

    @Test
    public void testLoginUser_Error() {
        UserEntity loginUser = new UserEntity();
        loginUser.setEmail("test@example.com");
        loginUser.setPassword("password");

        when(userService.authenticateUser(any(), any()))
                .thenThrow(new RuntimeException("Internal server error"));

        ResponseEntity<Object> actualResponse = userController.loginUser(loginUser);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, actualResponse.getStatusCode());
        assertEquals("Error during login: Internal server error", actualResponse.getBody());
    }

    @Test
    public void testGetUsers_Success() {
        List<UserEntity> mockUsers = Arrays.asList(
                new UserEntity(1L, "user1", "user1@example.com", null, null, null, "City1", "State1", "Country1", null),
                new UserEntity(2L, "user2", "user2@example.com", null, null, null, "City2", "State2", "Country2", null)
        );

        when(userService.getAllUsers()).thenReturn(mockUsers);

        ResponseEntity<List<UserEntity>> expectedResponse = ResponseEntity.ok(mockUsers);

        ResponseEntity<List<UserEntity>> actualResponse = userController.getUsers();

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());
    }

    @Test
    public void testGetUsers_Error() {
        when(userService.getAllUsers()).thenThrow(new RuntimeException("Database connection error"));

        ResponseEntity<List<UserEntity>> actualResponse = userController.getUsers();

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, actualResponse.getStatusCode());
        assertEquals(null, actualResponse.getBody());
    }

    @Test
    public void testGetUserById_Success() {
        Long userId = 1L;
        UserEntity mockUser = new UserEntity(userId, "testUser", "test@example.com", null, null, null, "City", "State", "Country", null);

        when(userService.getUserById(eq(userId))).thenReturn(Optional.of(mockUser));

        ResponseEntity<UserEntity> expectedResponse = ResponseEntity.ok(mockUser);

        ResponseEntity<UserEntity> actualResponse = userController.getUserById(userId);

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());
    }

    @Test
    public void testGetUserById_NotFound() {
        Long userId = 1L;

        when(userService.getUserById(any())).thenReturn(Optional.empty());

        ResponseEntity<UserEntity> actualResponse = userController.getUserById(userId);

        assertEquals(HttpStatus.NOT_FOUND, actualResponse.getStatusCode());
        assertEquals(null, actualResponse.getBody());
    }

    @Test
    public void testGetUserById_Error() {
        Long userId = 1L;

        when(userService.getUserById(any())).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<UserEntity> actualResponse = userController.getUserById(userId);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, actualResponse.getStatusCode());
        assertEquals(null, actualResponse.getBody());
    }
}

