package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ChildDTO;
import com.app.services.ChildService;

@RestController
@RequestMapping("/api/children")
@CrossOrigin("*")
public class ChildController {

	@Autowired
	private ChildService childService;

	@PostMapping("/addchild")
	public ResponseEntity<ChildDTO> createChild(@RequestBody ChildDTO childDTO) {
		ChildDTO createdChild = childService.createChild(childDTO);
		return new ResponseEntity<>(createdChild, HttpStatus.CREATED);
	}

	@GetMapping("/getbyid/{id}")
	public ResponseEntity<ChildDTO> getChildById(@PathVariable int id) {
		ChildDTO childDTO = childService.getChildById(id);
		return new ResponseEntity<>(childDTO, HttpStatus.OK);
	}

	@GetMapping("/getallchild")
	public ResponseEntity<List<ChildDTO>> getAllChildren() {
		List<ChildDTO> children = childService.getAllChildren();
		return new ResponseEntity<>(children, HttpStatus.OK);
	}

	@GetMapping("/getbyparent/{parentId}")
	public ResponseEntity<List<ChildDTO>> getChildrenByParentId(@PathVariable int parentId) {
		List<ChildDTO> children = childService.getChildrenByParentId(parentId);
		return new ResponseEntity<>(children, HttpStatus.OK);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<ChildDTO> updateChild(@PathVariable int id, @RequestBody ChildDTO childDTO) {
		ChildDTO updatedChild = childService.updateChild(id, childDTO);
		return new ResponseEntity<>(updatedChild, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteChild(@PathVariable int id) {
		childService.deleteChild(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
