// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Ownable {
    address public owner;


    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor()  {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(this));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}