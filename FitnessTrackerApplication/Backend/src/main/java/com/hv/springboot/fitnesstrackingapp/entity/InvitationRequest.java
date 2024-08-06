package com.hv.springboot.fitnesstrackingapp.entity;

public class InvitationRequest {

	private Long trainerId;
	private Long traineeId;
	private String groupType;

	public Long getTrainerId() {
		return trainerId;
	}

	public void setTrainerId(Long trainerId) {
		this.trainerId = trainerId;
	}

	public InvitationRequest(Long trainerId, Long traineeId, String groupType) {
		super();
		this.trainerId = trainerId;
		this.traineeId = traineeId;
		this.groupType = groupType;
	}

	public InvitationRequest() {

	}

	public Long getTraineeId() {
		return traineeId;
	}

	public void setTraineeId(Long traineeId) {
		this.traineeId = traineeId;
	}

	public String getGroupType() {
		return groupType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

}
