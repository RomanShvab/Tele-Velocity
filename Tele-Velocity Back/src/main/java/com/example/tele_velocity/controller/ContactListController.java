package com.example.tele_velocity.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tele_velocity.dto.AuthResponse;
import com.example.tele_velocity.model.Contact;
import com.example.tele_velocity.model.User;
import com.example.tele_velocity.repository.ContactRepository;
import com.example.tele_velocity.repository.UserRepository;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "*")
public class ContactListController {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    public ContactListController(
            ContactRepository contactRepository,
            UserRepository userRepository
    ) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/add")
    public String addContact(
            @RequestParam Long userId,
            @RequestParam String email
    ) {

        User contactUser = userRepository.findByEmail(email);

        if (contactUser == null)
            return "User not found";

        if (userId.equals(contactUser.getId()))
            return "You can't add yourself";

        boolean exists = contactRepository
                .existsByUserIdAndContactId(
                        userId,
                        contactUser.getId()
                );

        if (exists)
            return "Contact already exists";

        contactRepository.save(
                new Contact(userId, contactUser.getId())
        );

        contactRepository.save(
                new Contact(contactUser.getId(), userId)
        );

        return "Contact added";
    }

    @GetMapping("/{userId}")
    public List<AuthResponse> getContacts(
            @PathVariable Long userId
    ) {

        List<Contact> contacts =
                contactRepository.findByUserId(userId);

        List<AuthResponse> result = new ArrayList<>();

        for (Contact contact : contacts) {

            User user = userRepository
                    .findById(contact.getContactId())
                    .orElse(null);

            if (user != null) {
                result.add(new AuthResponse(user));
            }
        }

        return result;
    }
}