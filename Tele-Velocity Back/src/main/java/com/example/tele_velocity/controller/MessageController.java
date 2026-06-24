package com.example.tele_velocity.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
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
import com.example.tele_velocity.model.MessageType;
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
                content,
                MessageType.TEXT
        );

        return messageRepository.save(message);
    }

    @PostMapping("/voice")
    public Message uploadVoice(
                @RequestParam("file") MultipartFile file,
                @RequestParam Long senderId,
                @RequestParam Long receiverId
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
        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg",
                "-i",
                targetFile.toString(),
                "-ac",
                "1",
                "-ar",
                "8000",
                "-f",
                "s16le",
                "-"
        );

        pb.redirectErrorStream(true);
        Process process = pb.start();

        byte[] pcmData = process.getInputStream().readAllBytes();

        List<Integer> waveform = new ArrayList<>();

        int totalSamples = pcmData.length / 2;
        int samplesPerBar = totalSamples / 50;

        for (int i = 0; i < 50; i++) {

                int start = i * samplesPerBar * 2;

                int end = Math.min(
                        start + samplesPerBar * 2,
                        pcmData.length
                );

                double sumSquares = 0;
                int count = 0;

                for (int j = start; j < end - 1; j += 2) {

                        short sample = (short)(
                                (pcmData[j + 1] << 8)
                                | (pcmData[j] & 0xff)
                        );

                        sumSquares += (double) sample * sample;
                        count++;
                }

                int rms = count > 0
                        ? (int)Math.sqrt(sumSquares / count)
                        : 0;

                waveform.add(rms);
        }

        int maxValue = waveform.stream()
                .max(Integer::compareTo)
                .orElse(1);

        List<Integer> normalized = waveform.stream()
                .map(value -> Math.max(
                        3,
                        (value * 30) / maxValue
                ))
                .toList();

        Message message = new Message(
                senderId,
                receiverId,
                fileName,
                MessageType.AUDIO
        );

        message.setWaveform(normalized.toString());

        return messageRepository.save(message);
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