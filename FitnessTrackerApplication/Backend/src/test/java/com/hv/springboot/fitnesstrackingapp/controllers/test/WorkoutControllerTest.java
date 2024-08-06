package com.hv.springboot.fitnesstrackingapp.controllers.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hv.springboot.fitnesstrackingapp.controllers.WorkoutController;
import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.services.WorkoutService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(WorkoutController.class)
public class WorkoutControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WorkoutService workoutService;

    @InjectMocks
    private WorkoutController workoutController;

    private WorkoutEntity workout;

    @BeforeEach
    public void setUp() {
        workout = new WorkoutEntity(1L, "Test Workout", List.of());
    }

    @Test
    public void testCreateWorkout() throws Exception {
        when(workoutService.createWorkout(any(WorkoutEntity.class))).thenReturn(workout);

        mockMvc.perform(post("/workouts/createworkout")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(workout)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(workout.getId()))
                .andExpect(jsonPath("$.name").value(workout.getName()));
    }

    @Test
    public void testGetAllWorkouts() throws Exception {
        when(workoutService.getAllWorkouts()).thenReturn(List.of(workout));

        mockMvc.perform(get("/workouts/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(workout.getId()))
                .andExpect(jsonPath("$[0].name").value(workout.getName()));
    }

    @Test
    public void testGetWorkoutById() throws Exception {
        when(workoutService.findById(1L)).thenReturn(Optional.of(workout));

        mockMvc.perform(get("/workouts/getworkout/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(workout.getId()))
                .andExpect(jsonPath("$.name").value(workout.getName()));
    }

    @Test
    public void testGetWorkoutByIdNotFound() throws Exception {
        when(workoutService.findById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/workouts/getworkout/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateWorkout() throws Exception {
        WorkoutEntity updatedWorkout = new WorkoutEntity(1L, "Updated Workout", List.of());
        when(workoutService.updateWorkout(eq(1L), any(WorkoutEntity.class))).thenReturn(updatedWorkout);

        mockMvc.perform(put("/workouts/update/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(updatedWorkout)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(updatedWorkout.getId()))
                .andExpect(jsonPath("$.name").value(updatedWorkout.getName()));
    }

    @Test
    public void testUpdateWorkoutNotFound() throws Exception {
        when(workoutService.updateWorkout(eq(1L), any(WorkoutEntity.class))).thenReturn(null);

        mockMvc.perform(put("/workouts/update/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(workout)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testDeleteWorkout() throws Exception {
        doNothing().when(workoutService).deleteWorkout(1L);

        mockMvc.perform(delete("/workouts/delete/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(workoutService, times(1)).deleteWorkout(1L);
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
