package com.hv.springboot.fitnesstrackingapp.services.impl.test;




import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.hv.springboot.fitnesstrackingapp.entity.ExerciseEntity;
import com.hv.springboot.fitnesstrackingapp.repositories.ExerciseRepository;
import com.hv.springboot.fitnesstrackingapp.services.impl.ExerciseServiceImpl;

public class ExerciseServiceImplTest {

    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private ExerciseServiceImpl exerciseService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateExercise() {
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setId(1L);
        exercise.setName("Push Up");
        exercise.setSets(3);
        exercise.setReps(15);
        exercise.setDuration(10);

        when(exerciseRepository.save(any(ExerciseEntity.class))).thenReturn(exercise);

        ExerciseEntity createdExercise = exerciseService.createExercise(exercise);

        assertEquals(exercise.getId(), createdExercise.getId());
        assertEquals(exercise.getName(), createdExercise.getName());
        assertEquals(exercise.getSets(), createdExercise.getSets());
        assertEquals(exercise.getReps(), createdExercise.getReps());
        assertEquals(exercise.getDuration(), createdExercise.getDuration());
    }
}
