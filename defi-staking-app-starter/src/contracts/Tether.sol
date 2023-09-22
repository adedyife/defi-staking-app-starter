pragma solidity ^0.5.0;


contract Tether {
    string public name = "mock Tether";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value,
    );

    event Approve(
address indexed _owner,
        address indexed _spender,
        uint _value,
    );

    mapping(address => uint256) public balanceof;
    constructor () public{
        balanceof[msg.sender] += totalSupply ;
    }

error insufficientBal(uint requested, uint available);

    function transfer(address _to,uint value) public returns (bool success) {
        if (balanceof[msg.sender] > value) {
           insufficientBal({
            requested: value,
            available: balanceof[msg.sender]
           })
        } 
        balanceof[msg.sender] -= value;
        balanceof[_to] += value;
        
        
    }
}
