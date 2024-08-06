package com.hv.springboot.fitnesstrackingapp.controllers;

import com.hv.springboot.fitnesstrackingapp.entity.ExerciseEntity;
import com.hv.springboot.fitnesstrackingapp.services.ExerciseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/exercises")
public class ExerciseController {

	@Autowired
	private ExerciseService exerciseService;

	@PostMapping("/createexcercises")
	public ResponseEntity<ExerciseEntity> createExercise(@RequestBody ExerciseEntity exercise) {
		try {
			ExerciseEntity createdExercise = exerciseService.createExercise(exercise);
			return new ResponseEntity<>(createdExercise, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}