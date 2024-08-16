package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.Role;
import com.app.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(Role role);
}
