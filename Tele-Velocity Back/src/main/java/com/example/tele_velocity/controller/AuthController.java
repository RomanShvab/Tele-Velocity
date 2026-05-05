package com.example.tele_velocity.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tele_velocity.dto.LoginRequest;
import com.example.tele_velocity.dto.RegisterRequest;
import com.example.tele_velocity.model.User;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private List<User> users = new ArrayList<>();

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        for (User user : users) {
            if (user.getEmail().equals(request.email()) &&
                user.getPassword().equals(request.password())) {
                String token = UUID.randomUUID().toString();
                user.setToken(token);

                return user.getToken();
            }
        }

        throw new RuntimeException("Bad credentials");
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        for (User user : users) {
            if (user.getEmail().equals(request.email())) {
                throw new RuntimeException("User already exists");
            }
        }

        User newUser = new User(request.email(), request.password());
        users.add(newUser);

        return "User registered successfully";
    }
}