package com.samsung.sds.ichat.config.websocket;

import com.samsung.sds.ichat.service.chat.ChatService;
import com.samsung.sds.ichat.service.websocket.WebSocketSessionPool;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    //    private final SimpMessageSendingOperations messagingTemplate;
    private final WebSocketSessionPool webSocketSessionPool;

    private final ChatService chatService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        final String sessionId = headerAccessor.getSessionId();
        Integer userId = null;
        try {
            userId = getUserId(headerAccessor);
        } catch (Exception e) {
            log.error("PARSE SOCKET USER ID ERROR!", e);
        }
        webSocketSessionPool.add(userId, sessionId);
        log.info("WebSocket session added: {}-{}", sessionId, userId);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        /*StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Integer senderId = (Integer) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("sender_id");
        if (senderId != null) {
            log.info("user disconnected: {}", senderId);
            var chatMessage = ChatMessage.builder()
                    .type(MessageType.LEAVE)
                    .from_id(senderId)// get current by id
                    .build();
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }*/
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        if (headerAccessor.getSessionAttributes() != null) {
            var email = (String) headerAccessor.getSessionAttributes().get("email");
            log.info(email);
        }
        this.destroySession(headerAccessor);
    }

    @EventListener
    public void handleWebSocketUnsubscribeListener(SessionUnsubscribeEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        this.destroySession(headerAccessor);
    }

    private int getUserId(StompHeaderAccessor accessor) {
        GenericMessage<?> generic = (GenericMessage<?>) accessor.getHeader(SimpMessageHeaderAccessor.CONNECT_MESSAGE_HEADER);
        if (generic != null) {
            SimpMessageHeaderAccessor nativeAccessor = SimpMessageHeaderAccessor.wrap(generic);
            List<String> userIdValue = nativeAccessor.getNativeHeader("userId");
            assert userIdValue != null;
            return userIdValue.isEmpty() ? 0 : userIdValue.stream().findFirst().map(Integer::valueOf).orElse(0);
        }
        return 0;
    }

    private void destroySession(StompHeaderAccessor headerAccessor) {
        final String sessionId = headerAccessor.getSessionId();
        /*Leave all room*/
        try {
            int userId = getUserId(headerAccessor);
            if (userId != 0){
                chatService.leaveAllRoom(userId);
                webSocketSessionPool.destroy(userId);
                log.info("WebSocket session destroyed: {}", sessionId);
            }
        } catch (Exception e) {
            log.error("PARSE SOCKET USER ID ERROR!", e);
        }
    }
}
