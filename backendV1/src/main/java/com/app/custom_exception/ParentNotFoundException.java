package com.app.custom_exception;

@SuppressWarnings("serial")
public class ParentNotFoundException extends RuntimeException {
	public ParentNotFoundException(String message) {
		super(message);
	}
}