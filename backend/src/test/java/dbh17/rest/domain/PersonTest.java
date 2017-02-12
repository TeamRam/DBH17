package dbh17.rest.domain;

import org.junit.Assert;
import org.junit.Test;

public class PersonTest {

	@Test
	public void testEquals() {
		Person p1 = new Person();
		p1.setCredential("ab");
		Person p2 = new Person();
		p2.setCredential("ab");

		Assert.assertTrue(p1.equals(p2));
	}

	@Test
	public void testEqualsSameObject() {
		Person p1 = new Person();
		p1.setCredential("ab");

		Assert.assertTrue(p1.equals(p1));
	}

	@Test
	public void testNotEqual() {
		Person p1 = new Person();
		p1.setCredential("ab");

		Person p2 = new Person();
		p2.setCredential("abce");
		Assert.assertFalse(p1.equals(p2));
	}

	@Test
	public void testNotEqualNull() {
		Person p1 = new Person();
		p1.setCredential("ab");

		Assert.assertFalse(p1.equals(null));
	}
}
