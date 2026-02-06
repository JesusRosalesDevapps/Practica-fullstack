package com.example.crudfullstack.crud_fullstack_angular.service;


import java.util.List;
import com.example.crudfullstack.crud_fullstack_angular.entity.Products;

public interface ProductsService {

    Products save(Products product);
    List<Products> findAll();
    Products findById (Integer id);
    void deleteById (Integer id);
    Products update(Products product);


}
