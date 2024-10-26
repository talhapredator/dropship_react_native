package com.example.pro.service;

import com.example.pro.model.*;
import com.example.pro.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {
    private static final double DELIVERY_FEE = 200.0; // Fixed delivery fee

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private NotificationService notificationService;

    public Order createOrder(Long userId, PaymentMethod paymentMethod) {
        Cart cart = cartService.getCartForUser(userId);
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        UserProfile userProfile = userProfileRepository.findByUserId(userId);

        if (userProfile == null || userProfile.getAddress() == null || userProfile.getAddress().trim().isEmpty()) {
            throw new RuntimeException("Address not found. Please add an address before placing the order.");
        }

        Order order = new Order();
//        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
//        UserProfile userProfile = userProfileRepository.findByUserId(userId);

        order.setUser(user);
        order.setOrderDate(new Date());
        order.setStatus(OrderStatus.CREATED);
        order.setPaymentMethod(paymentMethod);
        order.setShippingAddress(userProfile.getAddress()); // Use address from UserProfile
        order.setBillingAddress(userProfile.getAddress()); // Assuming billing and shipping address are the same

        // Calculate estimated delivery date (7 days after order date)
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(order.getOrderDate());
        calendar.add(Calendar.DAY_OF_MONTH, 7); // Add 7 days
        order.setEstimatedDeliveryDate(calendar.getTime());

        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            return orderItem;
        }).toList();

        order.setItems(orderItems);

        // Calculate the order total (cart total + delivery fee)
        double orderTotal = cart.getTotalAmount() + DELIVERY_FEE;
        order.setOrderTotal(orderTotal);
        order.setDeliveryFee(DELIVERY_FEE);

        // Clear the cart after order creation
        cart.getItems().clear();
        cartService.saveCart(cart); // Save the cart after clearing it

        // Save the order and create a notification
        Order savedOrder = orderRepository.save(order);
        notificationService.createNotification(userId, "Your order has been created successfully.");

        return savedOrder;
    }

    public List<Order> getOrdersForUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(OrderStatus.valueOf(status.toUpperCase())); // Update the status using the enum

        // Save the updated order and create a notification
        Order updatedOrder = orderRepository.save(order);
        notificationService.createNotification(order.getUser().getId(), "Your order status has been updated to: " + status);

        return updatedOrder;
    }

    public Map<String, Double> getPricingDetails(Long userId) {
        Cart cart = cartService.getCartForUser(userId);
        double cartTotal = cart.getTotalAmount();
        double deliveryFee = 200.0; // Fixed delivery fee
        double totalAmount = cartTotal + deliveryFee;

        // Prepare the response map
        Map<String, Double> pricingDetails = new HashMap<>();
        pricingDetails.put("cartTotal", cartTotal);
        pricingDetails.put("deliveryFee", deliveryFee);
        pricingDetails.put("totalAmount", totalAmount);

        return pricingDetails;
    }
}
