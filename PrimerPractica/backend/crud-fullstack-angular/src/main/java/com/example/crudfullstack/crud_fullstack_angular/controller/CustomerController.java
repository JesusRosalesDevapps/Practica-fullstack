package com.example.crudfullstack.crud_fullstack_angular.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.crudfullstack.crud_fullstack_angular.entity.Customer;
import com.example.crudfullstack.crud_fullstack_angular.service.CustomerService;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
//http://localhost:8080/api/customers
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    //http://localhost:8080/api/customers
    @PostMapping
    public Customer save(@RequestBody Customer customer) {
        return customerService.save(customer);
    }
    
    //http://localhost:8080/api/customers
    @GetMapping
    public List<Customer> findAll() {
        return customerService.findAll();
    }

    //http://localhost:8080/api/customers/1
    @GetMapping ("/{id}")
    public Customer findById(@PathVariable Integer id) {
        return customerService.findById(id);
    }
    
    //http://localhost:8080/api/2
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        customerService.deleteById(id);
    }

    //http://localhost:8080/api/customers
    @PutMapping
    public Customer updateCustomer(@RequestBody Customer customer) {
        Customer customerDb = customerService.findById(customer.getId());
        customerDb.setName(customer.getName());
        customerDb.setEmail(customer.getEmail());
        return customerService.update(customerDb);
    }
}
