package com.app.subdto;

import java.util.Set;

import com.app.dto.RoleDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSubDTO {
	private int userId;
	private String firstName;
	private String lastName;
	private String contactNumber;
	private String email;
	private String password;
	private Set<RoleDTO> roles;

}
