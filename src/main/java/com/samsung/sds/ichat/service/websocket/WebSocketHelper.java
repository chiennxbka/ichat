package com.samsung.sds.ichat.service.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketHelper {

    private static final String ROOM_DESTINATION_PREFIX = "/queue/specific-room-user";

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final WebSocketSessionPool webSocketSessionPool;

    /*public void sendMessageToAllSession(Map<String, Object> payload) {
        if (webSocketSessionPool.getSessions().isEmpty())
            return;

        webSocketSessionPool.getSessions().forEach((userId, sessions) -> {
            if (sessions == null || sessions.isEmpty())
                return;

            sessions.forEach(sessionId -> {
                try {
                    sendMessageToSingleSession(sessionId, payload);
                } catch (JsonProcessingException e) {
                    log.error(e.getMessage());
                }
            });
        });
    }*/

    public void sendMessageToSingleSession(String sessionId, Map<String, Object> payload) throws JsonProcessingException {
        if (StringUtils.hasText(sessionId))
            return;

        final var destination = ROOM_DESTINATION_PREFIX + sessionId;
        messagingTemplate.convertAndSend(destination, payload);

        log.info("[SENT_TO] Destination: {}, Response: {}", destination, objectMapper.writeValueAsString(payload));
    }

    /**
     * Send a message to all session by user ID (multiple device)
     */
    /*public void sendMessageToUser(Integer userId, Map<String, Object> payload) throws JsonProcessingException {
        if (userId == null)
            return;

        List<String> sessionIds = webSocketSessionPool.getUserSessionIds(userId);
        final var destinationPrefix = ROOM_DESTINATION_PREFIX;
        sessionIds.forEach(sessionId -> messagingTemplate.convertAndSend(destinationPrefix + sessionId, payload));

        log.info("[SENT_TO] Destination Prefix: {}, Send to {} sessions: {}, Response: {}",
                destinationPrefix, sessionIds.size(), sessionIds, objectMapper.writeValueAsString(payload));
    }*/
}
