package com.app.custom_exception;

@SuppressWarnings("serial")
public class DoctorNotFoundException extends RuntimeException {
	public DoctorNotFoundException(String message) {
		super(message);
	}
}
