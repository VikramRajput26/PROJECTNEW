package com.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ParentDTO;
import com.app.services.ParentService;

@RestController
@RequestMapping("/parents")
public class ParentController {

	private final ParentService parentService;

	public ParentController(ParentService parentService) {
		this.parentService = parentService;
	}

	@PostMapping
	public ResponseEntity<ParentDTO> createParent(@RequestBody ParentDTO parentDTO) {
		return ResponseEntity.ok(parentService.createParent(parentDTO));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ParentDTO> getParentById(@PathVariable int id) {
		return ResponseEntity.ok(parentService.getParentById(id));
	}

	@GetMapping
	public ResponseEntity<List<ParentDTO>> getAllParents() {
		return ResponseEntity.ok(parentService.getAllParents());
	}

	@PutMapping("/{id}")
	public ResponseEntity<ParentDTO> updateParent(@PathVariable int id, @RequestBody ParentDTO parentDTO) {
		return ResponseEntity.ok(parentService.updateParent(id, parentDTO));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteParent(@PathVariable int id) {
		parentService.deleteParent(id);
		return ResponseEntity.noContent().build();
	}
}
