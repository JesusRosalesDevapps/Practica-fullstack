package com.example.crudfullstack.crud_fullstack_angular.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.crudfullstack.crud_fullstack_angular.entity.Customer;
import com.example.crudfullstack.crud_fullstack_angular.repository.CustomerRepository;

@ExtendWith(MockitoExtension.class)
class CustomerServiceImplTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerServiceImpl customerService;

    private Customer customer;

    @BeforeEach
    void setUp() {
        customer = new Customer();
        customer.setId(1);
        customer.setName("Juan Perez");
        customer.setEmail("juan@test.com");
    }

    @Test
    void testSave() {
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);
        Customer saved = customerService.save(customer);
        assertNotNull(saved);
        assertEquals("Juan Perez", saved.getName());
    }

    @Test
    void testFindAll() {
        // CORRECCIÓN: Usamos List, no Page
        when(customerRepository.findAll()).thenReturn(Arrays.asList(customer));

        List<Customer> result = customerService.findAll();
        
        assertNotNull(result);
        assertEquals(1, result.size()); // Verificamos el tamaño de la lista
        verify(customerRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {
        when(customerRepository.findById(1)).thenReturn(Optional.of(customer));
        Customer found = customerService.findById(1);
        assertNotNull(found);
        assertEquals(1, found.getId());
    }

    @Test
    void testDeleteById() {
        doNothing().when(customerRepository).deleteById(1);
        customerService.deleteById(1);
        verify(customerRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdate() {
        //Creamos el producto que queremos actualizar
        Customer customer = new Customer();
        customer.setId(1);
        customer.setName("Pepillo");
        customer.setEmail("Pepillo@hotmail.com");
        customer.setPassword("1234");

        //Le decimos al Mock que cuando le llegue un 'save', devuelva ese mismo producto
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);

        //Llamamos al método que queremos probar
        Customer resultado = customerService.update(customer);

        // Aseguramos que el resultado no sea nulo
        assertNotNull(resultado);
        // Aseguramos que el nombre sea el correcto
        assertEquals("Pepillo", resultado.getName());
        
        //Verificamos que el servicio LLAMÓ al método save del repositorio 1 vez
        verify(customerRepository, times(1)).save(customer);
    }
}
