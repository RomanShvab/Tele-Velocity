package com.example.tele_velocity.dto;

public class UpdateUserRequest {
    private String name;
    private String bio;
    private String phone;
    private String avatarUrl;

    public String getName() {
        return name;
    }

    public String getBio() {
        return bio;
    }

    public String getPhone() {
        return phone;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }
}