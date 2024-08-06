package com.hv.springboot.fitnesstrackingapp.services;

import com.hv.springboot.fitnesstrackingapp.entity.TrainerEntity;

import java.util.List;
import java.util.Optional;

public interface TrainerService {
	void saveOrUpdateTrainer(String username, String email, String password, String city, String state, String country);

	Optional<TrainerEntity> authenticateTrainer(String email, String password);

	List<TrainerEntity> getAllTrainers();

	TrainerEntity getTrainerById(Long trainerId);

	Object sendGroupInvitation(Long trainerId, Long traineeId, String groupType);

	void acceptGroupInvitation(Long traineeId, String groupType);

	void rejectGroupInvitation(Long traineeId);

}
