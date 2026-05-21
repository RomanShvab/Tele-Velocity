package com.example.tele_velocity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.tele_velocity.model.Message;

public interface MessageRepository
        extends JpaRepository<Message, Long> {

    @Query("""
        SELECT m FROM Message m
        WHERE
        (m.senderId = :user1 AND m.receiverId = :user2)
        OR
        (m.senderId = :user2 AND m.receiverId = :user1)
        ORDER BY m.createdAt ASC
    """)
    List<Message> getChat(
            Long user1,
            Long user2
    );
}