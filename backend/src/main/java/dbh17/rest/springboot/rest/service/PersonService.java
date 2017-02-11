package dbh17.rest.springboot.rest.service;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;
import org.web3j.crypto.CipherException;

import dbh17.rest.domain.Person;
import dbh17.rest.springboot.rest.service.Web3Jservice.Account;

@Service
public class PersonService {

	private static Map<String, Person> personData = new HashMap<>();
	private Web3Jservice web3Jservice = new Web3Jservice();
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
		try {
			Account account = web3Jservice.createAccount();
			Person p = new Person();
			p.setBlockchainAddress(account.getAddress());
			p.setPassword(account.getPassword());
			p.setCredential(credential);
			personData.put(credential, p);
			return p;
		} catch (InvalidAlgorithmParameterException | NoSuchAlgorithmException | NoSuchProviderException | InterruptedException | ExecutionException
				| CipherException | IOException e) {
			throw new RuntimeException(e);
		}
	}

}
