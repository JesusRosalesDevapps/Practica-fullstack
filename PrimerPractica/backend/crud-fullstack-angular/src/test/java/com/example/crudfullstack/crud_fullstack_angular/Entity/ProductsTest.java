package com.example.crudfullstack.crud_fullstack_angular.Entity;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;

import com.example.crudfullstack.crud_fullstack_angular.entity.Products;

class ProductsTest {

    @Test
    void testProductsGettersAndSetters() {
        Products product = new Products();
        // Probamos Setters
        product.setId(1);
        product.setName("Laptop");
        product.setCategory(Products.categoryType.Electronica);        
        BigDecimal precio = BigDecimal.valueOf(1500.99);
        product.setPrice(precio);
        product.setStock(10);
        product.setAvailable(true);

        // Probamos Getters
        assertEquals(1, product.getId());
        assertEquals("Laptop", product.getName());
        assertEquals(Products.categoryType.Electronica, product.getCategory());
        assertEquals(precio, product.getPrice());
        assertEquals(10, product.getStock());
        assertTrue(product.isAvailable());

    }
    @Test
    void testProductsConstructor() {
        BigDecimal precio = BigDecimal.valueOf(25.50);
        
        Products product = new Products(
            2, 
            "Mouse", 
            Products.categoryType.Electronica, 
            precio, 
            50, 
            true
        );

        assertNotNull(product);
        assertEquals(2, product.getId());
        assertEquals("Mouse", product.getName());
        assertEquals(Products.categoryType.Electronica, product.getCategory());
    }
    
}
