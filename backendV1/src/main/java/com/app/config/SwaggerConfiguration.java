package com.app.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfiguration {

	public static final String AUTHORIZATION_HEADER = "Authorization";

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.info(new Info().title("My REST API").description("Some custom description of API.").version("1.0")
						.contact(new Contact().name("Sallo Szrajbman").url("www.baeldung.com")
								.email("salloszraj@gmail.com"))
						.license(new License().name("License of API").url("API license URL")))
				.addSecurityItem(new SecurityRequirement().addList("bearer-key"))
				.components(new io.swagger.v3.oas.models.Components().addSecuritySchemes("bearer-key",
						new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
	}

	@Bean
	public GroupedOpenApi api() {
		return GroupedOpenApi.builder().group("spring-public").pathsToMatch("/**").build();
	}
}
