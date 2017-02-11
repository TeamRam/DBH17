package dbh17.contracts.solidity;

import java.math.BigInteger;

import org.junit.Assert;
import org.junit.Test;

public class FundContractTest extends AbstractEthereumJTest {
	/**
	 * test depositing a value on a new account
	 */
	@Test
	public void testDeposit() {
		contract.callFunction(1, "deposit");
		Assert.assertTrue(true);
		// participant should have a balance = 1
		Object[] constFunctionResult = contract.callConstFunction("participants", blockChain.getSender().getAddress());
		Assert.assertEquals(BigInteger.ONE, constFunctionResult[1]);
		// contract should have a balance = 1
		Assert.assertEquals(BigInteger.ONE, blockChain.getBlockchain().getRepository().getBalance(contract.getAddress()));

	}

	/**
	 * test depositing a value on an existing account
	 */
	@Test
	public void testAddToExistingDeposit() {
		contract.callFunction(1, "deposit");
		Assert.assertTrue(true);
		// participant should have a balance = 1
		Object[] constFunctionResult = contract.callConstFunction("participants", blockChain.getSender().getAddress());
		Assert.assertEquals(BigInteger.ONE, constFunctionResult[1]);

		// add more to the existing balance of the participant
		contract.callFunction(5, "deposit");
		Assert.assertTrue(true);

		// participant should have a balance = 6
		constFunctionResult = contract.callConstFunction("participants", blockChain.getSender().getAddress());
		Assert.assertEquals(BigInteger.valueOf(6L), constFunctionResult[1]);
		// contract should have a balance = 6
		Assert.assertEquals(BigInteger.valueOf(6L), blockChain.getBlockchain().getRepository().getBalance(contract.getAddress()));

	}

	@Override
	String getSolidifyFileName() {
		return "FundContract.sol";
	}

}
