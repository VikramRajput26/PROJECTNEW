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
@Table(name = "Children")
@Data
public class Child {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int childId;

	@ManyToOne
	@JoinColumn(name = "parent_id", referencedColumnName = "userId")
	private User parent;

	private String firstName;
	private String lastName;
	private Date dateOfBirth;

	@Enumerated(EnumType.STRING)
	private Gender gender;

	private String bloodType;
}
