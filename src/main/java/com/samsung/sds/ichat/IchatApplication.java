package com.samsung.sds.ichat;

import com.samsung.sds.ichat.entities.GroupMessage;
import com.samsung.sds.ichat.enums.Role;
import com.samsung.sds.ichat.payload.RegisterRequest;
import com.samsung.sds.ichat.repository.ChannelMessageRepository;
import com.samsung.sds.ichat.service.auth.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Timestamp;
import java.util.Date;

@SpringBootApplication
public class IchatApplication implements CommandLineRunner {

	@Autowired
	private AuthenticationService service;

	@Autowired
	private ChannelMessageRepository messageRepository;

	public static void main(String[] args) {
		SpringApplication.run(IchatApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		/*service.register(
				RegisterRequest.builder()
						.firstname("User")
						.lastname("Test")
						.email("vodanh2@gmail.com")
						.password("123456")
						.role(Role.USER)
						.profile("assets/images/users/avatar-2.jpg")
//						.status("online")
						.build()
		);*/

		/*messageRepository.save(
				GroupMessage.builder()
						.channelId(12)
						.sender(1)
						.createdAt(new Timestamp(new Date().getTime()))
						.content("hello")
						.build()
		);*/
	}
}
