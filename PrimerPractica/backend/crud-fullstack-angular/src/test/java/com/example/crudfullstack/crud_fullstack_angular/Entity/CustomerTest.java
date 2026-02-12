package com.example.crudfullstack.crud_fullstack_angular.Entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;

import com.example.crudfullstack.crud_fullstack_angular.entity.Customer;

class CustomerTest {

    @Test
    void testAllArgsConstructor() {
        Customer customer = new Customer(1, "Jesus", "jesus@test.com", "secret123");
        assertEquals(1, customer.getId());
        assertEquals("Jesus", customer.getName());
        assertEquals("jesus@test.com", customer.getEmail());
        assertEquals("secret123", customer.getPassword());
    }

    @Test
    void testNoArgsConstructorAndSetters() {
        // Probamos también el constructor vacío y setters/getters
        Customer customer = new Customer();
        
        // Al principio debe estar vacío
        assertNull(customer.getId());

        // Usamos los setters
        customer.setId(2);
        customer.setName("Chiki");
        customer.setEmail("chiki@test.com");
        customer.setPassword("pass");

        // Verificamos con los getters
        assertEquals(2, customer.getId());
        assertEquals("Chiki", customer.getName());
        assertEquals("chiki@test.com", customer.getEmail());
        assertEquals("pass", customer.getPassword());
    }
}