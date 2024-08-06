package com.hv.springboot.fitnesstrackingapp.services.impl;

import org.springframework.stereotype.Service;
import com.hv.springboot.fitnesstrackingapp.entity.GroupStatus;

import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;
import com.hv.springboot.fitnesstrackingapp.entity.UserRole;
import com.hv.springboot.fitnesstrackingapp.repositories.UserRepository;
import com.hv.springboot.fitnesstrackingapp.services.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	public void saveOrUpdateUser(String username, String email, String password, String city, String state,
			String country) {
		Optional<UserEntity> existingUser = userRepository.findByEmail(email);
		if (existingUser.isPresent()) {
			UserEntity user = existingUser.get();
			if (!user.getUsername().equals(username) || !user.getPassword().equals(password)) {
				user.setUsername(username);
				user.setPassword(password);
				user.setCity(city);
				user.setState(state);
				user.setCountry(country);
				userRepository.save(user);
			}
		} else {
			System.out.println("entered" + username);
			// User not present, create a new one
			UserEntity newUser = new UserEntity();
			newUser.setUsername(username);
			newUser.setEmail(email);
			newUser.setPassword(password);
			newUser.setCity(city);
			newUser.setState(state);
			newUser.setCountry(country);
			newUser.setRole(UserRole.ROLE_USER);
			userRepository.save(newUser);
		}
	}

	@Override
	public Optional<UserEntity> authenticateUser(String email, String password) {
		Optional<UserEntity> userOptional = userRepository.findByEmail(email);
		if (userOptional.isPresent()) {
			UserEntity user = userOptional.get();
			if (user.getPassword().equals(password)) {
				return userOptional;
			}
		}
		return Optional.empty();
	}

	@Override
	public List<UserEntity> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public Optional<UserEntity> getUserById(Long userId) {
		return userRepository.findById(userId);
	}

	public ResponseEntity<Object> sendGroupInvitation(Long trainerId, Long traineeId, String groupType) {

		Optional<UserEntity> optionalTrainee = userRepository.findById(traineeId);
		if (optionalTrainee.isPresent()) {
			UserEntity trainee = optionalTrainee.get();

			// Check if the trainee has already been invited
			if (trainee.getGroupStatus() == GroupStatus.INVITED && trainee.getGroupType().equals(groupType)) {
				System.out.println("Trainee is already invited to the " + groupType + " group.");
				return ResponseEntity.ok().body("Trainee already invited to the " + groupType + " group.");
			} else {
				// Trainee has not been invited yet, set the groupType and groupStatus
				trainee.setGroupType(groupType);
				trainee.setGroupStatus(GroupStatus.INVITED);
				userRepository.save(trainee);
				System.out.println("Trainee invited to the " + groupType + " group.");
				return ResponseEntity.ok().body("Trainee invited to the  " + groupType + " group.");
			}

		} else {
			System.out.println("Trainee not found.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trainee not found."); // Handle trainee not found
																							// case
		}
	}

	public void acceptGroupInvitation(Long traineeId, String groupType) {
		Optional<UserEntity> optionalTrainee = userRepository.findById(traineeId);
		if (optionalTrainee.isPresent()) {
			UserEntity trainee = optionalTrainee.get();
			trainee.setGroupStatus(GroupStatus.ACCEPTED);
			trainee.setGroupType(groupType);
			userRepository.save(trainee);
		}
	}

	public void rejectGroupInvitation(Long traineeId) {
		Optional<UserEntity> optionalTrainee = userRepository.findById(traineeId);
		if (optionalTrainee.isPresent()) {
			UserEntity trainee = optionalTrainee.get();
			trainee.setGroupStatus(GroupStatus.REJECTED);
			userRepository.save(trainee);
		}
	}

}
