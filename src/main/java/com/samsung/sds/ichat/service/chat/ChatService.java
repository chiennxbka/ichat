package com.samsung.sds.ichat.service.chat;

public interface ChatService {

    default void deleteChatRoom(int roomId, int userId) {

    }

    default void leaveRoom(int userId, int channelId) {

    }

    default void leaveAllRoom(int userId) {

    }

    default void addUserToRoom(int userId) {

    }
}
