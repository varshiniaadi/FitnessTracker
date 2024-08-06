package com.hv.springboot.fitnesstrackingapp.repositories;

import java.util.Optional;

import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepository extends JpaRepository<WorkoutEntity, Long> {
	Optional<WorkoutEntity> findById(Long id);
}
