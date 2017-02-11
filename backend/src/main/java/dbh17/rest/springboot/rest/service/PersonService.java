package dbh17.rest.springboot.rest.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import dbh17.rest.domain.Person;

@Service
public class PersonService {

	private static Map<String, Person> personData = new HashMap<>();
	static {
		Person a = new Person();
		a.setCredential("fb1234");
		a.setBlockchainAddress("0x1234");
		a.setPassword("somesecret");
		personData.put("fb1234", a);
	}

	public Person findOne(String credential) {
		if (personData.containsKey(credential)) {
			return personData.get(credential);
		}
		return null;
	}

	public Person save(Person person) {
		personData.put(person.getCredential(), person);
		return person;
	}
}
