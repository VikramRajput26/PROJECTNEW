package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app.entity.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    
}
