// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

contract Lottery{
    address public manager;
    address payable[] public players;
    
    constructor(){
        manager=msg.sender;
    }
    
    modifier restricted(){
        require(msg.sender == manager,"Only manager can start this process");
        _;
    }
    
    function enter() public payable{
        require(msg.value >= 0.01 ether,"0.01 ether is minimum amount to register for a player in the lottery.");
        players.push(msg.sender);
    }
    
    function psuedoRandomNumberGenerator() private view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players, manager)));
    }
    
    function pickWinner() public restricted{
        require(players.length > 0, "Not enough players to run lottery!");
        uint psuedoRandomNumber = psuedoRandomNumberGenerator();
        uint countPlayers = players.length;
        uint playerWon = (psuedoRandomNumber)%(countPlayers);
        players[playerWon].transfer(address(this).balance);
        players = new address payable[](0);
    }
    
    function getPlayers() public view returns (address payable[] memory){
        return players;
    }
}
