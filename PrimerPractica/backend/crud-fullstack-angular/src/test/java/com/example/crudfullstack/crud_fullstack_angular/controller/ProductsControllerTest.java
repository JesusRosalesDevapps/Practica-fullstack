package com.example.crudfullstack.crud_fullstack_angular.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import com.example.crudfullstack.crud_fullstack_angular.entity.Products;
import com.example.crudfullstack.crud_fullstack_angular.repository.ProductsRepository;
import com.example.crudfullstack.crud_fullstack_angular.service.ProductsService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ProductsController.class) 
class ProductsControllerTest {

    @Autowired
    private MockMvc mvc; // Simula las peticiones HTTP (Postman)

    @MockBean
    private ProductsService productsService;

    @MockBean
    private ProductsRepository productsRepository; 

    @Autowired
    private ObjectMapper objectMapper; // convertir objetos a JSON

    @Test
    void testFindById_Ok() throws Exception {
        Integer id = 1;
        Products mockProduct = new Products(id, "Laptop", Products.categoryType.Electronica, new BigDecimal(1500), 10, true);
        
        when(productsService.findById(id)).thenReturn(mockProduct);

        mvc.perform(get("/api/products/{id}", id) // Simulamos GET /api/products/1
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) 
                .andExpect(jsonPath("$.name").value("Laptop"));
    }

    @Test
    void testSaveProduct_Ok() throws Exception {
        Products newProduct = new Products(null, "Mouse", Products.categoryType.Electronica, new BigDecimal(200), 50, true);
        Products savedProduct = new Products(10, "Mouse", Products.categoryType.Electronica, new BigDecimal(200), 50, true);
        
        when(productsService.save(any(Products.class))).thenReturn(savedProduct);

        mvc.perform(post("/api/products") 
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProduct))) 
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10)); 
    }

   @Test
    void testFindAll_Ok() throws Exception {
        Products p1 = new Products(1, "TV", Products.categoryType.Electronica, BigDecimal.TEN, 5, true);
        Page<Products> page = new PageImpl<>(java.util.Arrays.asList(p1));

        when(productsService.findAll(any(Pageable.class))).thenReturn(page);

        mvc.perform(get("/api/products") 
                .param("page", "0") 
                .param("size", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("TV")); 
    }

    @Test
    void testUpdateProduct_Ok() throws Exception {
        Integer id = 1;
        Products updatedProduct = new Products(id, "TV Updated", Products.categoryType.Electronica, BigDecimal.TEN, 5, true);
        
        when(productsService.findById(id)).thenReturn(updatedProduct); 
        when(productsService.update(any(Products.class))).thenReturn(updatedProduct);

        mvc.perform(put("/api/products/{id}", id) 
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedProduct)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("TV Updated"));
    }

    @Test
    void testDeleteProduct_Ok() throws Exception {
        Integer id = 1;
        Products p = new Products(id, "TV", Products.categoryType.Electronica, BigDecimal.TEN, 5, true);
        when(productsService.findById(id)).thenReturn(p); 

        mvc.perform(delete("/api/products/{id}", id))
                .andExpect(status().isOk());
    }

    @Test
    void testActivateProduct() throws Exception{
        //Creamos un producto
        Products product = new Products();
        BigDecimal precio = BigDecimal.valueOf(1500.99);
        product.setId(1);
        product.setName("Tocador");
        product.setCategory(Products.categoryType.Muebles); 
        product.setPrice(precio);
        product.setStock(1);
        product.setAvailable(false);

        //devuelve el producto que creamos
        when(productsService.findById(1)).thenReturn(product);
        //lo guardamos
        when(productsService.update(any(Products.class))).thenReturn(product);

        //prbamos el activate
        mvc.perform(patch("/api/products/1/activate")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.available").value(true));

    }

    @Test
    void testDeactivateProduct() throws Exception{
        //Creamos un producto
        Products product = new Products();
        BigDecimal precio = BigDecimal.valueOf(1500.99);
        product.setId(1);
        product.setName("Tocador");
        product.setCategory(Products.categoryType.Muebles); 
        product.setPrice(precio);
        product.setStock(1);
        product.setAvailable(true);

        //devuelve el producto que creamos
        when(productsService.findById(1)).thenReturn(product);
        //lo guardamos
        when(productsService.update(any(Products.class))).thenReturn(product);

        //prbamos el activate
        mvc.perform(patch("/api/products/1/deactivate")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.available").value(false));

    }
}