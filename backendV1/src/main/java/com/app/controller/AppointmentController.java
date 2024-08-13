package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentDTO;
import com.app.dto.UserDTO;
import com.app.services.AppointmentService;
import com.app.services.UserService;

@RestController
@RequestMapping("/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private final AppointmentService appointmentService;
    @Autowired
    private final JavaMailSender javaMailSender;
    @Autowired
    private final UserService userService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService, JavaMailSender javaMailSender, UserService userService) {
        this.appointmentService = appointmentService;
        this.javaMailSender = javaMailSender;
        this.userService = userService;
    }

    // Matches the /appointments/createapt URL
    @PostMapping("/createapt")
    public ResponseEntity<AppointmentDTO> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        AppointmentDTO createdAppointment = appointmentService.createAppointment(appointmentDTO);

        // Send email notification
        sendAppointmentScheduledEmail(createdAppointment);

        return ResponseEntity.ok(createdAppointment);
    }

    // Matches the /appointments/getById/{id} URL
    @GetMapping("/getById/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable int id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    // Matches the /appointments/getallapt URL
    @GetMapping("/getallapt")
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    // Matches the /appointments/updatapt/{id} URL
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/updatapt/{id}")
    public ResponseEntity<AppointmentDTO> updateAppointment(@PathVariable int id, @RequestBody AppointmentDTO appointmentDTO) {
        return ResponseEntity.ok(appointmentService.updateAppointment(id, appointmentDTO));
    }

    // Matches the /appointments/deleteapt/{id} URL
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/deleteapt/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable int id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    private void sendAppointmentScheduledEmail(AppointmentDTO appointmentDTO) {
        String userEmail = null;

        if (appointmentDTO.getDoctor() != null && appointmentDTO.getDoctor().getEmail() != null) {
            userEmail = appointmentDTO.getDoctor().getEmail();
        } else if (appointmentDTO.getChild() != null && appointmentDTO.getChild().getParentId() != 0) {
            userEmail = fetchParentEmailById(appointmentDTO.getChild().getParentId());
        }

        if (userEmail == null) {
            throw new IllegalArgumentException("User email cannot be null for sending appointment confirmation.");
        }

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(userEmail);
        email.setSubject("Appointment Scheduled");
        email.setText("Your appointment has been successfully scheduled. Appointment details:\n" +
                      "Date: " + appointmentDTO.getAppointmentDate() + "\n" +
                      "Reason: " + appointmentDTO.getReason() + "\n" +
                      "Thank you!");

        javaMailSender.send(email);
    }

    private String fetchParentEmailById(int parentId) {
        UserDTO parent = userService.getUserById(parentId);
        return parent.getEmail();
    }
}
