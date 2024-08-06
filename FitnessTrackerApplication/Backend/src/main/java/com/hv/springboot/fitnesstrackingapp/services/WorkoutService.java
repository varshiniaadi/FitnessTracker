package com.hv.springboot.fitnesstrackingapp.services;

import java.util.List;
import java.util.Optional;
import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;

public interface WorkoutService {
	WorkoutEntity createWorkout(WorkoutEntity workout);

	List<WorkoutEntity> getAllWorkouts();

	Optional<WorkoutEntity> findById(Long workoutId);

	WorkoutEntity updateWorkout(Long id, WorkoutEntity updatedWorkout);

	void deleteWorkout(Long id);

}
