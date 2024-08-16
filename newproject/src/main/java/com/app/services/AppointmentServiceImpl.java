package com.app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AppointmentDTO;
import com.app.dto.UserDTO;
import com.app.entity.Appointment;
import com.app.entity.Child;
import com.app.entity.Role;
import com.app.entity.User;
import com.app.repository.AppointmentRepository;
import com.app.repository.ChildRepository;
import com.app.repository.UserRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;

	@Autowired
	private ChildRepository childRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
		Appointment appointment = modelMapper.map(appointmentDTO, Appointment.class);

		// Fetch child and doctor entities based on IDs from DTO
		Optional<Child> child = childRepository.findById(appointmentDTO.getChildId());
		Optional<User> doctor = userRepository.findById(appointmentDTO.getDoctorId());

		// Set child and doctor if they exist
		if (child.isPresent()) {
			appointment.setChild(child.get());
		} else {
			throw new RuntimeException("Child with ID " + appointmentDTO.getChildId() + " not found.");
		}

		if (doctor.isPresent()) {
			appointment.setDoctor(doctor.get());
		} else {
			throw new RuntimeException("Doctor with ID " + appointmentDTO.getDoctorId() + " not found.");
		}

		// Convert Status from DTO to entity
		appointment.setStatus(convertToEntityStatus(appointmentDTO.getStatus()));

		appointment = appointmentRepository.save(appointment);
		return modelMapper.map(appointment, AppointmentDTO.class);
	}

	@Override
	public AppointmentDTO updateAppointment(int appointmentId, AppointmentDTO appointmentDTO) {
		Optional<Appointment> existingAppointment = appointmentRepository.findById(appointmentId);
		if (existingAppointment.isPresent()) {
			Appointment appointment = existingAppointment.get();

			// Update fields
			appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
			appointment.setAppointmentTime(appointmentDTO.getAppointmentTime());

			// Convert Status from DTO to entity
			appointment.setStatus(convertToEntityStatus(appointmentDTO.getStatus()));

			// Fetch child and doctor entities based on IDs from DTO
			Optional<Child> child = childRepository.findById(appointmentDTO.getChildId());
			Optional<User> doctor = userRepository.findById(appointmentDTO.getDoctorId());

			// Set child and doctor if they exist
			if (child.isPresent()) {
				appointment.setChild(child.get());
			} else {
				throw new RuntimeException("Child with ID " + appointmentDTO.getChildId() + " not found.");
			}

			if (doctor.isPresent()) {
				appointment.setDoctor(doctor.get());
			} else {
				throw new RuntimeException("Doctor with ID " + appointmentDTO.getDoctorId() + " not found.");
			}

			appointment = appointmentRepository.save(appointment);
			return modelMapper.map(appointment, AppointmentDTO.class);
		}
		return null;
	}

	@Override
	public void deleteAppointment(int appointmentId) {
		appointmentRepository.deleteById(appointmentId);
	}

	@Override
	public AppointmentDTO getAppointmentById(int appointmentId) {
		Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);
		return appointment.map(app -> modelMapper.map(app, AppointmentDTO.class)).orElse(null);
	}

	@Override
	public List<AppointmentDTO> getAllAppointments() {
		return appointmentRepository.findAll().stream().map(appointment -> {
			AppointmentDTO dto = modelMapper.map(appointment, AppointmentDTO.class);
			dto.setChildId(appointment.getChild() != null ? appointment.getChild().getChildId() : 0);
			dto.setDoctorId(appointment.getDoctor() != null ? appointment.getDoctor().getUserId() : 0);
			return dto;
		}).collect(Collectors.toList());
	}

	// Method to convert DTO status to entity status
	private com.app.entity.Status convertToEntityStatus(com.app.entity.Status dtoStatus) {
		return com.app.entity.Status.valueOf(dtoStatus.name());
	}

}
