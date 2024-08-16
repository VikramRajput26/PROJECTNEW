package com.app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.AdminDTO;
import com.app.dto.UserDTO;
import com.app.entity.Role;
import com.app.entity.User;
import com.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private final UserRepository userRepository;
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
		user.setRole(userDTO.getRole()); // Directly set the role
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
			user.setRole(userDTO.getRole()); // Update the role directly
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

	private UserDTO convertToDTO(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setUserId(user.getUserId());
		userDTO.setFirstName(user.getFirstName());
		userDTO.setLastName(user.getLastName());
		userDTO.setContactNumber(user.getContactNumber());
		userDTO.setEmail(user.getEmail());
		userDTO.setRole(user.getRole()); // Set the role directly
		return userDTO;
	}

	public List<AdminDTO> getAdminsByRole(String role) {
		// Convert the role string to the RoleEnum
		Role roleEnum = Role.valueOf(role.toUpperCase());

		// Fetch users by role and map to AdminDTO
		return userRepository.findByRole(roleEnum).stream()
				.map(user -> new AdminDTO(user.getUserId(), user.getFirstName(), user.getLastName()))
				.collect(Collectors.toList());
	}

	@Override
	public List<AdminDTO> getAllAdminUsers() {
		List<User> adminUsers = userRepository.findByRole(Role.ROLE_ADMIN);
		return adminUsers.stream()
				.map(user -> new AdminDTO(user.getUserId(), user.getFirstName(), user.getLastName()))
				.collect(Collectors.toList());
	}

}
