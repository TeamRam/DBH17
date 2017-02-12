package dbh17.rest.springboot.rest.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dbh17.rest.domain.Person;
import dbh17.rest.springboot.rest.service.PersonService;

@RestController
@RequestMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
@Validated
public class PersonEndpoint extends BaseEndpoint {

	static final int DEFAULT_PAGE_SIZE = 10;
	static final String HEADER_TOKEN = "token";
	static final String HEADER_USER_ID = "userId";

	@Autowired
	PersonService personService;

	@RequestMapping(path = "/v1/person/{credential}", method = RequestMethod.GET)
	public ResponseEntity<Person> get(@PathVariable("credential") String credential) {

		Person person = personService.findOne(credential);
		return ResponseEntity.ok().body(person);
	}

	@RequestMapping(path = "/v1/person", method = RequestMethod.GET)
	public ResponseEntity<List<Person>> getAll() {

		List<Person> persons = personService.findAll();
		return ResponseEntity.ok().body(persons);
	}

}