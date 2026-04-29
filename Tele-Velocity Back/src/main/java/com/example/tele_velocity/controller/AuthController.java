package com.example.tele_velocity.controller;

import org.springframework.web.bind.annotation.*;
import com.example.tele_velocity.dto.LoginRequest;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        // na razie na sztywno (test)
        if (request.email().equals("test@test.com") &&
            request.password().equals("1234")) {
            return "TOKEN_ABC";
        }

        throw new RuntimeException("Bad credentials");
    }
}