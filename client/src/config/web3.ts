import Portis from '@portis/web3';
import Web3 from 'web3';
const myLocalPOANode = {
  nodeUrl: 'http://localhost:7545',
  chainId: 1337,
};
// const portis = new Portis('708bd2c6-4c80-407e-b7ca-715903532cb4', 'kovan'); //kovan
const portis = new Portis('27e3b877-1570-4e42-a979-fc539be813a5', myLocalPOANode); //Ganache
const web3 = new Web3(portis.provider);

export default web3;
