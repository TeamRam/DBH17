package dbh17.rest.domain;

import java.io.Serializable;

public class Person implements Serializable {

	private static final long serialVersionUID = -3847803994560965572L;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((blockchainAddress == null) ? 0 : blockchainAddress.hashCode());
		result = prime * result + ((credential == null) ? 0 : credential.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		Person other = (Person) obj;
		if (blockchainAddress == null) {
			if (other.blockchainAddress != null) {
				return false;
			}
		} else if (!blockchainAddress.equals(other.blockchainAddress)) {
			return false;
		}
		if (credential == null) {
			if (other.credential != null) {
				return false;
			}
		} else if (!credential.equals(other.credential)) {
			return false;
		}
		if (password == null) {
			if (other.password != null) {
				return false;
			}
		} else if (!password.equals(other.password)) {
			return false;
		}
		return true;
	}

}