package com.hv.springboot.fitnesstrackingapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableWebMvc
@SpringBootApplication(scanBasePackages = "com.hv.springboot.fitnesstrackingapp")
@EnableSwagger2
public class FitnessTrackingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitnessTrackingAppApplication.class, args);
	}

}
