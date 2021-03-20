// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Campaign{
    
    struct Request{
        string desc;
        uint value;
        address payable recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint cntApprovals;
    }
    
    address public manager;
    uint public minContribution;
    mapping(uint => Request) public requests;
    mapping(address => bool) public approvers;
    uint public cntRequests = 0;
    uint public cntApprovers = 0;
    
    constructor(uint amt,address creator){
        manager=creator;
        minContribution=amt;
    }
    
    modifier requireManager(){
        require(msg.sender==manager,"Only manager is allowed to do this!");
        _;
    }
    
    function setMinContribution(uint amt) public requireManager{
        minContribution=amt;
    }
    
    function contribute() public payable{
        require(msg.value>=minContribution,"You must contribute amount >= Minimum Contribution specified bu manager.");
        approvers[msg.sender]=true;
        cntApprovers++;
    }    
    
    function makeRequest(string memory desc,uint val,address payable recipient) public requireManager{
        Request storage newReq = requests[cntRequests++];
        newReq.desc = desc;
        newReq.value = val;
        newReq.recipient = recipient;
        newReq.complete=false;
        newReq.cntApprovals=0;
    }
    
    function approveRequest(uint num) public {
        Request storage req = requests[num]; 
        require(approvers[msg.sender],"You must be a contributer to approve Request!!");
        require(!req.approvals[msg.sender],"You can only vote once for a Request!");
        req.cntApprovals++;
        req.approvals[msg.sender]=true;
    }
    
    function finalizeRequest(uint num) public requireManager{
        Request storage req = requests[num];
        require(!req.complete,"Request is already completed!");
        require(req.cntApprovals >= (cntApprovers/2),"You don't have enough votes to go on with this Request!");
        req.complete = true;    
        payable(req.recipient).transfer(req.value);
    }
}
