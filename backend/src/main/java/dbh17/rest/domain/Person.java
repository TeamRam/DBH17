package dbh17.rest.domain;

public class Person {

	private String blockchainAddress;
	private String credential;
	private String password; // yes, I know this is not the way to do it, but it is a hackaton.

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}