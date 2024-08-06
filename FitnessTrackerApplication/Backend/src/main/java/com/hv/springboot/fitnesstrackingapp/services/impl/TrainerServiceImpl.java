package com.hv.springboot.fitnesstrackingapp.services.impl;

import org.springframework.stereotype.Service;

import com.hv.springboot.fitnesstrackingapp.entity.TrainerEntity;
import com.hv.springboot.fitnesstrackingapp.entity.UserRole;
import com.hv.springboot.fitnesstrackingapp.repositories.TrainerRepository;
import com.hv.springboot.fitnesstrackingapp.services.TrainerService;
import com.hv.springboot.fitnesstrackingapp.services.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class TrainerServiceImpl implements TrainerService {
	@Autowired
	private TrainerRepository trainerRepository;
	@Autowired
	private UserService userService;

	@Override
	public void saveOrUpdateTrainer(String username, String email, String password, String city, String state,
			String country) {
		Optional<TrainerEntity> existingTrainer = trainerRepository.findByEmail(email);
		if (existingTrainer.isPresent()) {
			TrainerEntity trainer = existingTrainer.get();
			if (!trainer.getUsername().equals(username) || !trainer.getPassword().equals(password)) {
				trainer.setUsername(username);
				trainer.setPassword(password);
				trainer.setCity(city);
				trainer.setState(state);
				trainer.setCountry(country);
				trainerRepository.save(trainer);
			}
		} else {
			// Trainer not present, create a new one
			TrainerEntity newTrainer = new TrainerEntity();
			newTrainer.setUsername(username);
			newTrainer.setEmail(email);
			newTrainer.setPassword(password);
			newTrainer.setCity(city);
			newTrainer.setState(state);
			newTrainer.setCountry(country);
			newTrainer.setRole(UserRole.ROLE_ADMIN);
			trainerRepository.save(newTrainer);
		}
	}

	@Override
	public Optional<TrainerEntity> authenticateTrainer(String email, String password) {
		Optional<TrainerEntity> trainerOptional = trainerRepository.findByEmail(email);
		return trainerOptional.filter(trainer -> trainer.getPassword().equals(password));
	}

	@Override
	public List<TrainerEntity> getAllTrainers() {
		return trainerRepository.findAll();
	}

	@Override
	public TrainerEntity getTrainerById(Long trainerId) {
		Optional<TrainerEntity> trainerOptional = trainerRepository.findById(trainerId);
		return trainerOptional.orElse(null);
	}

	public Object sendGroupInvitation(Long trainerId, Long traineeId, String groupType) {
		return userService.sendGroupInvitation(trainerId, traineeId, groupType);
	}

	public void acceptGroupInvitation(Long traineeId, String groupType) {
		userService.acceptGroupInvitation(traineeId, groupType);
	}

	public void rejectGroupInvitation(Long traineeId) {
		userService.rejectGroupInvitation(traineeId);
	}

}
