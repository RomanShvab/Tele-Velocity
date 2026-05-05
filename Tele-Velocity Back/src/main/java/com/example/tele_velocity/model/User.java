package com.example.tele_velocity.model;

public class User {
    private String email;
    private String password;
    private String token;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
