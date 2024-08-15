package com.app.dto;

import java.util.Date;

import com.app.entity.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(Include.NON_NULL)
public class ChildDTO {
	private int childId;
	private int parentId;
	private String firstName;
	private String lastName;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date dateOfBirth;

	private Gender gender;
	private String bloodType;
}
