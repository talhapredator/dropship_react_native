package com.example.pro.controller;

import com.example.pro.model.Product;
import com.example.pro.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.pro.repository.ProductRepository;
import java.util.List;
import java.util.NoSuchElementException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/products")
public class AuthControllerProducts {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;


    private static final Logger logger = LoggerFactory.getLogger(AuthControllerProducts.class);

    @GetMapping
    public List<Product> getAllProducts() {
        logger.debug("Fetching all products");
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        logger.debug("Fetching product with id: {}", id);
        try {
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (NoSuchElementException e) {
            logger.error("Product not found with id: {}", id);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts2(@RequestParam("q") String query) {
        List<Product> products = productRepository.fullTextSearch(query);
        return ResponseEntity.ok(products);
    }
    @GetMapping("/Advsearch")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam("q") String query) {
        List<Product> products = productRepository.searchWithRelevance(query);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        logger.debug("Creating product: {}", product);
        try {
            Product createdProduct = productService.createProduct(product);
            return ResponseEntity.ok(createdProduct);
        } catch (Exception e) {
            logger.error("Error creating product: {}", e.getMessage());
            return ResponseEntity.status(500).body(null);  // Return 500 Internal Server Error on failure
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        logger.debug("Updating product with id: {}", id);
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            return ResponseEntity.ok(updatedProduct);
        } catch (NoSuchElementException e) {
            logger.error("Product not found with id: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error updating product: {}", e.getMessage());
            return ResponseEntity.status(500).body(null);  // Return 500 Internal Server Error on failure
        }
    }

    @GetMapping("/category")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam Long category_id) {
        logger.debug("Fetching products for category id: {}", category_id);
        try {
            List<Product> products = productService.getProductsByCategory(category_id);
            return ResponseEntity.ok(products);
        } catch (NoSuchElementException e) {
            logger.error("Category not found with id: {}", category_id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error fetching products by category: {}", e.getMessage());
            return ResponseEntity.status(500).body(null);  // Return 500 Internal Server Error on failure
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        logger.debug("Deleting product with id: {}", id);
        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            logger.error("Product not found with id: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error deleting product: {}", e.getMessage());
            return ResponseEntity.status(500).build();  // Return 500 Internal Server Error on failure
        }
    }
}
