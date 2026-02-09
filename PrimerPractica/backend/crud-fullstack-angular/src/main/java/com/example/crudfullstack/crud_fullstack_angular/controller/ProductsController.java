package com.example.crudfullstack.crud_fullstack_angular.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.crudfullstack.crud_fullstack_angular.entity.Products;
import com.example.crudfullstack.crud_fullstack_angular.repository.ProductsRepository;
import com.example.crudfullstack.crud_fullstack_angular.service.ProductsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins="http://localhost:4200")
public class ProductsController {

    private final ProductsRepository productsRepository;
    private final ProductsService productsService;

    public ProductsController(ProductsService productsService, ProductsRepository productsRepository) {
        this.productsService = productsService;
        this.productsRepository = productsRepository;
    }

    //http://localhost:8080/api/products
    @PostMapping
    public Products save(@RequestBody Products product) {
        return productsService.save(product);
    }

    //http://localhost:8080/api/products
    @GetMapping
    public Page<Products> findAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size) 
        {
        Pageable pageable = PageRequest.of(page, size);
        return productsRepository.findAll(pageable);
    }

    //http://localhost:8080/api/products/1
    @GetMapping ("/{id}")
    public Products findById(@PathVariable Integer id) {
        return productsService.findById(id);
    }

    //http://localhost:8080/api/products/2
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        productsService.deleteById(id);
    }

    //http://localhost:8080/api/products
    @PutMapping("/{id}")
    public Products updateProducts(@RequestBody Products product) {
        Products productDb = productsService.findById(product.getId());
        productDb.setName(product.getName());
        productDb.setCategory(product.getCategory());
        productDb.setPrice(product.getPrice());
        productDb.setStock(product.getStock());
        productDb.setAvailable(product.isAvailable());
        return productsService.update(productDb);
    }
    
    @PatchMapping("/{id}/activate")
    public Products activateProduct (@PathVariable Integer id) {
        Products productDb = productsService.findById(id);
        productDb.setAvailable(true);
        return productsService.update(productDb);
    }

    @PatchMapping("/{id}/false")
    public Products deactivateProduct (@PathVariable Integer id) {
        Products productDb = productsService.findById(id);
        productDb.setAvailable(false);
        return productsService.update(productDb);
    }
}
