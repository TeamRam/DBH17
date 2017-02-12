package dbh17.rest.springboot.rest.service;

import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import dbh17.rest.domain.Person;

@Service
public class PersonStorage {
	public Map<String, Person> restore() {
		String pathname = "Persons.obj";
		return restore(pathname);
	}

	public Map<String, Person> restore(String pathname) {
		File f = new File(pathname);
		if (!f.exists()) {
			return new HashMap<String, Person>();
		}
		HashMap<String, Person> map = new HashMap<String, Person>();
		ObjectInputStream ois = null;
		try {
			FileInputStream fis = new FileInputStream(pathname);
			ois = new ObjectInputStream(fis);
			while (true) {
				Person person = (Person) ois.readObject();
				map.put(person.getCredential(), person);
			}
		} catch (EOFException eof) {
			// expected
		} catch (IOException | ClassNotFoundException e) {
			throw new RuntimeException(e);
		}
		close(ois);
		return map;
	}

	private void close(ObjectInputStream ois) {
		if (ois != null) {
			try {
				ois.close();
			} catch (IOException e) {
			}
		}
	}

	public void store(Map<String, Person> pmap) throws IOException {
		FileOutputStream fs = new FileOutputStream("Persons.obj");
		ObjectOutputStream os = new ObjectOutputStream(fs);
		Collection<Person> collection = pmap.values();
		for (Person person : collection) {
			os.writeObject(person);
		}
		os.close();
	}
}
