package com.example.tele_velocity.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.tele_velocity.model.Message;
import com.example.tele_velocity.repository.MessageRepository;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageRepository messageRepository;

    public MessageController(
            MessageRepository messageRepository
    ) {
        this.messageRepository = messageRepository;
    }

    @PostMapping("/send")
    public Message sendMessage(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestParam String content
    ) {

        Message message = new Message(
                senderId,
                receiverId,
                content
        );

        return messageRepository.save(message);
    }

    @PostMapping("/voice")
    public String uploadVoice(
                @RequestParam("file") MultipartFile file
        )
    throws IOException {
        String fileName = UUID.randomUUID() + ".webm";

        Path uploadDir = Paths.get("uploads", "voices");

        Files.createDirectories(uploadDir);

        Path targetFile = uploadDir.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                targetFile, 
                StandardCopyOption.REPLACE_EXISTING
        );

        return fileName;
    }

    @GetMapping("/chat")
    public List<Message> getChat(
            @RequestParam Long user1,
            @RequestParam Long user2
    ) {

        return messageRepository.getChat(
                user1,
                user2
        );
    }
}