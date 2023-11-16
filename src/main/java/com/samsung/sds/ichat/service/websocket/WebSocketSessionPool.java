package com.samsung.sds.ichat.service.websocket;

import lombok.Getter;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
@Getter
public class WebSocketSessionPool {

    private final ConcurrentHashMap<Integer, String> sessions = new ConcurrentHashMap<>();

    /**
     * Add single session ID for specific user ID
     */
    public void add(Integer userId, String sessionId) {
        addToPool(userId, sessionId);
    }

    /**
     * Kill the session ID
     */
    /*public void destroy(String sessionId) {
        List<Integer> removeKeys = new ArrayList<>();
        sessions.forEach((key, value) -> {
            boolean removed = value.removeIf(s -> s.equals(sessionId));
            if (removed && value.isEmpty())
                removeKeys.add(key);
        });

        if (!removeKeys.isEmpty()) {
            removeKeys.forEach(sessions::remove);
        }
    }*/

    /**
     * Kill the session ID
     */
    public void destroy(int userId) {
        sessions.remove(userId);
    }

    /**
     * Get list of session ID by specific user ID
     */
    /*public List<String> getUserSessionIds(int userId) {
        AtomicReference<List<String>> results = new AtomicReference<>(Collections.emptyList());
        sessions.forEach((key, value) -> {
            if (key == userId) {
                results.set(value == null ? Collections.emptyList() : new ArrayList<>(value));
            }
        });

        return results.get();
    }*/

    /**
     * Get user ID by specific session ID
     */
    public Integer getUserIdBySessionId(String sessionId) {
        var singleMap = sessions.entrySet().stream()
                .filter(entry -> sessions.get(entry.getKey()) != null
                        && !sessions.get(entry.getKey()).isEmpty()
                        && sessions.get(entry.getKey()).contains(sessionId))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        if (singleMap.isEmpty())
            return null;

        var entry = singleMap.entrySet().stream().findFirst();
        return entry.map(Map.Entry::getKey).orElse(null);
    }

    private void addToPool(Integer userId, String sessionId) {
        if (!sessions.containsKey(userId) || sessions.get(userId) == null) {
            sessions.put(userId, sessionId);
        } else {
            sessions.replace(userId, sessionId);
        }
    }

    public String getSessionIdByUserId(int userId) {
        return sessions.get(userId);
    }
}
