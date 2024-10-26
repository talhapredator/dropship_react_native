package com.example.pro.service;

import com.example.pro.model.User;
import com.example.pro.model.UserProfile;
import com.example.pro.repository.UserProfileRepository;
import com.example.pro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    public UserProfile getUserProfileByUserId(Long userId) {
        Optional<UserProfile> profileOpt = Optional.ofNullable(userProfileRepository.findByUserId(userId));
        UserProfile profile = profileOpt.orElseGet(() -> createDefaultUserProfile(userId));
        // Optionally, log or use the email
        String email = profile.getEmail(); // Dynamically fetched from User entity
        System.out.println("User email: " + email);
        return profileOpt.orElseGet(() -> createDefaultUserProfile(userId));
    }

    private UserProfile createDefaultUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        UserProfile defaultProfile = new UserProfile();
        defaultProfile.setUser(user);
        defaultProfile.setFullName(user.getFullName());
        defaultProfile.setAddress("");
        defaultProfile.setCity("");
        defaultProfile.setPhoneNumber("");
        return userProfileRepository.save(defaultProfile);
    }

    public void ensureUserProfileExists(Long userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId);
        if (profile == null) {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            profile = new UserProfile();
            profile.setUser(user);
            profile.setFullName(user.getFullName());
            profile.setAddress("");
            profile.setCity("");
            profile.setPhoneNumber("");
            userProfileRepository.save(profile);
        }
    }

    public UserProfile updateUserProfile(Long userId, String fullName, String address, String city, String phoneNumber) {
        UserProfile profile = getUserProfileByUserId(userId);
        profile.setFullName(fullName);
        profile.setAddress(address);
        profile.setCity(city);
        profile.setPhoneNumber(phoneNumber);
        return userProfileRepository.save(profile);
    }
}
