package com.app.dto;

import java.time.LocalDate;

import com.app.entity.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppointmentDTO {

    private int appointmentId;
    private int childId;
    private int doctorId;
    private LocalDate appointmentDate;
    private String appointmentTime; // Format should be "hh:mm AM/PM"
    private Status status;
}
