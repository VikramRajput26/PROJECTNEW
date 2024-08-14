package com.app.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class AppointmentDTO {

    private int appointmentId;
    private int childId;
    private int doctorId;
    private LocalDate appointmentDate;
    private String appointmentTime; // Format should be "hh:mm AM/PM"
    private Status status;
}
