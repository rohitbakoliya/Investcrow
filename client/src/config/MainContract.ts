import web3 from './web3';

const address = '0xE7c67e669180e22a8cF463384aCFbCa6290b90Dd';
const abi = [
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'investor_',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'company_',
        type: 'address',
      },
    ],
    name: 'approveAgreement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'investor_',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'company_',
        type: 'address',
      },
    ],
    name: 'completeAgreement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol_',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'totalSupply_',
        type: 'uint256',
      },
    ],
    name: 'createToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositMoney',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amt_',
        type: 'uint256',
      },
    ],
    name: 'depositToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'investor_',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'company_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'moneyRequired_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tokensRequired_',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'token_',
        type: 'address',
      },
    ],
    name: 'makeAgreement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'investor_',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'company_',
        type: 'address',
      },
    ],
    name: 'rejectAgreement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'investor_',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'company_',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'status_',
        type: 'uint8',
      },
    ],
    name: 'setStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'company',
        type: 'address',
      },
    ],
    name: 'getAgreement',
    outputs: [
      {
        components: [
          {
            internalType: 'address payable',
            name: 'investor',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'company',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'moneyRequired',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokensRequired',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct MainContract.Agreement',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getAgreements',
    outputs: [
      {
        components: [
          {
            internalType: 'address payable',
            name: 'investor',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'company',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'moneyRequired',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokensRequired',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct MainContract.Agreement[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllDeployedTokens',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'getDepositedBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'getDepositedTokenBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'deployer',
        type: 'address',
      },
    ],
    name: 'getStartupToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'investor_',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'company_',
        type: 'address',
      },
    ],
    name: 'getStatus',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'infoToken',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'tokenBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
export default new web3.eth.Contract(abi, address);
