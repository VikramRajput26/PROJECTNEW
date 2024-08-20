package com.app.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "Appointments")
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentId;

    @ManyToOne
    @JoinColumn(name = "child_id", referencedColumnName = "childId")
    private Child child;

    @ManyToOne
    @JoinColumn(name = "doctor_id", referencedColumnName = "userId")
    private User doctor;
    
    @ManyToOne
    @JoinColumn(name = "vaccine_id", referencedColumnName = "vaccineId")
    private Vaccine vaccine;

    private Date appointmentDate;
    private String reason;

    @Enumerated(EnumType.STRING)
    private Status status; // Use external Status enum
}
