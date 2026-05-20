package com.example.tele_velocity.repository;

import com.example.tele_velocity.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository
        extends JpaRepository<Contact, Long> {

    List<Contact> findByUserId(Long userId);

    boolean existsByUserIdAndContactId(
            Long userId,
            Long contactId
    );
}