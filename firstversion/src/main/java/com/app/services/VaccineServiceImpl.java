package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.VaccineDTO;
import com.app.entity.Vaccine;
import com.app.repository.VaccineRepository;

@Service
public class VaccineServiceImpl implements VaccineService {
	@Autowired
	private final VaccineRepository vaccineRepository;
	@Autowired
	private final ModelMapper modelMapper;

	@Autowired
	public VaccineServiceImpl(VaccineRepository vaccineRepository, ModelMapper modelMapper) {
		this.vaccineRepository = vaccineRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public VaccineDTO createVaccine(VaccineDTO vaccineDTO) {
		Vaccine vaccine = modelMapper.map(vaccineDTO, Vaccine.class);
		vaccine = vaccineRepository.save(vaccine);
		return modelMapper.map(vaccine, VaccineDTO.class);
	}

	@Override
	public VaccineDTO getVaccineById(int id) {
		Vaccine vaccine = vaccineRepository.findById(id).orElseThrow();
		return modelMapper.map(vaccine, VaccineDTO.class);
	}

	@Override
	public List<VaccineDTO> getAllVaccines() {
		return vaccineRepository.findAll().stream().map(vaccine -> modelMapper.map(vaccine, VaccineDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public VaccineDTO updateVaccine(int id, VaccineDTO vaccineDTO) {
		Vaccine vaccine = vaccineRepository.findById(id).orElseThrow();
		modelMapper.map(vaccineDTO, vaccine);
		vaccine = vaccineRepository.save(vaccine);
		return modelMapper.map(vaccine, VaccineDTO.class);
	}

	@Override
	public void deleteVaccine(int id) {
		vaccineRepository.deleteById(id);
	}
}
