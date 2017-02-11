pragma solidity ^0.4.0;

/// Fund contract.
/// The collective investment is influenced by each vote for one of the risks.
/// The formulas for the investment use weighted voting.
contract FundContract {
    
    enum Risk { Low, Medium, High }

    struct Participant {
        // Duplicating the address, which is the same as the mapping key
        address participantAddress;
        Risk vote;
        uint balance;
    }

    struct RiskBalances {
        uint lowRiskBalance;
        uint mediumRiskBalance;
        uint highRiskBalance;
    }

    mapping(address => Participant) public participants;

    // Invariant: the sum of the balances per risk must be equal to the balance of this contract

    RiskBalances riskBalances;

    function invest(Risk votedRisk) payable {
        Participant oldParticipant = participants[msg.sender];

        // Each participant can only vote for one risk.
        if (oldParticipant.vote != votedRisk && oldParticipant.balance != 0) throw;

        // Who can be a participant and invest money?
        // How often can the same participant invest money?
        // When can the participant invest?
        
        // Is it really a good idea to use personal accounts?

        uint oldBalance = participants[msg.sender].balance;

        updateBalances(votedRisk, msg.value);

        participants[msg.sender] = Participant({
            participantAddress: msg.sender,
            vote: votedRisk,
            balance: oldBalance + msg.value
        });
    }

    function getInvestment(Risk risk) constant returns (uint) {
        if (risk == Risk.Low) {
            return riskBalances.lowRiskBalance;
        } else if (risk == Risk.Medium) {
            return riskBalances.mediumRiskBalance;
        } else {
            return riskBalances.highRiskBalance;
        }
    }

    function getParticipantVote(address participant) constant returns (Risk) {
        return participants[participant].vote;
    }

    function getParticipantBalance(address participant) constant returns (uint) {
        return participants[participant].balance;
    }

    /// Returns the combined balance of the 3 risks.
    /// It must be equal to the balance of the contract.
    function getCombinedBalance() constant returns (uint) {
        return riskBalances.lowRiskBalance + riskBalances.mediumRiskBalance + riskBalances.highRiskBalance;
    }

    function getInvestmentWeights() constant returns (uint, uint, uint) {
        uint totalBalance = getCombinedBalance();

        return
            (riskBalances.lowRiskBalance / totalBalance,
            riskBalances.mediumRiskBalance / totalBalance,
            riskBalances.highRiskBalance / totalBalance);
    }

    function updateBalances(Risk vote, uint amountToAdd) internal {
        // Note that the weights are computed on the basis of the old values.

        uint newLowRiskBalance =
            riskBalances.lowRiskBalance + ((riskBalances.lowRiskBalance * amountToAdd) / getCombinedBalance());
        uint newMediumRiskBalance =
            riskBalances.mediumRiskBalance + ((riskBalances.mediumRiskBalance * amountToAdd) / getCombinedBalance());
        uint newHighRiskBalance =
            (getCombinedBalance() + amountToAdd) - (newLowRiskBalance + newMediumRiskBalance);

        riskBalances.lowRiskBalance = newLowRiskBalance;
        riskBalances.mediumRiskBalance = newMediumRiskBalance;
        riskBalances.highRiskBalance = newHighRiskBalance;
    }
}
