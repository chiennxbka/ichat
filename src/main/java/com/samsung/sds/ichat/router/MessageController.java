package com.samsung.sds.ichat.router;

import com.samsung.sds.ichat.enums.ChannelType;
import com.samsung.sds.ichat.model.chat.ChatMessage;
import com.samsung.sds.ichat.service.websocket.WebSocketSessionPool;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final WebSocketSessionPool webSocketSessionPool;

    @MessageMapping("/chat.sendMessage")
//    @SendTo("/topic/public")
    public ChatMessage sendMessage(
            SimpMessageHeaderAccessor sha,
            @Payload ChatMessage chatMessage
    ) {
        // thread save message to database
        if (chatMessage.getChannelType() == ChannelType.ONE) {
            // TODO......
            // send to specifical topic
            String sessionDestination = webSocketSessionPool.getSessionIdByUserId(chatMessage.getTo_id());
            if (StringUtils.hasText(sessionDestination)) {
                // push notification and send message
                simpMessagingTemplate.convertAndSendToUser(sessionDestination, "/queue/messages", chatMessage);
            }
        } else {
            simpMessagingTemplate.convertAndSendToUser(String.valueOf(chatMessage.getTo_id()), "/queue/messages", chatMessage);
        }



        return chatMessage;
    }

    /*@MessageMapping("/chat.join")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {

        // subscribe all my topic

        // Add username in web socket session
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("sender_id", chatMessage.getFrom_id());
        return chatMessage;
    }*/

    /*@MessageMapping("/chat.join")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Add username in web socket session
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("sender_id", chatMessage.getFrom_id());
        return chatMessage;
    }

    @MessageMapping("/chat.join")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Add username in web socket session
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("sender_id", chatMessage.getFrom_id());
        return chatMessage;
    }


    /*send_message(user_id, receiver_id, channel_type, message)
    get_messages(user_id, receiver_id, channel_type, earliest_message_id)
    join_group(user_id, channel_id)
    leave_group(user_id, channel_id)
    get_all_group(user_id)*/
}
