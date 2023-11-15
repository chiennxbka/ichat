package com.samsung.sds.ichat;

import com.samsung.sds.ichat.service.impl.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IchatApplication implements CommandLineRunner {

	@Autowired
	private AuthenticationService service;

	public static void main(String[] args) {
		SpringApplication.run(IchatApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		/*service.register(
				RegisterRequest.builder()
						.firstname("Vo")
						.lastname("Danh")
						.email("vodanh@gmail.com")
						.password("123456")
						.role(Role.USER)
						.profile("assets/images/users/avatar-1.jpg")
						.status("online")
						.build()
		);*/
	}
}
