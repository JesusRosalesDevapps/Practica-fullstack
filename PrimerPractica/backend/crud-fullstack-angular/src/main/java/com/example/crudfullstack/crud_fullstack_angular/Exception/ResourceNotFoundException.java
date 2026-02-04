package com.example.crudfullstack.crud_fullstack_angular.Exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;


public class ResourceNotFoundException extends RuntimeException {
     
    private String message;
    
    public ResourceNotFoundException(String message) {
        super(message);
        this.message = message;
    }

}
