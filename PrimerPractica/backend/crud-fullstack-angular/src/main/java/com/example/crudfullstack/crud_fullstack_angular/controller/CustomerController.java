package com.example.crudfullstack.crud_fullstack_angular.controller;

import com.example.crudfullstack.crud_fullstack_angular.entity.Customer;
import com.example.crudfullstack.crud_fullstack_angular.repository.CustomerRepository;
import com.example.crudfullstack.crud_fullstack_angular.service.CustomerService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
//http://localhost:8080/api/customers
@RequestMapping("/api/customers")
@CrossOrigin(origins="http://localhost:4200")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Customer customer) {
        Optional<Customer> foundCustomer = customerRepository.findByNameAndPassword(customer.getName(), customer.getPassword());
        
        if (foundCustomer.isPresent()) {
            return ResponseEntity.ok(foundCustomer.get()); // Retorna el usuario si existe
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
}
