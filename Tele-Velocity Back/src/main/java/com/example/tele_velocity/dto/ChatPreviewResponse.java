package com.example.tele_velocity.dto;

public class ChatPreviewResponse {

    private Long id;

    private String name;

    private String avatarUrl;

    private String lastMessage;

    private String time;

    public ChatPreviewResponse(
            Long id,
            String name,
            String avatarUrl,
            String lastMessage,
            String time
    ) {
        this.id = id;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.lastMessage = lastMessage;
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public String getTime() {
        return time;
    }
}