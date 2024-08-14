package com.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.VaccineDTO;
import com.app.services.VaccineService;

@RestController
@RequestMapping("/vaccines")
@CrossOrigin("*")
public class VaccineController {

	private final VaccineService vaccineService;

	public VaccineController(VaccineService vaccineService) {
		this.vaccineService = vaccineService;
	}

	@PostMapping("/createVaccine")
	public ResponseEntity<VaccineDTO> createVaccine(@RequestBody VaccineDTO vaccineDTO) {
		return ResponseEntity.ok(vaccineService.createVaccine(vaccineDTO));
	}

	@GetMapping("/getVaccineById/{id}")
	public ResponseEntity<VaccineDTO> getVaccineById(@PathVariable int id) {
		return ResponseEntity.ok(vaccineService.getVaccineById(id));
	}

	@GetMapping("/getAllVaccines")
	public ResponseEntity<List<VaccineDTO>> getAllVaccines() {
		return ResponseEntity.ok(vaccineService.getAllVaccines());
	}

	@PutMapping("/updateVaccine/{id}")
	public ResponseEntity<VaccineDTO> updateVaccine(@PathVariable int id, @RequestBody VaccineDTO vaccineDTO) {
		return ResponseEntity.ok(vaccineService.updateVaccine(id, vaccineDTO));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteVaccine/{id}")
	public ResponseEntity<Void> deleteVaccine(@PathVariable int id) {
		vaccineService.deleteVaccine(id);
		return ResponseEntity.noContent().build();
	}
}
