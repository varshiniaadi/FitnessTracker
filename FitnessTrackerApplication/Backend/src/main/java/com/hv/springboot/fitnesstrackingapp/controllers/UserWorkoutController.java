package com.hv.springboot.fitnesstrackingapp.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hv.springboot.fitnesstrackingapp.entity.GroupStatus;
import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;
import com.hv.springboot.fitnesstrackingapp.entity.UserWorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.repositories.UserRepository;
import com.hv.springboot.fitnesstrackingapp.repositories.UserWorkoutRepository;
import com.hv.springboot.fitnesstrackingapp.services.UserWorkoutService;
import com.hv.springboot.fitnesstrackingapp.services.WorkoutService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/userworkouts")
public class UserWorkoutController {

	@Autowired
	private UserWorkoutService userWorkoutService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private WorkoutService workoutService;

	@Autowired
	private UserWorkoutRepository userWorkoutRepository;

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	public static String formatDate(Date date) {
		try {
			return dateFormat.format(date);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@PostMapping("/assignworkout/{workoutId}/{userId}")
	public ResponseEntity<?> assignWorkoutToUser(@PathVariable Long workoutId, @PathVariable Long userId) {
		try {
			if (workoutId == null || userId == null) {
				return ResponseEntity.badRequest().body("Invalid user or workout ID.");
			}
			Optional<WorkoutEntity> optionalWorkout = workoutService.findById(workoutId);
			Optional<UserEntity> optionalUser = userRepository.findById(userId);

			if (!optionalWorkout.isPresent() || !optionalUser.isPresent()) {
				return ResponseEntity.notFound().build(); // Return 404 if workout or user not found
			}

			if (optionalWorkout.isPresent() && optionalUser.isPresent()) {
				WorkoutEntity workout = optionalWorkout.get();
				UserEntity user = optionalUser.get();

				Optional<UserWorkoutEntity> optionalUserWorkout = userWorkoutRepository.findByUserAndWorkout(user,
						workout);

				if (optionalUserWorkout.isPresent()) {
					UserWorkoutEntity existingUserWorkout = optionalUserWorkout.get();

					Date storedDate = dateFormat.parse(existingUserWorkout.getAssignedDate());
					Date currentDate = new Date();
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(currentDate);
					calendar.set(Calendar.HOUR_OF_DAY, 0);
					calendar.set(Calendar.MINUTE, 0);
					calendar.set(Calendar.SECOND, 0);
					calendar.set(Calendar.MILLISECOND, 0);
					currentDate = calendar.getTime();

					if (storedDate.equals(currentDate) && existingUserWorkout.getCompletedDate() == null) {
						return ResponseEntity.badRequest().body("Workout already assigned and not yet completed.");
					} else {
						existingUserWorkout.setAssignedDate(dateFormat.format(new Date()));
						existingUserWorkout.setCompletedDate(null);
						userWorkoutRepository.save(existingUserWorkout);
						//return ResponseEntity.ok().build();
						return ResponseEntity.ok("Workout assignment updated successfully.");
					}
				} else {
					UserWorkoutEntity workoutAssignment = new UserWorkoutEntity();
					workoutAssignment.setUser(user);
					workoutAssignment.setWorkout(workout);
					workoutAssignment.setAssignedDate(dateFormat.format(new Date()));
					userWorkoutRepository.save(workoutAssignment);
					//return ResponseEntity.ok().build();
					 return ResponseEntity.ok("Workout assigned successfully.");
				}
			} else {
				throw new RuntimeException("Workout or User not found.");
			}
		} catch (ParseException e) {
			e.printStackTrace();
			throw new RuntimeException("Error parsing date: " + e.getMessage(), e);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Error assigning workout: " + e.getMessage(), e);
		}
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<UserWorkoutEntity>> getUserWorkouts(@PathVariable Long userId) {
		try {
			List<UserWorkoutEntity> userWorkouts = userWorkoutService.getUserWorkouts(userId);
			return ResponseEntity.ok(userWorkouts);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/markAsDone/{userId}/{workoutId}")
	public ResponseEntity<?> markWorkoutAsDone(@PathVariable Long userId, @PathVariable Long workoutId) {
		try {
			userWorkoutService.markWorkoutAsDone(userId, workoutId);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error marking workout as done: " + e.getMessage());
		}
	}

	@GetMapping("/bydate/{userId}/{date}")
	public ResponseEntity<List<UserWorkoutEntity>> getUserWorkoutsByDate(@PathVariable Long userId,
			@PathVariable String date) {
		try {
			List<UserWorkoutEntity> userWorkouts = userWorkoutService.getUserWorkoutsByDate(userId, date);
			return ResponseEntity.ok(userWorkouts);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/allCities")
	public ResponseEntity<List<String>> getAllCities() {
		try {
			List<String> cities = userWorkoutService.getAllCities();
			return ResponseEntity.ok(cities);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/allStates")
	public ResponseEntity<List<String>> getAllStates() {
		try {
			List<String> states = userWorkoutService.getAllStates();
			return ResponseEntity.ok(states);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/allCountries")
	public ResponseEntity<List<String>> getAllCountries() {
		try {
			List<String> countries = userWorkoutService.getAllCountries();
			return ResponseEntity.ok(countries);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/bycity/{city}")
	public ResponseEntity<List<UserWorkoutEntity>> getUserWorkoutsByCity(@PathVariable String city) {
		try {
			List<UserWorkoutEntity> userWorkouts = userWorkoutService.getUserWorkoutsByCity(city);
			return ResponseEntity.ok(userWorkouts);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/bystate/{state}")
	public ResponseEntity<List<UserWorkoutEntity>> getUserWorkoutsByState(@PathVariable String state) {
		try {
			List<UserWorkoutEntity> userWorkouts = userWorkoutService.getUserWorkoutsByState(state);
			return ResponseEntity.ok(userWorkouts);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/bycountry/{country}")
	public ResponseEntity<List<UserWorkoutEntity>> getUserWorkoutsByCountry(@PathVariable String country) {
		try {
			List<UserWorkoutEntity> userWorkouts = userWorkoutService.getUserWorkoutsByCountry(country);
			return ResponseEntity.ok(userWorkouts);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/byGroupTypeAndStatus/{groupType}")
	public ResponseEntity<List<UserEntity>> getUsersByGroupTypeAndStatus(@PathVariable String groupType) {
		try {
			List<UserEntity> users = new ArrayList<>();

			if (groupType != null) {
				GroupStatus groupStatus = GroupStatus.ACCEPTED;

				if (groupType.equals("morning") || groupType.equals("evening")) {
					users = userRepository.findByGroupTypeAndGroupStatus(groupType, groupStatus);
				} else {
					return ResponseEntity.badRequest().body(new ArrayList<UserEntity>());
				}
			}

			return ResponseEntity.ok(users);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<UserEntity>());
		}
	}
}
