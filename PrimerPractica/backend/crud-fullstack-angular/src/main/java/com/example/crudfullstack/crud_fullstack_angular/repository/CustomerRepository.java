package com.example.crudfullstack.crud_fullstack_angular.repository;


import com.example.crudfullstack.crud_fullstack_angular.entity.Customer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByNameAndPassword(String name, String password);
}
