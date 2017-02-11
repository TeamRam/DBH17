package dbh17.rest.springboot.rest.service;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;
import org.web3j.crypto.CipherException;

import dbh17.rest.domain.Person;
import dbh17.rest.springboot.rest.service.Web3Jservice.Account;

public class PersonServiceTest {

	private PersonService personService;

	@Test
	public void testGevonden() throws InvalidAlgorithmParameterException, NoSuchAlgorithmException, NoSuchProviderException, InterruptedException,
			ExecutionException, CipherException, IOException {
		personService = new PersonService();

		Web3Jservice web3jservice = mock(Web3Jservice.class);
		ReflectionTestUtils.setField(personService, "web3Jservice", web3jservice);

		PersonStorage personStorage = mock(PersonStorage.class);
		ReflectionTestUtils.setField(personService, "personStorage", personStorage);

		HashMap<String, Person> map = new HashMap<String, Person>();
		ReflectionTestUtils.setField(personService, "personData", map);

		when(web3jservice.createAccount()).thenReturn(new Account("address", "pw"));

		personService.findOne("fb1234");
		verify(web3jservice);
	}
}
