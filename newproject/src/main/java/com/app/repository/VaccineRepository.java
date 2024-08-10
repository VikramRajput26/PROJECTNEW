package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Vaccine;

public interface VaccineRepository extends JpaRepository<Vaccine, Integer> {
}
