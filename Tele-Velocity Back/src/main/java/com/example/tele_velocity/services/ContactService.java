package com.example.tele_velocity.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.tele_velocity.model.Contact;
import com.example.tele_velocity.model.User;
import com.example.tele_velocity.repository.ContactRepository;
import com.example.tele_velocity.repository.UserRepository;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    private final UserRepository userRepository;

    public ContactService(
            ContactRepository contactRepository,
            UserRepository userRepository
    ) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    public List<User> getContacts(Long userId) {

        List<Contact> contacts =
                contactRepository.findByUserId(userId);

        List<User> users = new ArrayList<>();

        for (Contact contact : contacts) {

            User user = userRepository
                    .findById(contact.getContactId())
                    .orElse(null);

            if (user != null) {
                users.add(user);
            }
        }

        return users;
    }
}