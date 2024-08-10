package com.app.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int userId;
	private String firstName;
	private String lastName;
	private String contactNumber;
	private String email;
	private String password; // Added password field
	private Set<RoleDTO> roles;

}
