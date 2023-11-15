package com.samsung.sds.ichat.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.samsung.sds.ichat.model.chat.Chats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ChatController {

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("/chats.json")
    public ResponseEntity<List<Chats>> getContacts() throws IOException {

        Resource resource = new ClassPathResource("fake/chats.json");
        File file = resource.getFile();
        List<Chats> chats = objectMapper.readValue(file, new TypeReference<>() {
        });
        return ResponseEntity.ok(chats);
    }
}
