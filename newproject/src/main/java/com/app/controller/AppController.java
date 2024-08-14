package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.EmailDTO;

@RestController
public class AppController {

	@Autowired
	private JavaMailSender javaMailSender;

	@PostMapping("/sendemail")
	public String sendEmail(@RequestBody EmailDTO emailDTO) {
		if (emailDTO.getTo() == null || emailDTO.getTo().isEmpty()) {
			return "Recipient email address is required";
		}
		if (emailDTO.getSubject() == null || emailDTO.getSubject().isEmpty()) {
			return "Email subject is required";
		}
		if (emailDTO.getText() == null || emailDTO.getText().isEmpty()) {
			return "Email text is required";
		}

		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setTo(emailDTO.getTo());
		simpleMailMessage.setSubject(emailDTO.getSubject());
		simpleMailMessage.setText(emailDTO.getText());
		javaMailSender.send(simpleMailMessage);

		return "Email sent successfully";
	}
}
