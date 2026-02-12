package com.example.crudfullstack.crud_fullstack_angular.Exception;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class ResourceNotFoundExceptionTest {

    @Test
    void testResourceNotFoundException() {
        String mensaje = "Cliente no encontrado";
        
        ResourceNotFoundException exception = new ResourceNotFoundException(mensaje);
        
        assertEquals(mensaje, exception.getMessage());
    }
}