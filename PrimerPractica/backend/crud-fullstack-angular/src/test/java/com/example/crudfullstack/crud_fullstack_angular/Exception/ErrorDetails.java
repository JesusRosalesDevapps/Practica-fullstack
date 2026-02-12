package com.example.crudfullstack.crud_fullstack_angular.Exception;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

class ErrorDetailsTest {

    @Test
    void testAllArgsConstructorAndGetters() {
        LocalDateTime fecha = LocalDateTime.now();
        String mensaje = "Error crítico";
        String path = "/api/usuarios";
        String codigo = "ERR-001";

        ErrorDetails error = new ErrorDetails(fecha, mensaje, path, codigo);

        assertEquals(fecha, error.getTimestamp());
        assertEquals(mensaje, error.getMessage());
        assertEquals(path, error.getPath());
        assertEquals(codigo, error.getErrorCode());
    }

    @Test
    void testNoArgsConstructorAndSetters() {
        ErrorDetails error = new ErrorDetails();
        
        assertNotNull(error.getTimestamp());

        LocalDateTime nuevaFecha = LocalDateTime.now().plusDays(1);
        String nuevoMensaje = "Nuevo error";
        String nuevoPath = "/api/ventas";
        String nuevoCodigo = "ERR-404";

        error.setTimestamp(nuevaFecha);
        error.setMessage(nuevoMensaje);
        error.setPath(nuevoPath);
        error.setErrorCode(nuevoCodigo);

        assertEquals(nuevaFecha, error.getTimestamp());
        assertEquals(nuevoMensaje, error.getMessage());
        assertEquals(nuevoPath, error.getPath());
        assertEquals(nuevoCodigo, error.getErrorCode());
    }
}