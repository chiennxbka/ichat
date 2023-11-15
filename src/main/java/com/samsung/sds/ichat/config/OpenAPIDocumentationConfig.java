package com.samsung.sds.ichat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableOpenApi
public class OpenAPIDocumentationConfig {
	ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Emarket - Marketing HTTP API").description("The Marketing Service HTTP API")
				.license("Apache License").licenseUrl("http://unlicense.org").termsOfServiceUrl("https://smartdigital.asia").version("v1")
				.contact(new Contact("Support Smart Digital", "https://smartdigital.asia/contact", "smart.digital@gmail.com")).build();
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.OAS_30).useDefaultResponseMessages(false)
				.securityContexts(Collections.singletonList(securityContext())).securitySchemes(List.of(apiKey()))
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.samsung.sds.ichat.rest"))
				.paths(PathSelectors.ant("/api/v1/**")).build().apiInfo(apiInfo());
	}

	private ApiKey apiKey() {
		return new ApiKey("JWT", "Authorization", "header");
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder().securityReferences(defaultAuth()).build();
	}

	private List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
		authorizationScopes[0] = authorizationScope;
		return List.of(new SecurityReference("JWT", authorizationScopes));
	}
}
