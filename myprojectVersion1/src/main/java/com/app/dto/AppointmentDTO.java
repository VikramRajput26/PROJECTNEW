package com.app.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
	private int appointmentId;
	private ChildDTO child;
	private UserDTO doctor;
	private VaccineDTO vaccine;
	private Date appointmentDate;
	private String reason;
	private Status status;
}
