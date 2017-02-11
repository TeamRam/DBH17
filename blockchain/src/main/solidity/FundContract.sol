pragma solidity ^0.4.0;

/// Fund contract.
/// The collective investment is influenced by each vote for one of the risks.
/// The formulas for the investment are as follows:
/// The high risk investment is: (NumberOfHighRiskVotes / TotalNumberOfVotes) * TotalBalance
/// Medium risk and low risk investments are computed analogously.
contract FundContract {
    
    enum Risk { Low, Medium, High }

    struct Participant {
        // Duplicating the address, which is the same as the mapping key
        address participantAddress;
        Risk vote;
        uint balance;
    }

    mapping(address => Participant) public participants;

    uint lowRiskVoteCount;
    uint mediumRiskVoteCount;
    uint highRiskVoteCount;

    // TODO Use events

    // Invariant: per risk, total balance of this contract for that risk must equal sum of balances
    // of participants who voted for that risk.
    // This must be checked by test code (in the contract we cannot loop over the mapping)

    function invest(Risk votedRisk) payable {
        Participant oldParticipant = participants[msg.sender];

        // Each participant can only vote for one risk.
        if (oldParticipant.vote != votedRisk && oldParticipant.balance != 0) throw;

        // Who can be a participant and invest money?
        // How often can the same participant invest money?
        // When can the participant invest?
        
        // Is it really a good idea to use personal accounts?

        uint oldBalance = participants[msg.sender].balance;

        participants[msg.sender] = Participant({
            participantAddress: msg.sender,
            vote: votedRisk,
            balance: oldBalance + msg.value
        });
    }

    function getTotalVoteCount() returns (uint) {
        return lowRiskVoteCount + mediumRiskVoteCount + highRiskVoteCount;
    }

    function getInvestment(Risk risk) returns (uint) {
        uint totalVoteCount = getTotalVoteCount();

        if (risk == Risk.Low) {
            return (this.balance * lowRiskVoteCount) / totalVoteCount;
        } else if (risk == Risk.Medium) {
            return (this.balance * mediumRiskVoteCount) / totalVoteCount;
        } else {
            return (this.balance * highRiskVoteCount) / totalVoteCount;
        }
    }

    function getParticipantVote(address participant) returns (Risk) {
        return participants[participant].vote;
    }

    function getParticipantBalance(address participant) returns (uint) {
        return participants[participant].balance;
    }
}
