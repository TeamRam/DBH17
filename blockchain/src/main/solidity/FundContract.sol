pragma solidity ^0.4.0;

contract FundContract {
    
    struct Participant {
        address participantAddress;
        uint balance;
    }
    
    mapping(address => Participant) public participants;
    
    // Invariant: total balance of this contract must equal sum of balances of participants
    
    function deposit(address participant) payable {
        participants[msg.sender] = Participant({
            participantAddress: msg.sender,
            balance: msg.value
        });
    }
}
