package com.hv.springboot.fitnesstrackingapp.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.services.WorkoutService;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/workouts")
public class WorkoutController {

	@Autowired
    private WorkoutService workoutService;

    @PostMapping("/createworkout")
    public ResponseEntity<WorkoutEntity> createWorkout(@RequestBody WorkoutEntity workout) {
        WorkoutEntity createdWorkout = workoutService.createWorkout(workout);
        return new ResponseEntity<>(createdWorkout, HttpStatus.CREATED);
    }
    

    @GetMapping("/all")
    public ResponseEntity<List<WorkoutEntity>> getAllWorkouts() {
        List<WorkoutEntity> workouts = workoutService.getAllWorkouts();
        return new ResponseEntity<>(workouts, HttpStatus.OK);
    }
    
    @GetMapping("/getworkout/{id}")
    public ResponseEntity<Optional<WorkoutEntity>> getWorkoutById(@PathVariable Long id) {
        Optional<WorkoutEntity> workout = workoutService.findById(id);
        return  workout.isPresent() ? ResponseEntity.ok(workout) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<WorkoutEntity> updateWorkout(@PathVariable Long id, @RequestBody WorkoutEntity updatedWorkout) {
        WorkoutEntity workout = workoutService.updateWorkout(id, updatedWorkout);
        return workout != null ? ResponseEntity.ok(workout) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        return ResponseEntity.noContent().build();
    }
}
	
