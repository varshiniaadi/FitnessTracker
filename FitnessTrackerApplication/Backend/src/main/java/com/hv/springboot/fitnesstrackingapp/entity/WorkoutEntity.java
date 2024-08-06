package com.hv.springboot.fitnesstrackingapp.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "workouts")
public class WorkoutEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "workout_id", referencedColumnName = "id")
	private List<ExerciseEntity> exercises;

	public WorkoutEntity(Long id, String name, List<ExerciseEntity> exercises) {
		super();
		this.id = id;
		this.name = name;
		this.exercises = exercises;
	}

	public WorkoutEntity() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ExerciseEntity> getExercises() {
		return exercises;
	}

	public void setExercises(List<ExerciseEntity> exercises) {
		this.exercises = exercises;
	}

}
