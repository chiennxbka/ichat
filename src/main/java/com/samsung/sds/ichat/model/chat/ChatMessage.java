package com.samsung.sds.ichat.model.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private int id;
    private int from_id;
    private int to_id;
    private boolean has_dropDown;
    private String msg;
    private String[] has_images;
    private String[] has_files;
    private String datetime;
    private int isReplied;
}
