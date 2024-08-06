package com.hv.springboot.fitnesstrackingapp.controllers.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hv.springboot.fitnesstrackingapp.controllers.TrainerController;
import com.hv.springboot.fitnesstrackingapp.entity.InvitationRequest;
import com.hv.springboot.fitnesstrackingapp.entity.TrainerEntity;
import com.hv.springboot.fitnesstrackingapp.entity.UserRole;
import com.hv.springboot.fitnesstrackingapp.services.TrainerService;
import com.hv.springboot.fitnesstrackingapp.services.WorkoutService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TrainerController.class)
public class TrainerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private TrainerController trainerController;

    @MockBean
    private TrainerService trainerService;

    @MockBean
    private WorkoutService workoutService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveTrainer() throws Exception {
        TrainerEntity trainer = new TrainerEntity(1L, "JohnDoe", "john@example.com", "password123", "City", "State", "Country", UserRole.ROLE_ADMIN);

        mockMvc.perform(post("/trainer/createtrainer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(trainer)))
                .andExpect(status().isCreated())
                .andExpect(content().string("Trainer created successfully"));
    }
    @Test
    public void testSaveTrainerInvalidInput() throws Exception {
        TrainerEntity trainer = new TrainerEntity(1L, "", "john@example.com", "password123", "City", "State", "Country", UserRole.ROLE_ADMIN);

        mockMvc.perform(post("/trainer/createtrainer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(trainer)))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void testSaveTrainerError() throws Exception {
        TrainerEntity trainer = new TrainerEntity(1L, "JohnDoe", "john@example.com", "password123", "City", "State", "Country", UserRole.ROLE_ADMIN);

        doThrow(new RuntimeException("Database error"))
            .when(trainerService)
            .saveOrUpdateTrainer(trainer.getUsername(), trainer.getEmail(), trainer.getPassword(), trainer.getCity(), trainer.getState(), trainer.getCountry());

        mockMvc.perform(post("/trainer/createtrainer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(trainer)))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error creating trainer: Database error"));
    }

    @Test
    public void testRejectGroupInvitationError() throws Exception {
        doThrow(new RuntimeException("Database error")).when(trainerService).rejectGroupInvitation(2L);

        mockMvc.perform(post("/trainer/invite/reject/2"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error rejecting invitation: Database error"));
    }
    @Test
    public void testAcceptGroupInvitationError() throws Exception {
        doThrow(new RuntimeException("Database error")).when(trainerService).acceptGroupInvitation(2L, "Morning");

        mockMvc.perform(post("/trainer/invite/accept/2/Morning"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error accepting invitation: Database error"));
    }
    @Test
    public void testSendGroupInvitationError() throws Exception {
        InvitationRequest request = new InvitationRequest(1L, 2L, "Morning");

        doThrow(new RuntimeException("Database error")).when(trainerService).sendGroupInvitation(request.getTrainerId(), request.getTraineeId(), request.getGroupType());

        mockMvc.perform(post("/trainer/invite")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error sending invitation: Database error"));
    }
    @Test
    public void testGetTrainersError() throws Exception {
        when(trainerService.getAllTrainers()).thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(get("/trainer/trainers"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error retrieving trainers: Database error"));
    }

    @Test
    public void testLoginTrainer() throws Exception {
        TrainerEntity trainer = new TrainerEntity(1L, "JohnDoe", "john@example.com", "password123", "City", "State", "Country", UserRole.ROLE_ADMIN);
        when(trainerService.authenticateTrainer(eq("john@example.com"), eq("password123"))).thenReturn(Optional.of(trainer));

        mockMvc.perform(post("/trainer/logintrainer")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"john@example.com\", \"password\": \"password123\"}"))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"id\": 1, \"username\": \"JohnDoe\"}"));
    }

    @Test
    public void testGetTrainers() throws Exception {
        TrainerEntity trainer1 = new TrainerEntity(1L, "JohnDoe", "john@example.com", "password123", "City", "State", "Country", UserRole.ROLE_ADMIN);
        TrainerEntity trainer2 = new TrainerEntity(2L, "JaneDoe", "jane@example.com", "password123", "City", "State", "Country", UserRole.ROLE_ADMIN);
        when(trainerService.getAllTrainers()).thenReturn(Arrays.asList(trainer1, trainer2));

        mockMvc.perform(get("/trainer/trainers"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(trainer1, trainer2))));
    }

    @Test
    public void testGetTrainerById() throws Exception {
        TrainerEntity trainer = new TrainerEntity(1L, "JohnDoe", "john@example.com", "password123", "City", "State", "Country", UserRole.ROLE_ADMIN);
        when(trainerService.getTrainerById(1L)).thenReturn(trainer);

        mockMvc.perform(get("/trainer/1"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(trainer)));
    }

    @Test
    public void testSendGroupInvitation() throws Exception {
        InvitationRequest request = new InvitationRequest(1L, 2L, "Morning");

        mockMvc.perform(post("/trainer/invite")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }
    @Test
    public void testGetTrainerByIdNotFound() throws Exception {
        when(trainerService.getTrainerById(1L)).thenReturn(null);

        mockMvc.perform(get("/trainer/1"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Trainer not found"));
    }
    @Test
    public void testLoginTrainerInvalidCredentials() throws Exception {
        when(trainerService.authenticateTrainer(eq("john@example.com"), eq("wrongpassword"))).thenReturn(Optional.empty());

        mockMvc.perform(post("/trainer/logintrainer")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"john@example.com\", \"password\": \"wrongpassword\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid username or password"));
    }


    @Test
    public void testAcceptGroupInvitation() throws Exception {
        mockMvc.perform(post("/trainer/invite/accept/2/Morning"))
                .andExpect(status().isOk());
    }

    @Test
    public void testRejectGroupInvitation() throws Exception {
        mockMvc.perform(post("/trainer/invite/reject/2"))
                .andExpect(status().isOk());
    }
}



