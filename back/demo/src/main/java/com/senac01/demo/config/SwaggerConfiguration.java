package com.senac01.demo.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration

public class SwaggerConfiguration {


    public OpenAPI constomOpenApi(){
        return new OpenAPI().info(new Info()
                .title("AULA API")
                .version("1.0")
                .description("API por controle de academia")
                .termsOfService("Linkedin"));
    }
}
