package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Child;

public interface ChildRepository extends JpaRepository<Child, Integer> {
    List<Child> findByParent_UserId(int parentId);
}
