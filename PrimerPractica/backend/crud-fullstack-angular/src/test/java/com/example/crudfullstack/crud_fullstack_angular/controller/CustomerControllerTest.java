package com.example.crudfullstack.crud_fullstack_angular.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.example.crudfullstack.crud_fullstack_angular.entity.Customer;
import com.example.crudfullstack.crud_fullstack_angular.service.CustomerService;
import com.example.crudfullstack.crud_fullstack_angular.repository.CustomerRepository; 
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@WebMvcTest(CustomerController.class)
class CustomerControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CustomerService customerService;

    @MockBean
    private CustomerRepository customerRepository; 

    private Customer customer;

    @BeforeEach
    void setUp() {
        customer = new Customer();
        customer.setId(1);
        customer.setName("Juan Perez");
        customer.setEmail("juan@test.com");
        customer.setPassword("password123");
    }

    @Test
    void testFindAll() throws Exception {
        Page<Customer> page = new PageImpl<>(Arrays.asList(customer));
        when(customerRepository.findAll(any(Pageable.class))).thenReturn(page);

        mvc.perform(get("/api/customers")
                .param("page", "0") 
                .param("size", "5")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Juan Perez"));
    }
    @Test
    void testSave() throws Exception {
        when(customerRepository.existsByEmail(any(String.class))).thenReturn(false);
        when(customerService.save(any(Customer.class))).thenReturn(customer);

        mvc.perform(post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"Juan Perez\", \"email\": \"juan@test.com\", \"password\": \"password123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Juan Perez"));
    }

    @Test
    void testSaveInvalidName() throws Exception {
        mvc.perform(post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"Lu\", \"email\": \"juan@test.com\", \"password\": \"123\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Datos inválidos")));
    }

    @Test
    void testSaveInvalidData() throws Exception {
        // Nombre corto ("Lu") y email sin arroba
        mvc.perform(post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"Lu\", \"email\": \"bademail\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testSaveInvalidEmail() throws Exception {
        mvc.perform(post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"Juan Perez\", \"email\": \"correo_sin_arroba\", \"password\": \"123\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Datos inválidos")));
    }

    @Test
    void testSaveDuplicateEmail() throws Exception {
        when(customerRepository.existsByEmail("juan@test.com")).thenReturn(true);

        mvc.perform(post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"Juan Perez\", \"email\": \"juan@test.com\"}"))
                .andExpect(status().isConflict());
    }

    @Test
    void testFindById() throws Exception {
        when(customerService.findById(1)).thenReturn(customer);

        mvc.perform(get("/api/customers/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }
    @Test
    void testDeleteById () throws Exception {

        doNothing().when(customerService).deleteById(any(Integer.class));

        mvc.perform(delete("/api/customers/1")
        .contentType(MediaType.APPLICATION_JSON)) 
        .andDo(print())
        .andExpect(status().isOk());
    }
    
    @Test
    void testLoginSuccess() throws Exception {
        when(customerRepository.findByNameAndPassword("Juan Perez", "secret123"))
            .thenReturn(Optional.of(customer));

        mvc.perform(post("/api/customers/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"Juan Perez\", \"password\": \"secret123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Juan Perez"));
    }
    @Test
    void testLoginFailure() throws Exception {
        when(customerRepository.findByNameAndPassword(any(), any()))
            .thenReturn(Optional.empty());

        mvc.perform(post("/api/customers/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"Wrong\", \"password\": \"Wrong\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testUpdateCustomer() throws Exception {
        Customer oldCustomer = new Customer();
        oldCustomer.setId(1);
        oldCustomer.setName("Pepillo");
        oldCustomer.setEmail("Pepillo@email.com");
        oldCustomer.setPassword("1234");

        Customer inputCustomer = new Customer();
        inputCustomer.setId(1);
        inputCustomer.setName("Damian");
        inputCustomer.setEmail("Damian@hotmail.com");
        inputCustomer.setPassword("123");

        when(customerService.findById(1)).thenReturn(oldCustomer);
        
        when(customerService.update(any(Customer.class))).thenAnswer(invocation -> invocation.getArgument(0));

        mvc.perform(put("/api/customers") 
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\": 1, \"name\": \"Damian\", \"email\": \"Damian@hotmail.com\", \"password\": \"123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Damian")) 
                .andExpect(jsonPath("$.email").value("Damian@hotmail.com"));
    }
}