package com.example.pro.controller;

import com.example.pro.model.Cart;
import com.example.pro.model.CartItem;
import com.example.pro.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;  // Add this import
import java.util.Map;  // Add this import


@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentCart(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId != null) {
            Cart cart = cartService.getCartForUser(userId);
            return ResponseEntity.ok(cart);
        }
        return ResponseEntity.ok("No user found");
    }

//    @PostMapping("/add/{productId}")
//    public ResponseEntity<CartItem> addItemToCart(@PathVariable Long productId, @RequestParam int quantity, HttpSession session) {
//        Long userId = (Long) session.getAttribute("userId");
//        System.out.println("User ID from session: " + userId);
//        if (userId != null) {
//            CartItem cartItem = cartService.addItemToCart(userId, productId, quantity);
//            return ResponseEntity.ok(cartItem);
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addItemToCart(@PathVariable Long productId, @RequestParam int quantity, HttpSession session) {
        // Retrieve the userId from the session
        Long userId = (Long) session.getAttribute("userId");
        System.out.println("User ID from session: " + userId);

        // Check if userId is null, meaning the user is not logged in
        if (userId == null) {
            // Return a message indicating that login is required with a 200 OK status
            Map<String, String> response = new HashMap<>();
            response.put("message", "You need to be logged in to add items to the cart.");
            response.put("status", "login_required");  // Optional: Custom status for easier handling on the app side
            return ResponseEntity.ok(response);
        }

        // Proceed to add the item to the cart if the user is logged in
        CartItem cartItem = cartService.addItemToCart(userId, productId, quantity);
        return ResponseEntity.ok(cartItem);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Void> removeItemFromCart(@PathVariable Long cartItemId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        System.out.println("User ID from session: " + userId);
        if (userId != null) {
            cartService.removeItemFromCart(userId, cartItemId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<?> updateCartItemQuantity(
            @PathVariable Long cartItemId,
            @RequestParam int quantity,
            HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        System.out.println("User ID from session: " + userId);

        if (userId != null) {
            boolean success = cartService.updateCartItemQuantity(userId, cartItemId, quantity);
            if (success) {
                // Fetch updated cart for user and return it
                Cart updatedCart = cartService.getCartForUser(userId);
                return ResponseEntity.ok(updatedCart); // Send updated cart back to the front end
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CartItem not found or not in cart");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
