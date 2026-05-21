package com.example.tele_velocity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tele_velocity.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    boolean existsByEmail(String email);
}