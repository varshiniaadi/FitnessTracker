package com.hv.springboot.fitnesstrackingapp.services.impl.test;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.util.Optional;

import com.hv.springboot.fitnesstrackingapp.entity.TrainerEntity;
import com.hv.springboot.fitnesstrackingapp.entity.UserRole;
import com.hv.springboot.fitnesstrackingapp.repositories.TrainerRepository;
import com.hv.springboot.fitnesstrackingapp.services.UserService;
import com.hv.springboot.fitnesstrackingapp.services.impl.TrainerServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Arrays;

public class TrainerServiceImplTest {

    @Mock
    private TrainerRepository trainerRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private TrainerServiceImpl trainerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveOrUpdateTrainer_NewTrainer() {
        String username = "trainer1";
        String email = "trainer1@example.com";
        String password = "password";
        String city = "City1";
        String state = "State1";
        String country = "Country1";

        when(trainerRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(trainerRepository.save(any(TrainerEntity.class))).thenAnswer(i -> i.getArguments()[0]);

        trainerService.saveOrUpdateTrainer(username, email, password, city, state, country);

        verify(trainerRepository, times(1)).save(any(TrainerEntity.class));
    }

    @Test
    public void testSaveOrUpdateTrainer_ExistingTrainer() {
        String username = "trainer1";
        String email = "trainer1@example.com";
        String password = "password";
        String city = "City1";
        String state = "State1";
        String country = "Country1";

        TrainerEntity existingTrainer = new TrainerEntity(1L, username, email, "oldPassword", city, state, country, UserRole.ROLE_ADMIN);

        when(trainerRepository.findByEmail(anyString())).thenReturn(Optional.of(existingTrainer));
        when(trainerRepository.save(any(TrainerEntity.class))).thenAnswer(i -> i.getArguments()[0]);

        trainerService.saveOrUpdateTrainer(username, email, password, city, state, country);

        verify(trainerRepository, times(1)).save(any(TrainerEntity.class));
        assertEquals(password, existingTrainer.getPassword());
    }

    @Test
    public void testAuthenticateTrainer_Success() {
        String email = "trainer1@example.com";
        String password = "password";

        TrainerEntity trainer = new TrainerEntity(1L, "trainer1", email, password, "City1", "State1", "Country1", UserRole.ROLE_ADMIN);

        when(trainerRepository.findByEmail(anyString())).thenReturn(Optional.of(trainer));

        Optional<TrainerEntity> authenticatedTrainer = trainerService.authenticateTrainer(email, password);

        assertEquals(trainer, authenticatedTrainer.get());
    }

    @Test
    public void testAuthenticateTrainer_Failure() {
        String email = "trainer1@example.com";
        String password = "password";

        TrainerEntity trainer = new TrainerEntity(1L, "trainer1", email, "wrongPassword", "City1", "State1", "Country1", UserRole.ROLE_ADMIN);

        when(trainerRepository.findByEmail(anyString())).thenReturn(Optional.of(trainer));

        Optional<TrainerEntity> authenticatedTrainer = trainerService.authenticateTrainer(email, password);

        assertFalse(authenticatedTrainer.isPresent());
    }

    @Test
    public void testGetAllTrainers() {
        TrainerEntity trainer1 = new TrainerEntity(1L, "trainer1", "trainer1@example.com", "password", "City1", "State1", "Country1", UserRole.ROLE_ADMIN);
        TrainerEntity trainer2 = new TrainerEntity(2L, "trainer2", "trainer2@example.com", "password", "City2", "State2", "Country2", UserRole.ROLE_ADMIN);

        when(trainerRepository.findAll()).thenReturn(Arrays.asList(trainer1, trainer2));

        List<TrainerEntity> trainers = trainerService.getAllTrainers();

        assertEquals(2, trainers.size());
    }

    @Test
    public void testGetTrainerById() {
        TrainerEntity trainer = new TrainerEntity(1L, "trainer1", "trainer1@example.com", "password", "City1", "State1", "Country1", UserRole.ROLE_ADMIN);

        when(trainerRepository.findById(anyLong())).thenReturn(Optional.of(trainer));

        TrainerEntity foundTrainer = trainerService.getTrainerById(1L);

        assertEquals(trainer, foundTrainer);
    }

    @Test
    public void testSendGroupInvitation() {
        Long trainerId = 1L;
        Long traineeId = 2L;
        String groupType = "morning";

        when(userService.sendGroupInvitation(anyLong(), anyLong(), anyString())).thenReturn(new Object());

        trainerService.sendGroupInvitation(trainerId, traineeId, groupType);

        verify(userService, times(1)).sendGroupInvitation(trainerId, traineeId, groupType);
    }

    @Test
    public void testAcceptGroupInvitation() {
        Long traineeId = 2L;
        String groupType = "morning";

        doNothing().when(userService).acceptGroupInvitation(anyLong(), anyString());

        trainerService.acceptGroupInvitation(traineeId, groupType);

        verify(userService, times(1)).acceptGroupInvitation(traineeId, groupType);
    }

    @Test
    public void testRejectGroupInvitation() {
        Long traineeId = 2L;

        doNothing().when(userService).rejectGroupInvitation(anyLong());

        trainerService.rejectGroupInvitation(traineeId);

        verify(userService, times(1)).rejectGroupInvitation(traineeId);
    }
}
