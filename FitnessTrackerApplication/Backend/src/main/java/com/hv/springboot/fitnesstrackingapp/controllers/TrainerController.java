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

import com.hv.springboot.fitnesstrackingapp.entity.InvitationRequest;
import com.hv.springboot.fitnesstrackingapp.entity.TrainerEntity;
import com.hv.springboot.fitnesstrackingapp.services.TrainerService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/trainer")
public class TrainerController {
    @Autowired
    private TrainerService trainerService;
    @PostMapping("/createtrainer")
    public ResponseEntity<String> saveTrainer(@RequestBody TrainerEntity trainer) {
        try {
            trainerService.saveOrUpdateTrainer(trainer.getUsername(), trainer.getEmail(), trainer.getPassword(), trainer.getCity(), trainer.getState(), trainer.getCountry());
            return ResponseEntity.status(HttpStatus.CREATED).body("Trainer created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating trainer: " + e.getMessage());
        }
    }

    @PostMapping("/logintrainer")
    public ResponseEntity<String> loginTrainer(@RequestBody TrainerEntity trainer) {
        try {
            Optional<TrainerEntity> authenticatedTrainer = trainerService.authenticateTrainer(trainer.getEmail(), trainer.getPassword());
            if (authenticatedTrainer.isPresent()) {
                TrainerEntity trainerEntity = authenticatedTrainer.get();
                return ResponseEntity.ok().body("{\"id\": " + trainerEntity.getId() + ", \"username\": \"" + trainerEntity.getUsername() + "\"}");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during login: " + e.getMessage());
        }
    }

    @GetMapping("/trainers")
    public ResponseEntity<?> getTrainers() {
        try {
            List<TrainerEntity> trainers = trainerService.getAllTrainers();
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving trainers: " + e.getMessage());
        }
    }

    @GetMapping("/{trainerId}")
    public ResponseEntity<?> getTrainerById(@PathVariable Long trainerId) {
        try {
            TrainerEntity trainer = trainerService.getTrainerById(trainerId);
            if (trainer != null) {
                return ResponseEntity.ok(trainer);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trainer not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving trainer: " + e.getMessage());
        }
    }

    @PostMapping("/invite")
    public ResponseEntity<?> sendGroupInvitation(@RequestBody InvitationRequest request) {
        try {
            trainerService.sendGroupInvitation(request.getTrainerId(), request.getTraineeId(), request.getGroupType());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending invitation: " + e.getMessage());
        }
    }

    @PostMapping("/invite/accept/{traineeId}/{groupType}")
    public ResponseEntity<?> acceptGroupInvitation(@PathVariable Long traineeId, @PathVariable String groupType) {
        try {
            trainerService.acceptGroupInvitation(traineeId, groupType);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error accepting invitation: " + e.getMessage());
        }
    }

    @PostMapping("/invite/reject/{traineeId}")
    public ResponseEntity<?> rejectGroupInvitation(@PathVariable Long traineeId) {
        try {
            trainerService.rejectGroupInvitation(traineeId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error rejecting invitation: " + e.getMessage());
        }
    }
}

