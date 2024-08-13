package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
}
