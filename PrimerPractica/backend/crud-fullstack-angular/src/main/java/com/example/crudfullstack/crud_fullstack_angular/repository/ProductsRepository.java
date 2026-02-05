package com.example.crudfullstack.crud_fullstack_angular.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.crudfullstack.crud_fullstack_angular.entity.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {

}
