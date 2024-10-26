package com.example.pro.config;

import com.example.pro.model.Category;
import com.example.pro.model.Product;
import com.example.pro.repository.CategoryRepository;
import com.example.pro.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initializeData(CategoryRepository categoryRepository, ProductRepository productRepository) {
        return args -> {
            // Initialize categories
            if (categoryRepository.count() == 0) {
                categoryRepository.save(new Category("Processors"));
                categoryRepository.save(new Category("CPU Coolers"));
                categoryRepository.save(new Category("Rams"));
                categoryRepository.save(new Category("Storage"));
                categoryRepository.save(new Category("Motherboards"));
            }

            // Initialize products
//            if (productRepository.count() == 0) {
//                Category processors = categoryRepository.findByName("Processors");
//                Category cpuCoolers = categoryRepository.findByName("CPU Coolers");
//                Category rams = categoryRepository.findByName("Rams");
//                Category storage = categoryRepository.findByName("Storage");
//                Category motherboards = categoryRepository.findByName("Motherboards");
//
//                productRepository.save(new Product("AMD Ryzen 5600", "Zen 3 Core, 6 Core 12 threads, Brand New.", 35000, 50, processors, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVx9EUUIT1WuphnkY-hKbKI0BmGHDnRX3kOg&s", 4.5));
//                productRepository.save(new Product("Cooler Master Hyper 212", "High-performance CPU cooler with four heat pipes.", 2000, 100, cpuCoolers, "https://example.com/image.jpg", 4.7));
//                productRepository.save(new Product("Corsair Vengeance 16GB", "DDR4 3200MHz RAM.", 8000, 75, rams, "https://example.com/image.jpg", 4.6));
//                productRepository.save(new Product("Samsung 970 EVO Plus 1TB", "NVMe SSD with high read/write speeds.", 12000, 30, storage, "https://example.com/image.jpg", 4.8));
//                productRepository.save(new Product("Asus ROG Strix B450-F", "ATX Motherboard with enhanced durability.", 15000, 40, motherboards, "https://example.com/image.jpg", 4.5));
//
//                // Additional CPU Coolers
//                productRepository.save(new Product("Noctua NH-D15", "Premium dual tower CPU cooler with two fans.", 8000, 60, cpuCoolers, "https://example.com/image1.jpg", 4.9));
//                productRepository.save(new Product("be quiet! Dark Rock Pro 4", "Silent high-end air cooler.", 7500, 50, cpuCoolers, "https://example.com/image2.jpg", 4.8));
//                productRepository.save(new Product("NZXT Kraken X73", "High-performance 360mm liquid cooler.", 12000, 30, cpuCoolers, "https://example.com/image3.jpg", 4.7));
//                productRepository.save(new Product("ARCTIC Liquid Freezer II 280", "Multi-compatible all-in-one CPU water cooler.", 10000, 40, cpuCoolers, "https://example.com/image4.jpg", 4.7));
//            }
        };
    }
}
