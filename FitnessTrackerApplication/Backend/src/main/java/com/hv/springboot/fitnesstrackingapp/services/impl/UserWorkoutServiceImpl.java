package com.hv.springboot.fitnesstrackingapp.services.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hv.springboot.fitnesstrackingapp.entity.UserWorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.repositories.UserWorkoutRepository;
import com.hv.springboot.fitnesstrackingapp.services.UserWorkoutService;

@Service
public class UserWorkoutServiceImpl implements UserWorkoutService {
	@Autowired
	private UserWorkoutRepository userWorkoutRepository;

	@Override
	public List<UserWorkoutEntity> getUserWorkouts(Long userId) {
		return userWorkoutRepository.findByUserId(userId);
	}

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	public static String formatDate(Date date) {
		try {
			return dateFormat.format(date);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public void markWorkoutAsDone(Long userId, Long workoutId) {
		Optional<UserWorkoutEntity> optionalUserWorkout = userWorkoutRepository.findByUserIdAndWorkoutId(userId,
				workoutId);
		optionalUserWorkout.ifPresent(userWorkout -> {
			String currentDate = dateFormat.format(new Date());
			userWorkout.setCompletedDate(currentDate);
			userWorkoutRepository.save(userWorkout);
		});
	}

	@Override
	public List<UserWorkoutEntity> getUserWorkoutsByDate(Long userId, String date) {
		return userWorkoutRepository.findByUserIdAndAssignedDate(userId, date);
	}

	@Override
	public List<UserWorkoutEntity> getUserWorkoutsByCity(String city) {
		return userWorkoutRepository.findByUserCity(city);
	}

	@Override
	public List<UserWorkoutEntity> getUserWorkoutsByState(String state) {
		return userWorkoutRepository.findByUserState(state);
	}

	@Override
	public List<UserWorkoutEntity> getUserWorkoutsByCountry(String country) {
		return userWorkoutRepository.findByUserCountry(country);
	}

	@Override
	public List<String> getAllCities() {
		return userWorkoutRepository.findAllCities();
	}

	@Override
	public List<String> getAllStates() {
		return userWorkoutRepository.findAllStates();
	}

	@Override
	public List<String> getAllCountries() {
		return userWorkoutRepository.findAllCountries();
	}

}
