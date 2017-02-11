package dbh17.contracts.solidity;

import java.math.BigInteger;

import org.ethereum.util.blockchain.SolidityCallResult;
import org.junit.Assert;
import org.junit.Test;

public class FundContractTest extends AbstractEthereumJTest {
	enum Risk {
		Low,
		Medium,
		High
	}

	enum ParticipantStructFields {
		PARTICIPANT_ADDRESS,
		VOTE,
		BALANCE
	}

	/**
	 * test depositing a value on a new account
	 */
	@Test
	public void testDeposit() {
		SolidityCallResult callFunctionResult = contract.callFunction(1, "invest", Risk.Low.ordinal());
		Assert.assertTrue(callFunctionResult.isSuccessful());
		// participant should have a balance = 1
		Object[] constFunctionResult = contract.callConstFunction("participants", blockChain.getSender().getAddress());
		Assert.assertEquals(BigInteger.ONE, constFunctionResult[ParticipantStructFields.BALANCE.ordinal()]);
		// contract should have a balance = 1
		Assert.assertEquals(BigInteger.ONE, blockChain.getBlockchain().getRepository().getBalance(contract.getAddress()));
	}

	/**
	 * Test getTotalVoteCount when all participants vote on the same risk.
	 */
	@Test
	public void testgetTotalVoteCountAllOnSameVote() {
		// vote account0
		SolidityCallResult callFunctionResult = contract.callFunction(1, "invest", Risk.Low.ordinal());
		Assert.assertTrue(callFunctionResult.isSuccessful());
		Object[] constFunctionResult = contract.callConstFunction("getTotalVoteCount");
		Assert.assertEquals(BigInteger.ONE, constFunctionResult[0]);
		// vote account1
		blockChain.setSender(account1.getEcKey());
		callFunctionResult = contract.callFunction(1, "invest", Risk.Low.ordinal());
		Assert.assertTrue(callFunctionResult.isSuccessful());
		constFunctionResult = contract.callConstFunction("getTotalVoteCount");
		Assert.assertEquals(BigInteger.valueOf(2L), constFunctionResult[0]);
	}

	/**
	 * Test getTotalVoteCount when all participants vote on the different risk.
	 */
	@Test
	public void testgetTotalVoteCountOnDifferentVote() {
		// vote account0
		SolidityCallResult callFunctionResult = contract.callFunction(1, "invest", Risk.Low.ordinal());
		Assert.assertTrue(callFunctionResult.isSuccessful());
		Object[] constFunctionResult = contract.callConstFunction("getTotalVoteCount");
		Assert.assertEquals(BigInteger.ONE, constFunctionResult[0]);
		// vote account1
		blockChain.setSender(account1.getEcKey());
		callFunctionResult = contract.callFunction(1, "invest", Risk.Medium.ordinal());
		Assert.assertTrue(callFunctionResult.isSuccessful());
		constFunctionResult = contract.callConstFunction("getTotalVoteCount");
		Assert.assertEquals(BigInteger.valueOf(2L), constFunctionResult[0]);
		// vote account2
		blockChain.setSender(account2.getEcKey());
		callFunctionResult = contract.callFunction(1, "invest", Risk.High.ordinal());
		Assert.assertTrue(callFunctionResult.isSuccessful());
		constFunctionResult = contract.callConstFunction("getTotalVoteCount");
		Assert.assertEquals(BigInteger.valueOf(3L), constFunctionResult[0]);
	}

	/**
	 * Test GetParticipantVote when voted.
	 */
	@Test
	public void testGetParticipantVote() {
		// vote account0
		SolidityCallResult callFunctionResult = contract.callFunction(1, "invest", Risk.Medium.ordinal());
		Assert.assertTrue(callFunctionResult.isSuccessful());
		Object[] constFunctionResult = contract.callConstFunction("getParticipantVote", account0.getAddress());
		Assert.assertEquals(BigInteger.valueOf(Risk.Medium.ordinal()), constFunctionResult[0]);
	}

	/**
	 * Test GetParticipantVote when not voted.
	 */
	@Test
	public void testGetParticipantVoteWhenNotYetVoted() {
		Object[] constFunctionResult = contract.callConstFunction("getParticipantVote", account0.getAddress());
		Assert.assertEquals(BigInteger.valueOf(0), constFunctionResult[0]);
	}

	@Test
	public void testGetParticipantBalance() {
		contract.callFunction(2, "invest", Risk.Medium.ordinal());
		Object[] constFunctionResult = contract.callConstFunction("getParticipantBalance", account0.getAddress());
		Assert.assertEquals(BigInteger.valueOf(2), constFunctionResult[0]);
	}

	@Test
	public void testGetParticipantBalanceWhenNotYetVoted() {
		Object[] constFunctionResult = contract.callConstFunction("getParticipantBalance", account0.getAddress());
		Assert.assertEquals(BigInteger.valueOf(0), constFunctionResult[0]);
	}

	/**
	 * test depositing a value on an existing account
	 */
	@Test
	public void testAddToExistingDeposit() {
		SolidityCallResult callFunctionResult = contract.callFunction(1, "invest", Risk.Low.ordinal());
		Assert.assertTrue(callFunctionResult.isSuccessful()); // participant should have a balance = 1
		Object[] constFunctionResult = contract.callConstFunction("participants", blockChain.getSender().getAddress());
		Assert.assertEquals(BigInteger.ONE, constFunctionResult[ParticipantStructFields.BALANCE.ordinal()]);

		// add more to the existing balance of the participant
		callFunctionResult = contract.callFunction(5, "invest", Risk.Low.ordinal());
		Assert.assertTrue(callFunctionResult.isSuccessful()); // participant should have a balance = 1

		// participant should have a balance = 6
		constFunctionResult = contract.callConstFunction("participants", blockChain.getSender().getAddress());
		Assert.assertEquals(BigInteger.valueOf(6L), constFunctionResult[ParticipantStructFields.BALANCE.ordinal()]);
		// contract should have a balance = 6
		Assert.assertEquals(BigInteger.valueOf(6L), blockChain.getBlockchain().getRepository().getBalance(contract.getAddress()));
	}

	@Override
	String getSolidifyFileName() {
		return "FundContract.sol";
	}

}
