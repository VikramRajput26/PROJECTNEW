package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AppointmentDTO;
import com.app.entity.Appointment;
import com.app.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {
	@Autowired
	private final AppointmentRepository appointmentRepository;
	@Autowired
	private final ModelMapper modelMapper;

	public AppointmentServiceImpl(AppointmentRepository appointmentRepository, ModelMapper modelMapper) {
		this.appointmentRepository = appointmentRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
		Appointment appointment = modelMapper.map(appointmentDTO, Appointment.class);
		appointment = appointmentRepository.save(appointment);
		return modelMapper.map(appointment, AppointmentDTO.class);
	}

	@Override
	public AppointmentDTO getAppointmentById(int id) {
		Appointment appointment = appointmentRepository.findById(id).orElseThrow();
		return modelMapper.map(appointment, AppointmentDTO.class);
	}

	@Override
	public List<AppointmentDTO> getAllAppointments() {
		return appointmentRepository.findAll().stream()
				.map(appointment -> modelMapper.map(appointment, AppointmentDTO.class)).collect(Collectors.toList());
	}

	@Override
	public AppointmentDTO updateAppointment(int id, AppointmentDTO appointmentDTO) {
		Appointment appointment = appointmentRepository.findById(id).orElseThrow();
		modelMapper.map(appointmentDTO, appointment);
		appointment = appointmentRepository.save(appointment);
		return modelMapper.map(appointment, AppointmentDTO.class);
	}

	@Override
	public void deleteAppointment(int id) {
		appointmentRepository.deleteById(id);
	}
}
