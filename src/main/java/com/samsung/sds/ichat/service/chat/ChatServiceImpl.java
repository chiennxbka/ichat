package com.samsung.sds.ichat.service.chat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.samsung.sds.ichat.entities.User;
import com.samsung.sds.ichat.repository.UserRepository;
import com.samsung.sds.ichat.service.websocket.WebSocketHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.task.TaskExecutor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Tuple;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final UserRepository userChannelRepository;


    @Override
    public void leaveAllRoom(int userId) {
        var user = userChannelRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        user.setConnected(false);
        userChannelRepository.save(user);
    }
}
