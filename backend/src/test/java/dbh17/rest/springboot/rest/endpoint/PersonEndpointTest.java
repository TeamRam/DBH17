package dbh17.rest.springboot.rest.endpoint;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hamcrest.core.IsNull;
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
public class PersonEndpointTest extends AbstractEndpointTest {

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
				.andExpect(jsonPath("$.blockchainAddress", is(address)))
				.andExpect(jsonPath("$.password", is(testPerson.getPassword())))
				.andReturn();

		logger.debug("content=" + result.getResponse().getContentAsString());
	}

	@Test
	public void getPersonByCredentialNotFound() throws Exception {
		MvcResult result = mockMvc.perform(get("/v1/person/{credential}", "none")).andExpect(status().isOk())
				.andExpect(jsonPath("$.credential", is("none")))
				.andExpect(jsonPath("$.blockchainAddress", IsNull.notNullValue()))
				.andExpect(jsonPath("$.password", IsNull.notNullValue()))
				.andReturn();

		logger.debug("content=" + result.getResponse().getContentAsString());
	}

	private Person createPerson() {
		// this is the initially the only person the service knows, because it
		// is hardcode!
		Person person = new Person();
		person.setBlockchainAddress("0x1234");
		person.setCredential("fb1234");
		person.setPassword("somesecret");
		return person;
	}

}
