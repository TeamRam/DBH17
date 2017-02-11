package dbh17.rest.springboot.rest.service;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.crypto.CipherException;

import dbh17.rest.domain.Person;
import dbh17.rest.springboot.rest.service.Web3Jservice.Account;

@Service
public class PersonService {

	private Map<String, Person> personData = null;

	@Autowired
	private Web3Jservice web3Jservice;
	@Autowired
	private PersonStorage personStorage;

	@PostConstruct
	public void init() {
		personData = personStorage.restore();
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
			personStorage.store(personData);
			return p;
		} catch (InvalidAlgorithmParameterException | NoSuchAlgorithmException | NoSuchProviderException | InterruptedException | ExecutionException
				| CipherException | IOException e) {
			throw new RuntimeException(e);
		}
	}

}
