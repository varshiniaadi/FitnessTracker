package com.hv.springboot.fitnesstrackingapp.services;

import java.util.List;

import com.hv.springboot.fitnesstrackingapp.entity.UserWorkoutEntity;

public interface UserWorkoutService {

	List<UserWorkoutEntity> getUserWorkouts(Long userId);

	void markWorkoutAsDone(Long userId, Long workoutId);

	List<UserWorkoutEntity> getUserWorkoutsByDate(Long userId, String date);

	List<UserWorkoutEntity> getUserWorkoutsByCity(String city);

	List<UserWorkoutEntity> getUserWorkoutsByState(String state);

	List<UserWorkoutEntity> getUserWorkoutsByCountry(String country);

	List<String> getAllCities();

	List<String> getAllStates();

	List<String> getAllCountries();
}
