package com.example.crudfullstack.crud_fullstack_angular.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.example.crudfullstack.crud_fullstack_angular.Exception.ResourceNotFoundException;
import com.example.crudfullstack.crud_fullstack_angular.entity.Customer;
import com.example.crudfullstack.crud_fullstack_angular.repository.CustomerRepository;


@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer findById(Integer id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
    }

    @Override
    public void deleteById(Integer id) {
        customerRepository.deleteById(id);
    }

    @Override
    public Customer update(Customer customer) {
        return customerRepository.save(customer);
    }
    
}
