package dbh17.rest.springboot.rest.endpoint.error;

import org.junit.Assert;
import org.junit.Test;

public class ErrorTest {

	@Test
	public void testErrorConstructor() throws Exception {
		Error error = new Error("bla", "alb", "this is blabla");
		Assert.assertEquals("bla", error.getField());
		Assert.assertEquals("alb", error.getValue());
		Assert.assertEquals("this is blabla", error.getMessage());
	}

	@Test
	public void testErrorSetters() {
		Error error = new Error("", "", "");
		error.setField("bla");
		error.setValue("alb");
		error.setMessage("this is blabla");
		Assert.assertEquals("bla", error.getField());
		Assert.assertEquals("alb", error.getValue());
		Assert.assertEquals("this is blabla", error.getMessage());
	}
}
