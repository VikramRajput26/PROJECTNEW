package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ChildDTO;
import com.app.entity.Child;
import com.app.entity.User;
import com.app.repository.ChildRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class ChildServiceImpl implements ChildService {

	@Autowired
	private ChildRepository childRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ChildDTO createChild(ChildDTO childDTO) {
		Child child = modelMapper.map(childDTO, Child.class);

		// Set Parent
		if (childDTO.getParentId() != 0) {
			User parent = userRepository.findById(childDTO.getParentId())
					.orElseThrow(() -> new RuntimeException("Parent not found"));
			child.setParent(parent);
		}

		child = childRepository.save(child);

		// Map Child to ChildDTO and set parentId manually
		ChildDTO responseDTO = modelMapper.map(child, ChildDTO.class);
		if (child.getParent() != null) {
			responseDTO.setParentId(child.getParent().getUserId());
		}

		return responseDTO;
	}

	@Override
	public ChildDTO getChildById(int id) {
		Child child = childRepository.findById(id).orElseThrow(() -> new RuntimeException("Child not found"));
		ChildDTO responseDTO = modelMapper.map(child, ChildDTO.class);
		if (child.getParent() != null) {
			responseDTO.setParentId(child.getParent().getUserId());
		}
		return responseDTO;
	}

	@Override
	public List<ChildDTO> getAllChildren() {
		return childRepository.findAll().stream().map(child -> {
			ChildDTO childDTO = modelMapper.map(child, ChildDTO.class);
			if (child.getParent() != null) {
				childDTO.setParentId(child.getParent().getUserId());
			}
			return childDTO;
		}).collect(Collectors.toList());
	}

	@Override
	public List<ChildDTO> getChildrenByParentId(int parentId) {
		return childRepository.findByParent_UserId(parentId).stream().map(child -> {
			ChildDTO childDTO = modelMapper.map(child, ChildDTO.class);
			childDTO.setParentId(parentId);
			return childDTO;
		}).collect(Collectors.toList());
	}

	@Override
	public void deleteChild(int id) {
		if (!childRepository.existsById(id)) {
			throw new RuntimeException("Child not found");
		}
		childRepository.deleteById(id);
	}

	@Override
	public ChildDTO updateChild(int id, ChildDTO childDTO) {
		// Find existing Child entity
		Child existingChild = childRepository.findById(id).orElseThrow(() -> new RuntimeException("Child not found"));

		// Update fields
		existingChild.setFirstName(childDTO.getFirstName());
		existingChild.setLastName(childDTO.getLastName());
		existingChild.setDateOfBirth(childDTO.getDateOfBirth());
		existingChild.setGender(childDTO.getGender());
		existingChild.setBloodType(childDTO.getBloodType());

		// Update Parent if needed
		if (childDTO.getParentId() != 0) {
			User parent = userRepository.findById(childDTO.getParentId())
					.orElseThrow(() -> new RuntimeException("Parent not found"));
			existingChild.setParent(parent);
		} else {
			existingChild.setParent(null);
		}

		// Save updated child entity
		Child updatedChild = childRepository.save(existingChild);

		// Convert to DTO
		ChildDTO responseDTO = modelMapper.map(updatedChild, ChildDTO.class);
		if (updatedChild.getParent() != null) {
			responseDTO.setParentId(updatedChild.getParent().getUserId());
		}

		return responseDTO;
	}

	@Override
	public int getParentIdByChildId(int childId) {
		Child child = childRepository.findById(childId).orElseThrow(() -> new RuntimeException("Child not found"));

		if (child.getParent() != null) {
			return child.getParent().getUserId();
		} else {
			throw new RuntimeException("Parent not found for the given child");
		}
	}
}
