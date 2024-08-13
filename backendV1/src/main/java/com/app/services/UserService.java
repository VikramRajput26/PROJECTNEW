package com.app.services;

import java.util.List;

import com.app.dto.UserDTO;

public interface UserService {
	UserDTO createUser(UserDTO userDTO);

	UserDTO updateUser(int userId, UserDTO userDTO);

	UserDTO getUserById(int userId);

	void deleteUser(int userId);

	List<UserDTO> getAllUsers();
}
