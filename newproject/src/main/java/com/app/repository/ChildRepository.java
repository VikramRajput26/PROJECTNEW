package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entity.Child;

public interface ChildRepository extends JpaRepository<Child, Integer> {
   
    @Query("SELECT c.parent.userId FROM Child c WHERE c.childId = :childId")
    int findParentIdByChildId(@Param("childId") int childId);

    List<Child> findByParent_UserId(int parentId);
}
