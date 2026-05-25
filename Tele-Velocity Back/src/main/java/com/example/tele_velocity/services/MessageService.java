package com.example.tele_velocity.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.tele_velocity.model.Message;
import com.example.tele_velocity.repository.MessageRepository;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(
            MessageRepository messageRepository
    ) {
        this.messageRepository = messageRepository;
    }

    public Message getLastMessageBetweenUsers(
            Long user1,
            Long user2
    ) {

        List<Message> messages =
                messageRepository.getChat(
                        user1,
                        user2
                );

        if (messages.isEmpty()) {
            return null;
        }

        return messages.get(messages.size() - 1);
    }
}