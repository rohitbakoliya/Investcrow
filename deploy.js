const Web3 = require('web3');
const compiledMainContract = require('./client/src/ethutils/MainContract.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const fs = require('fs-extra');
const path = require('path');

const addressPath = path.resolve(__dirname, 'client', 'src', 'ethutils');
// fs.removeSync(addressPath);

async function main() {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_KOVAN_URL));

  const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
  web3.eth.accounts.wallet.add(signer);

  const abi = compiledMainContract['MainContract'].abi;
  const bytecode = compiledMainContract['MainContract'].evm.bytecode.object;

  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;
  const deployTx = contract.deploy();
  try {
    const deployedContract = await deployTx
      .send({
        from: signer.address,
        gas: '12500000',
      })
      .once('transactionHash', txhash => {
        console.log(`Mining deployment transaction ...`);
        console.log(`https://kovan.etherscan.io/tx/${txhash}`);
      });

    console.log(`Contract deployed at ${deployedContract.options.address}`);

    fs.ensureDirSync(addressPath);
    fs.outputJSONSync(path.resolve(addressPath, 'address.json'), deployedContract.options.address);
  } catch (err) {
    console.log(err);
  }
}
main();
