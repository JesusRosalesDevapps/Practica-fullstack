package com.example.crudfullstack.crud_fullstack_angular.entity;

import java.math.BigDecimal;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false)
    private String name;

    public enum categoryType{
        Ropa,
        Electronica,
        Muebles,
        Alimentos
    }
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private categoryType category;

    @Column(nullable = false, precision = 10, scale = 2)
    @Positive 
    private BigDecimal price;

    @Column(nullable = false)
    @PositiveOrZero
    private Integer stock;

    @Column(nullable = false)
    private boolean available;

    public Products() {
    }

    public Products(Integer id, String name, categoryType category, BigDecimal price, Integer stock,
            boolean available) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.available = available;
    }

    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public categoryType getCategory() {return category;}
    public void setCategory(categoryType category) {this.category = category;}

    public BigDecimal getPrice() {return price;}
    public void setPrice(BigDecimal price) {this.price = price;}

    public Integer getStock() {return stock;}
    public void setStock(Integer stock) {this.stock = stock;}

    public boolean isAvailable() {return available;}
    public void setAvailable(boolean available) {this.available = available;}

}
