package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaccineDTO {
    private int vaccineId;
    private String vaccineName;
    private String description;
    private int recommendedAge;
    private String sideEffects;
}
