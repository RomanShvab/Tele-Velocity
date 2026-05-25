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
import com.example.tele_velocity.dto.ChatPreviewResponse;
import com.example.tele_velocity.model.Contact;
import com.example.tele_velocity.model.Message;
import com.example.tele_velocity.model.User;
import com.example.tele_velocity.repository.ContactRepository;
import com.example.tele_velocity.repository.UserRepository;
import com.example.tele_velocity.services.ContactService;
import com.example.tele_velocity.services.MessageService;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "*")
public class ContactListController {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;
    private final ContactService contactService;
    private final MessageService messageService;

    public ContactListController(
            ContactRepository contactRepository,
            UserRepository userRepository,
            ContactService contactService,
            MessageService messageService
    ) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
        this.contactService = contactService;
        this.messageService = messageService;
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

    @GetMapping("/users/{id}")
    public AuthResponse getUSer(
        @PathVariable Long id
    )
    {
        User user = userRepository.findById(id).orElse(null);

        if(user == null)
            return null;
        
        return new AuthResponse(user);
    }

    @GetMapping("/chat-previews/{userId}")
        public List<ChatPreviewResponse> getChatPreviews(
                @PathVariable Long userId
        ) {

        List<User> contacts =
                contactService.getContacts(userId);

        List<ChatPreviewResponse> previews =
                new ArrayList<>();

        for (User contact : contacts) {

                Message lastMessage =
                        messageService.getLastMessageBetweenUsers(
                                userId,
                                contact.getId()
                        );

                previews.add(
                        new ChatPreviewResponse(
                                contact.getId(),
                                contact.getName(),
                                contact.getAvatarUrl(),

                                lastMessage != null
                                        ? lastMessage.getContent()
                                        : "",

                                lastMessage != null
                                        ? lastMessage
                                        .getCreatedAt()
                                        .toString()
                                        : ""
                        )
                );
        }

        previews.sort((a, b) -> {

                if (a.getTime() == null || a.getTime().isEmpty())
                        return 1;

                if (b.getTime() == null || b.getTime().isEmpty())
                        return -1;

                return b.getTime().compareTo(a.getTime());
        });

        return previews;
        }
}