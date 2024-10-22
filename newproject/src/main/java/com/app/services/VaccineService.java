package com.app.services;

import java.util.List;

import com.app.dto.VaccineDTO;

public interface VaccineService {
    VaccineDTO createVaccine(VaccineDTO vaccineDTO);
    VaccineDTO getVaccineById(int id);
    List<VaccineDTO> getAllVaccines();
    VaccineDTO updateVaccine(int id, VaccineDTO vaccineDTO);
    void deleteVaccine(int id);
}
