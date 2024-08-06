package com.hv.springboot.fitnesstrackingapp.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hv.springboot.fitnesstrackingapp.entity.ExerciseEntity;
import com.hv.springboot.fitnesstrackingapp.repositories.ExerciseRepository;
import com.hv.springboot.fitnesstrackingapp.services.ExerciseService;

@Service
public class ExerciseServiceImpl implements ExerciseService {
	@Autowired
	private ExerciseRepository exerciseRepository;

	public ExerciseEntity createExercise(ExerciseEntity exercise) {
		return exerciseRepository.save(exercise);
	}

}
