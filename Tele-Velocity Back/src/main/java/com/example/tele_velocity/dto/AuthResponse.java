package com.example.tele_velocity.dto;

import com.example.tele_velocity.model.User;

import lombok.Getter;

@Getter
public class AuthResponse {

    private Long id;
    private String avatarUrl;
    private String bio;
    private String email;
    private String name;
    private String phone;

    public AuthResponse(User user) {
        this.id = user.getId();
        this.avatarUrl = user.getAvatarUrl();
        this.bio = user.getBio();
        this.email = user.getEmail();
        this.name = user.getName();
        this.phone = user.getPhone();
    }
}
