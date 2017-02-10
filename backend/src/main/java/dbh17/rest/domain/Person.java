package dbh17.rest.domain;

import java.time.LocalDate;

public class Person {

	private String blockchainAddress;
	private String name;
	private LocalDate dateOfBirth;

	public String getBlockchainAddress() {
		return blockchainAddress;
	}

	public void setBlockchainAddress(String address) {
		this.blockchainAddress = address;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

}