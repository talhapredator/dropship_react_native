package com.example.pro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.pro.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
