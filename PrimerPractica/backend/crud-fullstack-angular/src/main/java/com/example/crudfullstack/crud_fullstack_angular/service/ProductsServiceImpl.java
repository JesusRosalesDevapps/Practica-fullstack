package com.example.crudfullstack.crud_fullstack_angular.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.crudfullstack.crud_fullstack_angular.Exception.ResourceNotFoundException;
import com.example.crudfullstack.crud_fullstack_angular.entity.Products;
import com.example.crudfullstack.crud_fullstack_angular.repository.ProductsRepository;

@Service
public class ProductsServiceImpl implements ProductsService {

    private final ProductsRepository productsRepository;

    public ProductsServiceImpl(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @Override
    public Products save(Products product) {
        return productsRepository.save(product);
    }

    @Override
    public Page<Products> findAll(Pageable pageable) {
        return productsRepository.findAll(pageable);
    }

    @Override
    public Products findById(Integer id) {
         Products product = productsRepository.findById(id).orElseThrow(
            () -> {
                throw new ResourceNotFoundException("Product not found with id: " + id ); 
            }
        );
        return product;
    }

    @Override
    public void deleteById(Integer id) {
        productsRepository.deleteById(id);
    }

    @Override
    public Products update(Products product) {
        return productsRepository.save(product);
    }

}
