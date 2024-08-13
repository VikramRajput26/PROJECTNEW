package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.app.dto.AppointmentDTO;
import com.app.entity.Appointment;
import com.app.repository.AppointmentRepository;

@Service
public class AppointmentService {

	private final AppointmentRepository appointmentRepository;
	private final ModelMapper modelMapper;

	public AppointmentService(AppointmentRepository appointmentRepository, ModelMapper modelMapper) {
		this.appointmentRepository = appointmentRepository;
		this.modelMapper = modelMapper;
	}

	public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
		Appointment appointment = modelMapper.map(appointmentDTO, Appointment.class);
		appointment = appointmentRepository.save(appointment);
		return modelMapper.map(appointment, AppointmentDTO.class);
	}

	public AppointmentDTO getAppointmentById(int id) {
		Appointment appointment = appointmentRepository.findById(id).orElseThrow();
		return modelMapper.map(appointment, AppointmentDTO.class);
	}

	public List<AppointmentDTO> getAllAppointments() {
		return appointmentRepository.findAll().stream()
				.map(appointment -> modelMapper.map(appointment, AppointmentDTO.class)).collect(Collectors.toList());
	}

	public AppointmentDTO updateAppointment(int id, AppointmentDTO appointmentDTO) {
		Appointment appointment = appointmentRepository.findById(id).orElseThrow();
		modelMapper.map(appointmentDTO, appointment);
		appointment = appointmentRepository.save(appointment);
		return modelMapper.map(appointment, AppointmentDTO.class);
	}

	public void deleteAppointment(int id) {
		appointmentRepository.deleteById(id);
	}
}
