package com.app.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.RoleDTO;
import com.app.dto.UserDTO;
import com.app.entity.Role;
import com.app.entity.User;
import com.app.repository.RoleRepository;
import com.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	@Autowired
	private final UserRepository userRepository;
	@Autowired
	private final RoleRepository roleRepository;
	@Autowired
	private final PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public UserDTO createUser(UserDTO userDTO) {
		User user = new User();
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		user.setContactNumber(userDTO.getContactNumber());
		user.setEmail(userDTO.getEmail());
		user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		user.setRoles(convertToRoleEntities(userDTO.getRoles()));
		user = userRepository.save(user);
		return convertToDTO(user);
	}

	@Override

	public UserDTO updateUser(int userId, UserDTO userDTO) {
		Optional<User> optionalUser = userRepository.findById(userId);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			user.setFirstName(userDTO.getFirstName());
			user.setLastName(userDTO.getLastName());
			user.setContactNumber(userDTO.getContactNumber());
			if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
				user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
			}
			user.setEmail(userDTO.getEmail());
			user.setRoles(convertToRoleEntities(userDTO.getRoles()));
			user = userRepository.save(user);
			return convertToDTO(user);
		}
		throw new RuntimeException("User not found");
	}

	@Override
	public UserDTO getUserById(int userId) {
		Optional<User> user = userRepository.findById(userId);
		return user.map(this::convertToDTO).orElseThrow(() -> new RuntimeException("User not found"));
	}

	@Override
	@Transactional
	public void deleteUser(int userId) {
		if (!userRepository.existsById(userId)) {
			throw new RuntimeException("User not found");
		}
		userRepository.deleteById(userId);
	}

	@Override
	public List<UserDTO> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private Set<Role> convertToRoleEntities(Set<RoleDTO> roleDTOs) {
		return roleDTOs.stream()
				.map(roleDTO -> roleRepository.findByName(roleDTO.getName())
						.orElseThrow(() -> new RuntimeException("Role not found: " + roleDTO.getName())))
				.collect(Collectors.toSet());
	}

	private UserDTO convertToDTO(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setUserId(user.getUserId());
		userDTO.setFirstName(user.getFirstName());
		userDTO.setLastName(user.getLastName());
		userDTO.setContactNumber(user.getContactNumber());
		userDTO.setEmail(user.getEmail());
		userDTO.setRoles(user.getRoles().stream().map(role -> new RoleDTO(role.getName())).collect(Collectors.toSet()));
		return userDTO;
	}

}
