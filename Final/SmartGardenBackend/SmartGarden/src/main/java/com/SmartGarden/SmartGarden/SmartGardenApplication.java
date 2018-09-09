package com.SmartGarden.SmartGarden;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class SmartGardenApplication {
	protected static final Logger logger = LoggerFactory.getLogger(SmartGardenApplication.class);
	public static void main(String[] args) {
		logger.info("SpringBoot开始加载");
		SpringApplication.run(SmartGardenApplication.class, args);
		logger.info("SpringBoot加载完毕");
	}
}
