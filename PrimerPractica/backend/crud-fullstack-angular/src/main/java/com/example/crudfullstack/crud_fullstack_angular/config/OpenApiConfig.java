package com.example.crudfullstack.crud_fullstack_angular.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Fullstack Angular/Spring")
                        .version("1.0")
                        .description("Documentación de los endpoints para gestionar Clientes y Productos."));
    }
}