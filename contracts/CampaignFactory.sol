// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import './Campaign.sol';

contract CampaignFactory{
    address[] private deployedContracts;
    Campaign private camp;
    function createCampaign(uint amt) public{
        camp = new Campaign(amt, msg.sender);
        deployedContracts.push(address(camp));
    }
    
    function getDeployedContracts() public view returns(address[] memory){
        return deployedContracts;
    }
}