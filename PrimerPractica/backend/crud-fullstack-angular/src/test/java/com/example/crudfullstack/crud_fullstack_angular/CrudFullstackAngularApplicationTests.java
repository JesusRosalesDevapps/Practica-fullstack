package com.example.crudfullstack.crud_fullstack_angular;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CrudFullstackAngularApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
    void testMain() {
        try {
             CrudFullstackAngularApplication.main(new String[] {});
        } catch (Exception e) {
        }
    }
}
