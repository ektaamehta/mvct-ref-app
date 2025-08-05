package com.mastercard.mcs.virtualcardtokens;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class VirtualCardReferenceApplicationTests {

	@Test
	@DisplayName("Application context should load successfully")
	void contextLoads() {
		assertTrue(true); // Verifies application starts without exceptions
	}

	@Test
	@DisplayName("Main method should run without exceptions")
	void testMainMethod() {
		VirtualCardReferenceApplication.main(new String[] {});
		assertTrue(true, "Main method executed without exceptions");
	}
}
