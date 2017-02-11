package dbh17.rest.domain;

public class Person {

	private String blockchainAddress;
	private String credential;

	public String getBlockchainAddress() {
		return blockchainAddress;
	}

	public void setBlockchainAddress(String address) {
		this.blockchainAddress = address;
	}

	public String getCredential() {
		return credential;
	}

	public void setCredential(String credential) {
		this.credential = credential;
	}

}