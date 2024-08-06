package com.hv.springboot.fitnesstrackingapp.controllers.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hv.springboot.fitnesstrackingapp.controllers.ExerciseController;
import com.hv.springboot.fitnesstrackingapp.entity.ExerciseEntity;
import com.hv.springboot.fitnesstrackingapp.services.ExerciseService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ExerciseController.class)
public class ExerciseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ExerciseService exerciseService;

    @InjectMocks
    private ExerciseController exerciseController;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateExercise() throws Exception {
        ExerciseEntity exercise = new ExerciseEntity(1L, "Push-ups", 3, 15, 10);
        when(exerciseService.createExercise(any(ExerciseEntity.class))).thenReturn(exercise);

        mockMvc.perform(post("/exercises/createexcercises")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(exercise)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(exercise)));
    }

    @Test
    public void testCreateExercise_InvalidInput() throws Exception {
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setName("");
        exercise.setSets(-1);
        exercise.setReps(-1);
        exercise.setDuration(-1);

        mockMvc.perform(post("/exercises/createexcercises")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(exercise)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateExercise_Exception() throws Exception {
        ExerciseEntity exercise = new ExerciseEntity(1L, "Push-ups", 3, 15, 10);
        when(exerciseService.createExercise(any(ExerciseEntity.class))).thenThrow(new RuntimeException("Internal Server Error"));

        mockMvc.perform(post("/exercises/createexcercises")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(exercise)))
                .andExpect(status().isInternalServerError());
    }
}
