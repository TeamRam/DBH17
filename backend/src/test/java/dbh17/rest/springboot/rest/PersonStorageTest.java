package dbh17.rest.springboot.rest;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import dbh17.rest.domain.Person;
import dbh17.rest.springboot.rest.service.PersonStorage;

public class PersonStorageTest {

	private PersonStorage personStorage;

	@Before
	public void setup() {
		personStorage = new PersonStorage();
	}

	@Test
	public void testStoreAndRetrieve() throws IOException, ClassNotFoundException {
		Map<String, Person> pmap = new HashMap<String, Person>();
		Person p = new Person();
		p.setBlockchainAddress("a1");
		p.setCredential("c1");
		p.setPassword("p1");
		pmap.put(p.getCredential(), p);
		p = new Person();
		p.setBlockchainAddress("a2");
		p.setCredential("c2");
		p.setPassword("p2");
		pmap.put(p.getCredential(), p);
		p = new Person();
		p.setBlockchainAddress("a3");
		p.setCredential("c3");
		p.setPassword("p3");
		pmap.put(p.getCredential(), p);
		personStorage.store(pmap);

		Map<String, Person> pmap2 = personStorage.restore();

		Assert.assertTrue(pmap.equals(pmap2));
	}

	@Test
	public void testNoFile() {
		File f = new File("Persons.obj");
		if (f.exists()) {
			f.delete();
		}
		Map<String, Person> pmap2 = personStorage.restore();
		Assert.assertEquals(0, pmap2.size());
	}

}
