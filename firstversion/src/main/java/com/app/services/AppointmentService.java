package com.app.services;

import java.util.List;

import com.app.dto.AppointmentDTO;

public interface AppointmentService {
	AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);

	AppointmentDTO updateAppointment(int appointmentId, AppointmentDTO appointmentDTO);

	void deleteAppointment(int appointmentId);

	AppointmentDTO getAppointmentById(int appointmentId);

	List<AppointmentDTO> getAllAppointments();
}
