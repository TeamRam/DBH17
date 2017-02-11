package dbh17.rest.springboot.rest.endpoint;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import dbh17.rest.domain.Person;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class PersonEndpointTest extends BaseEndpointTest {

	private Person testPerson;

	@Override
	@Before
	public void setup() throws Exception {
		super.setup();
	}

	@Test
	public void getPersonByCredential() throws Exception {
		testPerson = createPerson();
		String address = testPerson.getBlockchainAddress();
		String credential = testPerson.getCredential();

		MvcResult result = mockMvc.perform(get("/v1/person/{credential}", credential)).andExpect(status().isOk())
				.andExpect(content().contentType(JSON_MEDIA_TYPE)).andDo(MockMvcResultHandlers.print())
				.andExpect(jsonPath("$.credential", is(credential)))
				.andExpect(jsonPath("$.blockchainAddress", is(address))).andReturn();

		logger.debug("content=" + result.getResponse().getContentAsString());
	}

	@Test
	public void getPersonByCredentialNotFound() throws Exception {
		MvcResult result = mockMvc.perform(get("/v1/person/{credential}", "none")).andExpect(status().isNotFound())
				.andReturn();

		logger.debug("content=" + result.getResponse().getContentAsString());
	}

	@Test
	public void savePerson() throws Exception {

		Person person = new Person();
		person.setBlockchainAddress("0x9876");
		person.setCredential("fb9876");
		String content = json(person);

		mockMvc.perform(put("/v1/person").accept(JSON_MEDIA_TYPE).content(content).contentType(JSON_MEDIA_TYPE))
				.andDo(MockMvcResultHandlers.print()).andExpect(status().isOk())
				.andExpect(jsonPath("$.credential", is(person.getCredential())))
				.andExpect(jsonPath("$.blockchainAddress", is(person.getBlockchainAddress()))).andReturn();
	}

	private Person createPerson() {
		// this is the initially the only person the service knows, because it
		// is hardcode!
		Person person = new Person();
		person.setBlockchainAddress("0x1234");
		person.setCredential("fb1234");
		return person;
	}

}
