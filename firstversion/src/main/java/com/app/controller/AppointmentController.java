package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentDTO;
import com.app.services.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;

	@PostMapping("/create")
	public ResponseEntity<AppointmentDTO> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
		AppointmentDTO createdAppointment = appointmentService.createAppointment(appointmentDTO);
		return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<AppointmentDTO> updateAppointment(@PathVariable("id") int appointmentId,
			@RequestBody AppointmentDTO appointmentDTO) {
		AppointmentDTO updatedAppointment = appointmentService.updateAppointment(appointmentId, appointmentDTO);
		return updatedAppointment != null ? new ResponseEntity<>(updatedAppointment, HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteAppointment(@PathVariable("id") int appointmentId) {
		appointmentService.deleteAppointment(appointmentId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/getbyid/{id}")
	public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable("id") int appointmentId) {
		AppointmentDTO appointmentDTO = appointmentService.getAppointmentById(appointmentId);
		return appointmentDTO != null ? new ResponseEntity<>(appointmentDTO, HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/getall")
	public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
		List<AppointmentDTO> appointments = appointmentService.getAllAppointments();
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}
}
