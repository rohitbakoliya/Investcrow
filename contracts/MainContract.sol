// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./NewERC20Token.sol";
import "./Ownable.sol";

contract MainContract is Ownable{
    
    struct Agreement{
        address payable investor;
        address payable company;
        uint256 moneyRequired;
        uint256 tokensRequired;
        address token;
        uint8 status;//0=pending 1=accepted 2=completed 3=rejected
    }
    
    address payable  public manager; 
    address[] private deployedTokens;
    mapping(address => address) private addressToken; 
    mapping(address => uint256) private walletMoney;
    mapping(address => mapping(address => uint256)) private walletTokens; 
    mapping(address => mapping(address => Agreement)) private agreements;
    mapping(address => Agreement[]) private agreementsAddress;
    mapping(address => uint256) private noOfAgreements;
     
    NewERC20Token private _token;
    Agreement private _agr;
    
    constructor(){
        manager=payable(msg.sender);
    }
    
    modifier onlyManager(){
        require(msg.sender == manager);
        _;
    }
    
    fallback() external payable { revert(); }   
    receive() external payable { revert(); }

    function createToken(string memory name_, string memory symbol_, uint256 totalSupply_) public{
        _token = new NewERC20Token(name_,symbol_,totalSupply_, msg.sender);
        walletTokens[msg.sender][address(_token)] = totalSupply_;
        addressToken[msg.sender] = address(_token);
        deployedTokens.push(address(_token));
    }
    
    
    function infoToken(address token) public view returns(string memory, string memory, uint256 ){
        return (NewERC20Token(token).name(), NewERC20Token(token).symbol(), NewERC20Token(token).totalSupply());
    }
    
    function tokenBalance(address token, address sender) public view returns(uint256){
        return NewERC20Token(token).balanceOf(sender);
    }
    
    function getContractAddress() public view returns(address){
        return address(this);
    }
    
    function getAllDeployedTokens() public view returns(address[] memory){
        return deployedTokens;
    }
    
    function getStartupToken(address deployer) public view returns(address){
        return addressToken[deployer];
    }
    
    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }
    
    function getDepositedBalance(address sender) public view returns(uint256){
        return walletMoney[sender];
    }
    
    function getDepositedTokenBalance(address sender, address token) public view returns(uint256){
        return walletTokens[sender][token];
    }
    
    function getAgreement(address investor, address company) public view returns(Agreement memory){
        return agreements[investor][company];
    }
    
    function getAgreements(address user) public view returns(Agreement[] memory){
        return agreementsAddress[user];
    }
    
    function setStatus(address payable investor_, address payable company_, uint8 status_) public{
        agreements[investor_][company_].status = status_;
    }
    
    function getStatus(address payable investor_, address payable company_) public view returns(uint8){
        return agreements[investor_][company_].status;
    }
    
    
    function makeAgreement(address payable investor_, address payable company_, uint256 moneyRequired_, uint256 tokensRequired_, address token_) public {
        require(msg.sender == company_, "Only startup can create an Agreement");
        _agr = Agreement(investor_, company_, moneyRequired_, tokensRequired_, token_, 0);
        agreements[investor_][company_] = _agr;
        
        agreementsAddress[investor_].push(_agr);
        agreementsAddress[company_].push(_agr);
        
    }
    
    function approveAgreement(address payable investor_, address payable company_) public{
        _agr = agreements[investor_][company_];
        require(msg.sender == _agr.investor);
        setStatus(investor_,company_,1);
    }
    
    function rejectAgreement(address payable investor_, address payable company_) public{
        _agr = agreements[investor_][company_];
        require(msg.sender == _agr.investor);
        setStatus(investor_,company_,3);
    }
    
    function completeAgreement(address payable investor_, address payable company_) public{
        _agr = agreements[investor_][company_];
        uint256 investorBal = getDepositedBalance(investor_);
        uint256 companyBal = getDepositedTokenBalance(company_,address(_agr.token));
        require(_agr.moneyRequired <= investorBal, "Investor money balance in contract is less than Agreement.");
        require(_agr.tokensRequired <= companyBal, "Company token balance in contract is less than Agreement.");
        
        _token = NewERC20Token(_agr.token);    
        
        payable(company_).transfer(_agr.moneyRequired);
        
        NewERC20Token(_token).increaseAllowance(manager, investor_,_agr.tokensRequired);
        NewERC20Token(_token).increaseAllowance(address(this), investor_,_agr.tokensRequired);
        NewERC20Token(_token).increaseAllowance(address(this), manager,_agr.tokensRequired);
        NewERC20Token(_token).increaseAllowance(manager, address(this),_agr.tokensRequired);
        NewERC20Token(_token).transferFrom(manager, investor_, _agr.tokensRequired);
        
        walletMoney[company_] = walletMoney[company_] + _agr.moneyRequired;
        walletMoney[investor_] = walletMoney[investor_] - _agr.moneyRequired;
        
        walletTokens[manager][address(_token)] = walletTokens[manager][address(_token)] - _agr.tokensRequired ;
        walletTokens[investor_][address(_token)] = walletTokens[investor_][address(_token)] + _agr.tokensRequired ;
        setStatus(investor_,company_,2);
    }
    
    function depositMoney() public payable{
        uint256 amount = msg.value;
        walletMoney[msg.sender] = walletMoney[msg.sender] + amount;
    }
    
    function depositToken(address token_, uint256 amt_) public payable{
        uint256 amt=tokenBalance(token_, msg.sender);
        require(amt_<=amt,"You don't have enough token balance");
        NewERC20Token(token_).increaseAllowance(msg.sender, address(this), amt_);
        NewERC20Token(token_).increaseAllowance(msg.sender, manager, amt_);
        NewERC20Token(token_).transferFrom(msg.sender, manager, amt_);
        walletTokens[msg.sender][token_] = walletTokens[msg.sender][token_] - amt_ ;
        walletTokens[manager][token_] = walletTokens[manager][token_] + amt_;
    }
    
}