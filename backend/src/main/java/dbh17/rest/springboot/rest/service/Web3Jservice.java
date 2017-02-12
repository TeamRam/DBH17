package dbh17.rest.springboot.rest.service;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

@Service
public class Web3Jservice {
	private static final String TEMP_DIR = System.getProperty("java.io.tmpdir");
	private SecureRandom random = new SecureRandom();

	public Account createAccount() throws InterruptedException, ExecutionException, InvalidAlgorithmParameterException, NoSuchAlgorithmException,
			NoSuchProviderException, CipherException, IOException {
		File temdirectory = new File(TEMP_DIR);

		Web3j web3 = Web3j.build(new HttpService("http://blockchain.northeurope.cloudapp.azure.com:8545"));
		String password = new BigInteger(130, random).toString(32);
		String walletFileName = WalletUtils.generateNewWalletFile(password, temdirectory);
		// To load the credentials from a wallet file:
		Credentials credentials = WalletUtils.loadCredentials(password, new File(temdirectory, walletFileName));
		return new Account(credentials.getAddress(), password);
	}

	public static class Account {
		private final String address;

		public final String getAddress() {
			return address;
		}

		public String getPassword() {
			return password;
		}

		private String password;

		public Account(String address, String password) {
			this.address = address;
			this.password = password;
		}

	}
}
