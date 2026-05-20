package com.example.tele_velocity.dto;

import com.example.tele_velocity.model.User;

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

    public Long getId() {
        return id;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getBio() {
        return bio;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }
}