package dbh17.rest.springboot.rest.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import dbh17.rest.domain.Person;

@Service
public class PersonService {

	private static Map<String, String> personData = new HashMap<>();
	static {
		personData.put("fb1234", "0x1234");
	}

	public Person findOne(String credential) {
		if (personData.containsKey(credential)) {
			String address = personData.get(credential);
			Person p = new Person();
			p.setBlockchainAddress(address);
			p.setCredential(credential);
			return p;
		}
		return null;
	}

	public Person save(Person person) {
		personData.put(person.getCredential(), person.getBlockchainAddress());
		return person;
	}
}
