package com.example.crudfullstack.crud_fullstack_angular.Exception;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;

class GlobalExceptionHandlerTest {

    @Test
    void testHandleResourceNotFoundException() {
        GlobalExceptionHandler handler = new GlobalExceptionHandler();
        ResourceNotFoundException ex = new ResourceNotFoundException("No encontrado");
        WebRequest request = mock(WebRequest.class);
        
        when(request.getDescription(false)).thenReturn("uri=/api/test");

        ResponseEntity<?> response = handler.handleResourceNotFoundException(ex, request);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testHandleGlobalException() {
        GlobalExceptionHandler handler = new GlobalExceptionHandler();
        Exception ex = new Exception("Error interno inesperado");
        WebRequest request = mock(WebRequest.class);

        when(request.getDescription(false)).thenReturn("uri=/api/error");

        ResponseEntity<?> response = handler.handleGlobalException(ex, request);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        
        assertNotNull(response.getBody());
    }
}