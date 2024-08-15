package com.app.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int appointmentId;

	@ManyToOne
	@JoinColumn(name = "child_id", referencedColumnName = "childId")
	private Child child;

	@ManyToOne
	@JoinColumn(name = "doctor_id", referencedColumnName = "userId")
	private User doctor;

	@Column(name = "appointment_date", nullable = false)
	private LocalDate appointmentDate;

	@Column(name = "appointment_time", nullable = false)
	private String appointmentTime; // Format should be "hh:mm AM/PM"

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status;
}
