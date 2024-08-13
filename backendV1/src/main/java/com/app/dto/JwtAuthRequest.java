package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthRequest {

	private String email;
	private String password;
}
