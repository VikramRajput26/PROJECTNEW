package com.app.exception_handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.custom_exception.ApiException;
import com.app.custom_exception.DoctorNotFoundException;
import com.app.custom_exception.ParentNotFoundException;
import com.app.custom_exception.ResourceNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(DoctorNotFoundException.class)
	public ResponseEntity<String> handleDoctorNotFoundException(DoctorNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
	}

	@ExceptionHandler(ParentNotFoundException.class)
	public ResponseEntity<String> handleParentNotFoundException(ParentNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
	}

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<String> handleApiException(ApiException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
	}

}
