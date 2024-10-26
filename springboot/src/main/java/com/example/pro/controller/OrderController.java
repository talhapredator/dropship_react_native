package com.example.pro.controller;

import com.example.pro.model.Order;
import com.example.pro.model.PaymentMethod;
import com.example.pro.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(HttpSession session, @RequestParam PaymentMethod paymentMethod) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("User not logged in.");
        }

        try {
            Order order = orderService.createOrder(userId, paymentMethod);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            // Return a 400 Bad Request with the error message if the address is missing or other issues occur
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(null); // Unauthorized
        }
        List<Order> orders = orderService.getOrdersForUser(userId);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/update/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(HttpSession session, @PathVariable Long orderId, @RequestParam String status) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(null); // Unauthorized
        }
        Order order = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/pricing-details")
    public ResponseEntity<Map<String, Double>> getPricingDetails(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(null); // Unauthorized
        }

        Map<String, Double> pricingDetails = orderService.getPricingDetails(userId);
        return ResponseEntity.ok(pricingDetails);
    }

}
