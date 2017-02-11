package dbh17.rest.springboot.rest;

import org.junit.Test;

public class ApplicationTest {

	@Test
	public void testApplication() {
		System.getProperties().put("server.port", 4480);
		Application.main(null);
	}
}
