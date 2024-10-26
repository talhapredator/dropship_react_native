package com.example.pro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.pro.model.User;
import com.example.pro.model.UserProfile;
import com.example.pro.repository.UserRepository;
import com.example.pro.repository.UserProfileRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserProfileRepository userProfileRepository;

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserProfile getUserProfile(Long userId) {
        return userProfileRepository.findByUserId(userId);
    }

    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public boolean checkPassword(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }

    // Update both email and password
    public void updateEmailAndPassword(User user, String newEmail, String newPassword) {
        // Update email
        user.setEmail(newEmail);

        // Encode and update the password
        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
    }

}
