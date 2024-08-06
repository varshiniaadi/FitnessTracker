package com.hv.springboot.fitnesstrackingapp.services.impl.test;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.repositories.WorkoutRepository;
import com.hv.springboot.fitnesstrackingapp.services.impl.WorkoutServiceImpl;

public class WorkoutServiceImplTest {

    @Mock
    private WorkoutRepository workoutRepository;

    @InjectMocks
    private WorkoutServiceImpl workoutService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllWorkouts() {
        // Mock data
        List<WorkoutEntity> mockWorkouts = new ArrayList<>();
        mockWorkouts.add(new WorkoutEntity(1L, "Workout 1", null));
        mockWorkouts.add(new WorkoutEntity(2L, "Workout 2", null));

        // Mock repository method
        when(workoutRepository.findAll()).thenReturn(mockWorkouts);

        // Call service method
        List<WorkoutEntity> result = workoutService.getAllWorkouts();

        // Verify the result
        assertEquals(2, result.size());
    }

    @Test
    public void testFindById() {
        // Mock data
        WorkoutEntity mockWorkout = new WorkoutEntity(1L, "Workout 1", null);

        // Mock repository method
        when(workoutRepository.findById(1L)).thenReturn(Optional.of(mockWorkout));

        // Call service method
        Optional<WorkoutEntity> result = workoutService.findById(1L);

        // Verify the result
        assertEquals(mockWorkout.getId(), result.get().getId());
        assertEquals(mockWorkout.getName(), result.get().getName());
    }

    @Test
    public void testUpdateWorkout() {
        // Mock data
        Long workoutId = 1L;
        WorkoutEntity existingWorkout = new WorkoutEntity(workoutId, "Workout 1", null);
        WorkoutEntity updatedWorkout = new WorkoutEntity(workoutId, "Updated Workout", null);

        // Mock repository method
        when(workoutRepository.findById(workoutId)).thenReturn(Optional.of(existingWorkout));
        when(workoutRepository.save(any())).thenReturn(updatedWorkout);

        // Call service method
        WorkoutEntity result = workoutService.updateWorkout(workoutId, updatedWorkout);

        // Verify the result
        assertEquals(updatedWorkout.getName(), result.getName());
    }

    @Test
    public void testDeleteWorkout() {
        // Mock data
        Long workoutId = 1L;

        // Call service method
        workoutService.deleteWorkout(workoutId);

        // Verify repository method was called
        verify(workoutRepository, times(1)).deleteById(workoutId);
    }

    // Add more tests as needed for other service methods
}
