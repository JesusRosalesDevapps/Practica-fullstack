package com.example.crudfullstack.crud_fullstack_angular.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crudfullstack.crud_fullstack_angular.entity.Products;
import com.example.crudfullstack.crud_fullstack_angular.service.ProductsService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins="http://localhost:4200")
public class ProductsController {
    private final ProductsService productsService;

    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    //http://localhost:8080/api/products
    @PostMapping
    public Products save(@RequestBody Products product) {
        return productsService.save(product);
    }

    //http://localhost:8080/api/products
    @GetMapping
    public List<Products> findAll() {
        return productsService.findAll();
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
    @PutMapping
    public Products updateProducts(@RequestBody Products product) {
        Products productDb = productsService.findById(product.getId());
        productDb.setName(product.getName());
        productDb.setCategory(product.getCategory());
        productDb.setPrice(product.getPrice());
        productDb.setStock(product.getStock());
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
