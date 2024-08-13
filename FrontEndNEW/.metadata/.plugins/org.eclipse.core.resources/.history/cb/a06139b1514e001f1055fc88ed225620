package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.app.dto.DoctorDTO;
import com.app.entity.Doctor;
import com.app.repository.DoctorRepository;

@Service
public class DoctorService {

	private final DoctorRepository doctorRepository;
	private final ModelMapper modelMapper;

	public DoctorService(DoctorRepository doctorRepository, ModelMapper modelMapper) {
		this.doctorRepository = doctorRepository;
		this.modelMapper = modelMapper;
	}

	public DoctorDTO createDoctor(DoctorDTO doctorDTO) {
		Doctor doctor = modelMapper.map(doctorDTO, Doctor.class);
		doctor = doctorRepository.save(doctor);
		return modelMapper.map(doctor, DoctorDTO.class);
	}

	public DoctorDTO getDoctorById(int id) {
		Doctor doctor = doctorRepository.findById(id).orElseThrow();
		return modelMapper.map(doctor, DoctorDTO.class);
	}

	public List<DoctorDTO> getAllDoctors() {
		return doctorRepository.findAll().stream().map(doctor -> modelMapper.map(doctor, DoctorDTO.class))
				.collect(Collectors.toList());
	}

	public DoctorDTO updateDoctor(int id, DoctorDTO doctorDTO) {
		Doctor doctor = doctorRepository.findById(id).orElseThrow();
		modelMapper.map(doctorDTO, doctor);
		doctor = doctorRepository.save(doctor);
		return modelMapper.map(doctor, DoctorDTO.class);
	}

	public void deleteDoctor(int id) {
		doctorRepository.deleteById(id);
	}
}
