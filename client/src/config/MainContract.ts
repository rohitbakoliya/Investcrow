import web3 from './web3';
import MainContract from '../ethutils/MainContract.json';
import address from '../ethutils/address.json';

const abi = MainContract['MainContract'].abi;

export default new web3.eth.Contract(abi, address);
