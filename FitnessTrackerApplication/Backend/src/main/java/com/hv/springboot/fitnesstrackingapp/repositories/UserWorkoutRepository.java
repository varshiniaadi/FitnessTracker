package com.hv.springboot.fitnesstrackingapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;
import com.hv.springboot.fitnesstrackingapp.entity.UserWorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;

public interface UserWorkoutRepository extends JpaRepository<UserWorkoutEntity, Long> {

	List<UserWorkoutEntity> findByUserId(Long userId);

	Optional<UserWorkoutEntity> findByUserIdAndWorkoutId(Long userId, Long workoutId);

	List<UserWorkoutEntity> findByUserIdAndAssignedDate(Long userId, String date);

	List<UserWorkoutEntity> findByUserCity(@Param("city") String city);

	List<UserWorkoutEntity> findByUserState(String state);

	List<UserWorkoutEntity> findByUserCountry(String country);

	Optional<UserWorkoutEntity> findByUserAndWorkout(UserEntity user, WorkoutEntity workout);

	@Query("SELECT DISTINCT uw.city FROM UserEntity uw")
	List<String> findAllCities();

	@Query("SELECT DISTINCT uw.state FROM UserEntity uw")
	List<String> findAllStates();

	@Query("SELECT DISTINCT uw.country FROM UserEntity uw")
	List<String> findAllCountries();
}
