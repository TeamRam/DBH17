package dbh17.rest.springboot.rest.endpoint;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import dbh17.rest.domain.Person;

public class PersonValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return Person.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "credential", "validation.message.field.required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "blockchainAddress", "validation.message.field.required");
	}

}