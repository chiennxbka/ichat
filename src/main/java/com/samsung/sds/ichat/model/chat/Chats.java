package com.samsung.sds.ichat.model.chat;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Chats {
    private List<ChatMessage> chats;
    private List<ChatChannel> channel_chat;
}
