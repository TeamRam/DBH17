package dbh17.rest.app;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import dbh17.rest.domain.Person;
import dbh17.rest.springboot.rest.service.PersonStorage;

public class PersonStorageApp {

	public static void main(String[] args) {
		if (args.length == 0) {
			System.out.println("use java dbh17.rest.app.PersonStorageApp <filepath>");
			System.exit(1);
		}
		PersonStorage personStorage = new PersonStorage();
		Map<String, Person> persons = personStorage.restore(args[0]);
		Set<Entry<String, Person>> entrySet = persons.entrySet();
		for (Entry<String, Person> entry : entrySet) {
			System.out.println(entry.getKey());
			Person person = entry.getValue();
			System.out.println("   " + person.getCredential());
			System.out.println("   " + person.getBlockchainAddress());
		}
	}

}
