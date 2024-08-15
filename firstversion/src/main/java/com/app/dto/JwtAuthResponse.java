package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthResponse {
    private String token;
    private int userId; // Add this field
}
