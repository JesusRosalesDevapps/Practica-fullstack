package com.example.crudfullstack.crud_fullstack_angular.service;


import java.util.List;
import com.example.crudfullstack.crud_fullstack_angular.entity.Customer;


public interface CustomerService {

    Customer save(Customer customer);
    List<Customer> findAll();
    Customer findById (Integer id);
    void deleteById (Integer id);
    Customer update(Customer customer);

}
