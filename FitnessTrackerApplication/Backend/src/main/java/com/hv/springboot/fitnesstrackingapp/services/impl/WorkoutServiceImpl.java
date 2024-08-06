package com.hv.springboot.fitnesstrackingapp.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.repositories.WorkoutRepository;
import com.hv.springboot.fitnesstrackingapp.services.WorkoutService;

@Service
public class WorkoutServiceImpl implements WorkoutService {
	@Autowired
	private WorkoutRepository workoutRepository;

	public WorkoutEntity createWorkout(WorkoutEntity workout) {
		return workoutRepository.save(workout);
	}

	@Override
	public List<WorkoutEntity> getAllWorkouts() {
		return workoutRepository.findAll();
	}

	@Override
	public Optional<WorkoutEntity> findById(Long workoutId) {
		return workoutRepository.findById(workoutId);
	}

	@Override
	public WorkoutEntity updateWorkout(Long id, WorkoutEntity updatedWorkout) {
		Optional<WorkoutEntity> existingWorkoutOptional = workoutRepository.findById(id);
		if (existingWorkoutOptional.isPresent()) {
			WorkoutEntity existingWorkout = existingWorkoutOptional.get();
			existingWorkout.setName(updatedWorkout.getName());
			existingWorkout.setExercises(updatedWorkout.getExercises()); // Update exercises directly
			return workoutRepository.save(existingWorkout);
		}
		return null;
	}

	@Override
	public void deleteWorkout(Long id) {
		workoutRepository.deleteById(id);
	}

}
