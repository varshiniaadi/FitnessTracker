package com.hv.springboot.fitnesstrackingapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hv.springboot.fitnesstrackingapp.entity.TrainerEntity;

public interface TrainerRepository extends JpaRepository<TrainerEntity, Long> {

	Optional<TrainerEntity> findByEmail(String email);

}
