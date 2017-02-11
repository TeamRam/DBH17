package dbh17.contracts.solidity;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;

import org.ethereum.config.SystemProperties;
import org.ethereum.config.blockchain.HomesteadConfig;
import org.ethereum.core.Account;
import org.ethereum.util.blockchain.SolidityContract;
import org.ethereum.util.blockchain.StandaloneBlockchain;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Charsets;
import com.google.common.io.BaseEncoding;
import com.google.common.io.Resources;

/**
 * Abstract base class for testing contracts with the StandAlone Bockchain.
 * Initialization based on
 * {@link org.ethereum.samples.StandaloneBlockchainSample).
 *
 * @see keys-addr.txt (in ethereumj-core) for accounts that are created by
 *      default (using genesis-light-sb.json)
 * @author Micha Wensveen
 */
public abstract class AbstractEthereumJTest {
	private static final Logger LOG = LoggerFactory.getLogger(AbstractEthereumJTest.class);
	protected static final BigInteger WEIS_IN_ETHER = BigInteger.valueOf(1_000_000_000_000_000_000L);
	protected static StandaloneBlockchain blockChain;
	protected SolidityContract contract;
	protected static Account account0;

	/**
	 * Initalize the Standalone blockchain
	 */
	@BeforeClass
	public static void initalize() {
		// need to modify the default Homestead settings to keep the blocks
		// difficulty
		// low to not waste a lot of time for block mining
		SystemProperties.getDefault().setBlockchainConfig(new HomesteadConfig(new HomesteadConfig.HomesteadConstants() {
			@Override
			public BigInteger getMINIMUM_DIFFICULTY() {
				return BigInteger.ONE;
			}
		}));

		// Creating a blockchain which generates a new block for each
		// transaction
		// just not to call createBlock() after each call transaction
		blockChain = new StandaloneBlockchain().withAutoblock(true);
		LOG.debug("Creating first empty block (need some time to generate DAG)...");
		// warning up the block miner just to understand how long
		// the initial miner dataset is generated
		blockChain.createBlock();

		// account0.setAddress("5db10750e8caff27f906b41c71b3471057dd2004");
	}

	@Before
	public void setup() throws IOException {
		// create the contract to be tested.
		String solidifyFileName = getSolidifyFileName();
		contract = createContractFromFile(solidifyFileName);
	}

	/**
	 * Creates a contract from file.
	 *
	 * @param solidifyFileName solidifyFileName
	 * @return the SolidityContract
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	protected SolidityContract createContractFromFile(String solidifyFileName) throws IOException {
		// URL url = Resources.getResource(solidifyFileName);
		File contractFile = new File("src/main/solidity/", solidifyFileName);
		Assert.assertTrue(contractFile.exists());
		String contractSrc = Resources.toString(contractFile.toURI().toURL(), Charsets.UTF_8);
		LOG.debug("Creating a contract...");
		LOG.debug(solidifyFileName);
		// This compiles our Solidity contract, submits it to the blockchain
		// internally generates the block with this transaction and returns the
		// contract interface

		SolidityContract createdContract = blockChain.submitNewContract(contractSrc, getContractName(),
				getConstructorArgs());
		LOG.debug("Contract created");
		LOG.debug("on address: " + BaseEncoding.base16().encode(createdContract.getAddress()));
		LOG.debug("ABI: " + createdContract.getABI());
		return createdContract;
	}

	protected String getContractName() {
		return null;
	}

	/**
	 * Get the arguments needed to construct the contracts.
	 *
	 * @return Object[]
	 */
	Object[] getConstructorArgs() {
		return new Object[0];
	}

	/**
	 * Get the filename of the Solidity contract.
	 *
	 * @return name.
	 */
	abstract String getSolidifyFileName();

}
