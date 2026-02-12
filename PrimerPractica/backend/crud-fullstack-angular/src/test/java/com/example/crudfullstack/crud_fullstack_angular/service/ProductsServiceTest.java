package com.example.crudfullstack.crud_fullstack_angular.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import com.example.crudfullstack.crud_fullstack_angular.entity.Products;
import com.example.crudfullstack.crud_fullstack_angular.repository.ProductsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class) // Habilita Mockito [cite: 51]
class ProductsServiceTest {

    @Mock 
    ProductsRepository productsRepository;

    @InjectMocks 
    ProductsServiceImpl productsService;

    @Test
    void testFindById_Success() {
        
        Integer id = 1;
        Products mockProduct = new Products(id, "Laptop", Products.categoryType.Electronica, new BigDecimal(1500), 10, true);
        
        when(productsRepository.findById(id)).thenReturn(Optional.of(mockProduct));
        
        Products result = productsService.findById(id);

        assertNotNull(result);
        assertEquals("Laptop", result.getName());
        assertEquals(1500, result.getPrice().intValue());
        
        verify(productsRepository, times(1)).findById(id);
    }

    @Test
    void testSave_Success() {
        Products newProduct = new Products(null, "Mouse", Products.categoryType.Electronica, new BigDecimal(200), 50, true);
        Products savedProduct = new Products(10, "Mouse", Products.categoryType.Electronica, new BigDecimal(200), 50, true);

        // Simulamos que al guardar cualquier producto, el repo devuelve el producto con ID 10
        when(productsRepository.save(any(Products.class))).thenReturn(savedProduct);
        Products result = productsService.save(newProduct);
        assertNotNull(result);
        assertEquals(10, result.getId());
        assertEquals("Mouse", result.getName());
        verify(productsRepository, times(1)).save(newProduct);
    }

    @Test
    void testFindAll_Success() {
        Products p1 = new Products(1, "TV", Products.categoryType.Electronica, BigDecimal.TEN, 5, true);
        Products p2 = new Products(2, "Silla", Products.categoryType.Muebles, BigDecimal.ONE, 10, true);
        
        List<Products> productList = Arrays.asList(p1, p2);
        Page<Products> pageMock = new PageImpl<>(productList);
        
        when(productsRepository.findAll(any(Pageable.class))).thenReturn(pageMock);

        Pageable pageable = PageRequest.of(0, 10);
        Page<Products> result = productsService.findAll(pageable);

        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
        assertEquals("TV", result.getContent().get(0).getName()); 
        
        verify(productsRepository, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void testDeleteById_Success() {
        Integer idToDelete = 5;
        productsService.deleteById(idToDelete);
        verify(productsRepository, times(1)).deleteById(idToDelete);
    }

    @Test
    void testUpdate() {
        //Creamos el producto que queremos actualizar
        Products product = new Products();
        BigDecimal precio = BigDecimal.valueOf(1500.99);
        
        product.setId(1);
        product.setName("Tocador");
        product.setCategory(Products.categoryType.Muebles); 
        product.setPrice(precio);
        product.setStock(1);
        product.setAvailable(true);

        //Le decimos al Mock que cuando le llegue un 'save', devuelva ese mismo producto
        when(productsRepository.save(any(Products.class))).thenReturn(product);

        //Llamamos al método que queremos probar
        Products resultado = productsService.update(product);

        // Aseguramos que el resultado no sea nulo
        assertNotNull(resultado);
        // Aseguramos que el nombre sea el correcto
        assertEquals("Tocador", resultado.getName());
        
        //Verificamos que el servicio LLAMÓ al método save del repositorio 1 vez
        verify(productsRepository, times(1)).save(product);
    }
}