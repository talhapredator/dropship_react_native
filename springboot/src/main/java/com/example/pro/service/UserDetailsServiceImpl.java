package com.example.pro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.pro.model.User;

import com.example.pro.repository.UserRepository;
import com.example.pro.security.UserPrincipal;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileService profileService; // Service to handle profiles

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Ensure the user profile is created or updated
        profileService.ensureUserProfileExists(user.getId());

        return UserPrincipal.create(user);
    }
}
