pragma solidity ^0.5.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = " DecentralBank";
    address public owner;
    Tether public tether;
    RWD public rwd;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    address[] public stakers;

    constructor(RWD _RWD, Tether _Tether) public {
        rwd = _RWD;
        tether = _Tether;
    }

    modifier isOwner() {
        if (owner == msg.sender) _;
    }

    function deposit(uint _value) public {
        // token must be greater than 0
        require(_value > 0, "amount cannot be 0"); 
        // deposit token into the stake address
        tether.transferFrom(msg.sender, address(this), _value);
        stakingBalance[msg.sender] += _value;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function issueTokens() public isOwner() {
 for (uint256 i = 0; i < stakers.length; i++) {
    address recipients = stakers[i];
   uint balance = stakingBalance[recipients] / 9;
   if (balance > 0) {
   rwd.transfer(recipients, balance);
   }    

 }
        
    }
}
