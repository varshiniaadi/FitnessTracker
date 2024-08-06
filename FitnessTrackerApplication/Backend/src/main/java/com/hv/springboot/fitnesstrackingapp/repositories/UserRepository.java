package com.hv.springboot.fitnesstrackingapp.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hv.springboot.fitnesstrackingapp.entity.GroupStatus;
import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

	Optional<UserEntity> findByEmail(String email);

	Optional<UserEntity> findByUsername(String username);

	Optional<UserEntity> findById(Long id);

	List<UserEntity> findByGroupTypeAndGroupStatus(String groupType, GroupStatus groupStatus);
}
