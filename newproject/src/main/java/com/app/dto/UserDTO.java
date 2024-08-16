package com.app.dto;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.app.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
	private int userId;
	private String firstName;
	private String lastName;
	private String contactNumber;
	private String email;
	private String password; // Added password field
	@Enumerated(EnumType.STRING)
	private Role role;

}
