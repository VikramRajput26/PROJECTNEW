package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.app.dto.ChildDTO;
import com.app.entity.Child;
import com.app.repository.ChildRepository;

@Service
public class ChildService {

	private final ChildRepository childRepository;
	private final ModelMapper modelMapper;

	public ChildService(ChildRepository childRepository, ModelMapper modelMapper) {
		this.childRepository = childRepository;
		this.modelMapper = modelMapper;
	}

	public ChildDTO createChild(ChildDTO childDTO) {
		Child child = modelMapper.map(childDTO, Child.class);
		child = childRepository.save(child);
		return modelMapper.map(child, ChildDTO.class);
	}

	public ChildDTO getChildById(int id) {
		Child child = childRepository.findById(id).orElseThrow();
		return modelMapper.map(child, ChildDTO.class);
	}

	public List<ChildDTO> getAllChildren() {
		return childRepository.findAll().stream().map(child -> modelMapper.map(child, ChildDTO.class))
				.collect(Collectors.toList());
	}

	public ChildDTO updateChild(int id, ChildDTO childDTO) {
		Child child = childRepository.findById(id).orElseThrow();
		modelMapper.map(childDTO, child);
		child = childRepository.save(child);
		return modelMapper.map(child, ChildDTO.class);
	}

	public void deleteChild(int id) {
		childRepository.deleteById(id);
	}
}
