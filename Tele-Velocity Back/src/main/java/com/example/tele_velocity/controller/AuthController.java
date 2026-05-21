package com.example.tele_velocity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tele_velocity.dto.AuthResponse;
import com.example.tele_velocity.dto.LoginRequest;
import com.example.tele_velocity.dto.RegisterRequest;
import com.example.tele_velocity.dto.UpdateUserRequest;
import com.example.tele_velocity.model.User;
import com.example.tele_velocity.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        if(userRepository.existsByEmail(request.getEmail()))
            return "User already exist";

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        userRepository.save(user);

        return "User created";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail());

        if (user == null)
            return null;

        if (!user.getPassword().equals(request.getPassword()))
            return null;

        return new AuthResponse(user);
    }

    @PutMapping("/user/{id}")
    public AuthResponse updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest request
    ) {

        User user = userRepository.findById(id).orElse(null);

        if(user == null)
            return null;

        user.setName(request.getName());
        user.setBio(request.getBio());
        user.setPhone(request.getPhone());
        user.setAvatarUrl(request.getAvatarUrl());

        userRepository.save(user);

        return new AuthResponse(user);
    }
}