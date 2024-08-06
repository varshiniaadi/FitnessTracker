package com.hv.springboot.fitnesstrackingapp.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;


@Entity
@Table(name = "Trainee")
public class UserEntity {
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username;
	private String email;
	@Column(name = "group_status")
	@Enumerated(EnumType.STRING)
	private GroupStatus groupStatus;

	public GroupStatus getGroupStatus() {
		return groupStatus;
	}

	public UserEntity(Long id, String username, String email, GroupStatus groupStatus, String groupType,
			String password, String city, String state, String country, UserRole role) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.groupStatus = groupStatus;
		this.groupType = groupType;
		this.password = password;
		this.city = city;
		this.state = state;
		this.country = country;
		this.role = role;
	}

	public void setGroupStatus(GroupStatus groupStatus) {
		this.groupStatus = groupStatus;
	}

	public String getGroupType() {
		return groupType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

	@Column(name = "group_type")
	private String groupType;

	@Override
	public String toString() {
		return "UserEntity [id=" + id + ", username=" + username + ", email=" + email + ", groupStatus=" + groupStatus
				+ ", groupType=" + groupType + ", password=" + password + ", city=" + city + ", state=" + state
				+ ", country=" + country + ", role=" + role + "]";
	}

	private String password;
	private String city;
	private String state;
	private String country;
	@Column(name = "role")
	@Enumerated(EnumType.STRING)
	private UserRole role;

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public UserEntity() {

	}

}