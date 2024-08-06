package com.hv.springboot.fitnesstrackingapp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;
import com.hv.springboot.fitnesstrackingapp.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/trainee")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/createuser")
	public ResponseEntity<String> saveUser(@RequestBody UserEntity user) {
		try {
			userService.saveOrUpdateUser(user.getUsername(), user.getEmail(), user.getPassword(), user.getCity(),
					user.getState(), user.getCountry());
			return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error creating user: " + e.getMessage());
		}
	}

	@PostMapping("/loginuser")
	public ResponseEntity<Object> loginUser(@RequestBody UserEntity user) {
		try {
			Optional<UserEntity> loggedInUser = userService.authenticateUser(user.getEmail(), user.getPassword());

			if (loggedInUser.isPresent()) {
				UserEntity userEntity = loggedInUser.get();
				return ResponseEntity.ok().body(
						"{\"id\": " + userEntity.getId() + ", \"username\": \"" + userEntity.getUsername() + "\"}");
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error during login: " + e.getMessage());
		}
	}

	@GetMapping("/users")
	public ResponseEntity<List<UserEntity>> getUsers() {
		try {
			List<UserEntity> users = userService.getAllUsers();
			return ResponseEntity.ok(users);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/users/{userId}")
	public ResponseEntity<UserEntity> getUserById(@PathVariable Long userId) {
		try {
			Optional<UserEntity> user = userService.getUserById(userId);
			return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
