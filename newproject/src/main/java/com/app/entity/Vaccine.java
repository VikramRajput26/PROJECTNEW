package com.app.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Vaccines")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Vaccine {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vaccineId;

    private String vaccineName;
    private String description;
    private int recommendedAge;
    private String sideEffects;
}
