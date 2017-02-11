pragma solidity ^0.4.0;

contract FundContract {
    
    struct Participant {
        address participantAddress;
        uint balance;
    }
    
    mapping(address => Participant) public participants;
    
    // Invariant: total balance of this contract must equal sum of balances of participants
    // This must be checked by test code (in the contract we cannot loop over the mapping)

    function deposit() payable {
        // Who can be a participant and deposit money?
        // How often can the same participant deposit money?
        // When can the participant deposit?
        
        // Is it really a good idea to use personal accounts?

        uint oldBalance = participants[msg.sender].balance;

        participants[msg.sender] = Participant({
            participantAddress: msg.sender,
            balance: oldBalance + msg.value
        });
    }
}
