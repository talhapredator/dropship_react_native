package com.example.pro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.pro.model.User;
import com.example.pro.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.validation.annotation.Validated;
import org.springframework.validation.BindingResult;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest, HttpSession session) {
        System.out.println("Login attempt for email: " + loginRequest.getEmail());
        User user = userService.findByEmail(loginRequest.getEmail());
        if (user == null) {
            System.out.println("User not found with email: " + loginRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        } else {
            System.out.println("User found: " + user.getEmail());
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // Store user ID in session
            session.setAttribute("userId", user.getId());
            return ResponseEntity.ok("Login successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result.getAllErrors());
        }

        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        // Invalidate the session to log the user out
        session.invalidate();

        // Clear the security context
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok("Logout successful");
    }
    @PutMapping("/update-email-password")
    public ResponseEntity<?> updateEmailAndPassword(@RequestBody User updatedUser, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        User currentUser = userService.findById(userId);

        // Verify the current password before allowing changes
        if (!userService.checkPassword(currentUser, updatedUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid current password");
        }

        // Check if the new email already exists in the system
        if (userService.findByEmail(updatedUser.getEmail()) != null && !updatedUser.getEmail().equals(currentUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        // Proceed with the update of both email and password
        userService.updateEmailAndPassword(currentUser, updatedUser.getEmail(), updatedUser.getPassword());
        return ResponseEntity.ok("Email and password updated successfully");
    }
}
