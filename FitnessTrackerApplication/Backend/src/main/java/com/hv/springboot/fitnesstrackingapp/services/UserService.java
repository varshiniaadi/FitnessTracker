package com.hv.springboot.fitnesstrackingapp.services;

import java.util.List;
import java.util.Optional;
import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;

public interface UserService {

	void saveOrUpdateUser(String username, String email, String password, String city, String state, String country);

	Optional<UserEntity> authenticateUser(String email, String password);

	List<UserEntity> getAllUsers();

	Optional<UserEntity> getUserById(Long userId);

	Object sendGroupInvitation(Long trainerId, Long traineeId, String groupType);

	void acceptGroupInvitation(Long traineeId, String groupType);

	void rejectGroupInvitation(Long traineeId);

}
