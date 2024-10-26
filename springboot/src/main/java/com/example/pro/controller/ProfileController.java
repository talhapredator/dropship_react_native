package com.example.pro.controller;

import com.example.pro.model.User;
import com.example.pro.model.UserProfile;
import com.example.pro.service.ProfileService;
import com.example.pro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserService userService;

    // Fetch the user profile based on the userId
    @GetMapping
    public ResponseEntity<?> getUserProfile(HttpSession session) {
        // Get the userId from the session
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401).body("User not logged in");
        }

        UserProfile userProfile = profileService.getUserProfileByUserId(userId);

        if (userProfile == null) {
            return ResponseEntity.status(404).body("Profile not found for user ID: " + userId);
        }

        return ResponseEntity.ok(userProfile);
    }


    // Update the user profile based on the userId
    @PutMapping("/update")
    public ResponseEntity<UserProfile> updateProfile(HttpSession session, @RequestBody UserProfile profileRequest) {
        try {
            // Get the userId from the session
            Long userId = (Long) session.getAttribute("userId");

            if (userId == null) {
                return ResponseEntity.status(401).body(null); // User not logged in
            }

            // Fetch the user profile based on the session-stored userId
            UserProfile userProfile = profileService.getUserProfileByUserId(userId);
            if (userProfile == null) {
                return ResponseEntity.notFound().build(); // User profile not found
            }

            // Update the existing user profile with the new data
            userProfile.setFullName(profileRequest.getFullName());
            userProfile.setAddress(profileRequest.getAddress());
            userProfile.setCity(profileRequest.getCity());
            userProfile.setPhoneNumber(profileRequest.getPhoneNumber());

            // Save the updated profile
            UserProfile updatedProfile = profileService.updateUserProfile(userId,
                    profileRequest.getFullName(),
                    profileRequest.getAddress(),
                    profileRequest.getCity(),
                    profileRequest.getPhoneNumber());

            return ResponseEntity.ok(updatedProfile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // Internal Server Error
        }
    }

}
