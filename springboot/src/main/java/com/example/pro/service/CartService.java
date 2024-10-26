package com.example.pro.service;

import com.example.pro.model.Cart;
import com.example.pro.model.CartItem;
import com.example.pro.model.Product;
import com.example.pro.model.User;
import com.example.pro.repository.CartItemRepository;
import com.example.pro.repository.CartRepository;
import com.example.pro.repository.ProductRepository;
import com.example.pro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Cart getCartForUser(Long userId) {
        Optional<Cart> cartOpt = cartRepository.findByUserId(userId);
        Cart cart;
        if (cartOpt.isPresent()) {
            cart = cartOpt.get();
        } else {
            cart = new Cart();
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }

        // Calculate total amount
        updateTotalAmount(cart);

        return cart;
    }

    private void updateTotalAmount(Cart cart) {
        double totalAmount = cart.getItems().stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
        cart.setTotalAmount(totalAmount);
        cartRepository.save(cart);
    }

    public CartItem addItemToCart(Long userId, Long productId, int quantity) {
        System.out.println("Adding item to cart. User ID: " + userId + ", Product ID: " + productId + ", Quantity: " + quantity);

        Cart cart = getCartForUser(userId);

        Optional<CartItem> existingCartItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        CartItem cartItem;
        if (existingCartItem.isPresent()) {
            cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            System.out.println("Updating existing cart item. CartItem ID: " + cartItem.getId() + ", New Quantity: " + cartItem.getQuantity());
            cartItem = cartItemRepository.save(cartItem);
        } else {
            Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cart.getItems().add(cartItem);
            System.out.println("Adding new cart item. Product ID: " + productId + ", Quantity: " + quantity);
            cartItem = cartItemRepository.save(cartItem);
        }

        // Recalculate total amount after adding item
        updateTotalAmount(cart);

        return cartItem;
    }

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public boolean removeItemFromCart(Long userId, Long cartItemId) {
        Cart cart = getCartForUser(userId);
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("CartItem not found"));
        if (cart.getItems().remove(cartItem)) {
            cartItemRepository.delete(cartItem);
            // Recalculate total amount after removing item
            updateTotalAmount(cart);
            return true;
        }
        return false;
    }

    public boolean updateCartItemQuantity(Long userId, Long cartItemId, int quantity) {
        Cart cart = getCartForUser(userId);
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("CartItem not found"));
        if (cart.getItems().contains(cartItem)) {
            if (quantity == 0) {
                // Remove the cart item if quantity is set to 0
                cartItemRepository.delete(cartItem);
                cart.getItems().remove(cartItem);
            } else {
                // Update the quantity if it's greater than 0
                cartItem.setQuantity(quantity);
                cartItemRepository.save(cartItem);
            }
            // Recalculate total amount after updating quantity
            updateTotalAmount(cart);

            return true;
        }
        return false;
    }
}
