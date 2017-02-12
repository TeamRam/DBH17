pragma solidity ^0.4.8;

/// Fund contract.
/// Each investment includes a vote for a risk, and adds to the balance for that
/// specific risk.
/// The solution can easily be generalized to other choices than risk levels.
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
    // Invariant: the sum of the balances per participant must be equal to the balance of this contract

    RiskBalances riskBalances;

    event Invested(address participant, Risk vote, uint amount);

    function FundContract() {
        // This assignments happened to be necessary due to some technical challenges.
        riskBalances.lowRiskBalance = 1;
        riskBalances.mediumRiskBalance = 1;
        riskBalances.highRiskBalance = 1;
    }

    function invest(Risk votedRisk) payable {
        Participant oldParticipant = participants[msg.sender];

        // Each participant can only vote for one risk, even if he/she invests more than once.
        if (oldParticipant.vote != votedRisk && oldParticipant.balance != 0) throw;

        uint oldBalance = participants[msg.sender].balance;

        updateBalances(votedRisk, msg.value);

        participants[msg.sender] = Participant({
            participantAddress: msg.sender,
            vote: votedRisk,
            balance: oldBalance + msg.value
        });

        Invested(msg.sender, votedRisk, msg.value);
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

    function getBalancesPerRisk() constant returns (uint, uint, uint) {
        return (riskBalances.lowRiskBalance, riskBalances.mediumRiskBalance, riskBalances.highRiskBalance);
    }

    function updateBalances(Risk vote, uint amountToAdd) internal {
        uint newLowRiskBalance = (vote == Risk.Low) ? (riskBalances.lowRiskBalance + amountToAdd) : riskBalances.lowRiskBalance;
        uint newMediumRiskBalance = (vote == Risk.Medium) ? (riskBalances.mediumRiskBalance + amountToAdd) : riskBalances.mediumRiskBalance;
        uint newHighRiskBalance = (vote == Risk.High) ? (riskBalances.highRiskBalance + amountToAdd) : riskBalances.highRiskBalance;

        riskBalances.lowRiskBalance = newLowRiskBalance;
        riskBalances.mediumRiskBalance = newMediumRiskBalance;
        riskBalances.highRiskBalance = newHighRiskBalance;
    }
}
