package com.example.crudfullstack.crud_fullstack_angular.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.crudfullstack.crud_fullstack_angular.entity.Products;

public interface ProductsService {

    Products save(Products product);
    Page<Products> findAll(Pageable pageable);    Products findById (Integer id);
    void deleteById (Integer id);
    Products update(Products product);


}
