package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exception.ApiException;
import com.app.dto.JwtAuthRequest;
import com.app.dto.JwtAuthResponse;
import com.app.dto.UserDTO;
import com.app.entity.User;
import com.app.security.JwtTokenHelper;
import com.app.services.UserService;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserService userService;

	@Autowired
	private JavaMailSender javaMailSender;

	@PostMapping("/sign-in")
	public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) throws Exception {
		this.authenticate(request.getEmail(), request.getPassword());

		UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getEmail());
		String token = this.jwtTokenHelper.generateToken(userDetails);

		// Fetch user information
		User user = (User) userDetails; // Assuming UserDetails implementation is User
		int userId = user.getUserId();

		JwtAuthResponse response = new JwtAuthResponse();
		response.setToken(token);
		response.setUserId(userId); // Set userId in response

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	private void authenticate(String email, String password) {
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,
				password);

		try {
			this.authenticationManager.authenticate(authenticationToken);
		} catch (BadCredentialsException e) {
			throw new ApiException("Invalid email or password");
		}
	}

	@PostMapping("/sign-up")
	public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
		UserDTO registeredUser = userService.createUser(userDTO);

		// Send email after successful sign-up
		sendSignUpSuccessEmail(userDTO.getEmail());

		return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout() {
		return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
	}

	private void sendSignUpSuccessEmail(String email) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("LITTLE-HANDS Successful Sign-Up Notification");
		message.setText(
				"Dear user,\n\nYou have successfully signed up for an account with LITTLE HANDS.\n\nThank you,\nYour Company");

		javaMailSender.send(message);
	}
}
