package com.samsung.sds.ichat.repository;

import java.util.Optional;

import com.samsung.sds.ichat.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

  @Transactional
  Long deleteByEmail(String email);

}
