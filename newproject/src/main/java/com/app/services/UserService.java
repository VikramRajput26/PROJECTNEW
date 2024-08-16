package com.app.services;

import java.util.List;

import com.app.dto.AdminDTO;
import com.app.dto.UserDTO;

public interface UserService {
	UserDTO createUser(UserDTO userDTO);

	UserDTO updateUser(int userId, UserDTO userDTO);

	UserDTO getUserById(int userId);

	void deleteUser(int userId);

	List<UserDTO> getAllUsers();
	
	public List<AdminDTO> getAdminsByRole(String role);
	
	List<AdminDTO> getAllAdminUsers(); //get all ROLE_ADMIN users

}
