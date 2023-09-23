pragma solidity ^0.5.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = " DecentralBank";
    address public owner;
    Tether public tether;
    RWD public rwd;

 constructor(RWD _RWD, Tether _Tether) public {

 }

}
