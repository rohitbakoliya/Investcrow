const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'client', 'src', 'ethutils');
fs.removeSync(buildPath);

const contracts = [
  'MainContract.sol',
  'EIP20Interface.sol',
  'IERC20Metadata.sol',
  'NewERC20Token.sol',
  'Ownable.sol',
];
const paths = [];
const sources = [];

contracts.forEach((contract, index) => {
  paths.push(path.resolve(__dirname, 'contracts', contract));
  sources.push(fs.readFileSync(paths[index], 'utf8'));
});

var input = {
  language: 'Solidity',
  sources: {
    'MainContract.sol': {
      content: sources[0],
    },
    'EIP20Interface.sol': {
      content: sources[1],
    },
    'IERC20Metadata.sol': {
      content: sources[2],
    },
    'NewERC20Token.sol': {
      content: sources[3],
    },
    'Ownable.sol': {
      content: sources[4],
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

function findImports(path) {
  if (path === contracts[0])
    return {
      contents: sources[0],
    };
  else return { error: 'File not found' };
}

var output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

// console.log(output);

fs.ensureDirSync(buildPath);
for (contract in output.contracts) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace('.sol', '') + '.json'),
    output.contracts[contract]
  );
  // console.log(contract);
}
