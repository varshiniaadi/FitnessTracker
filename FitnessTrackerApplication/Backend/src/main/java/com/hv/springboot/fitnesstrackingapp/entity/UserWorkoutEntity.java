package com.hv.springboot.fitnesstrackingapp.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_workouts")
public class UserWorkoutEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private UserEntity user;

	@ManyToOne
	@JoinColumn(name = "workout_id", referencedColumnName = "id")
	private WorkoutEntity workout;

	@Column(name = "assigned_date")
	private String assignedDate;

	@Column(name = "completed_date")
	private String completedDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public WorkoutEntity getWorkout() {
		return workout;
	}

	public void setWorkout(WorkoutEntity workout) {
		this.workout = workout;
	}

	public String getAssignedDate() {
		return assignedDate;
	}

	public void setAssignedDate(String date) {
		this.assignedDate = date;
	}

	public String getCompletedDate() {
		return completedDate;
	}

	public UserWorkoutEntity(Long id, UserEntity user, WorkoutEntity workout, String assignedDate,
			String completedDate) {
		super();
		this.id = id;
		this.user = user;
		this.workout = workout;
		this.assignedDate = assignedDate;
		this.completedDate = completedDate;
	}

	public UserWorkoutEntity() {

	}

	public void setCompletedDate(String completedDate) {
		this.completedDate = completedDate;
	}

}
