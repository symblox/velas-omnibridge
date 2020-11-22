import React from 'react';

import { CONFIG } from '../config';
import { NetworkIcon } from '../icons/NetworkIcon';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const networkOptions = [
  // {
  //   value: 100,
  //   key: 0,
  //   bridge: { chainId: 1, name: 'ETH Mainnet' },
  //   label: 'xDai',
  //   name: 'xDai Chain',
  //   icon: <NetworkIcon />,
  // },
  // {
  //   value: 1,
  //   key: 1,
  //   bridge: { chainId: 100, name: 'xDai Chain' },
  //   label: 'Mainnet',
  //   name: 'ETH Mainnet',
  //   icon: <NetworkIcon />,
  // },
  // {
  //   value: 77,
  //   key: 2,
  //   bridge: { chainId: 42, name: 'Kovan Testnet' },
  //   label: 'Sokol',
  //   name: 'Sokol Testnet',
  //   icon: <NetworkIcon />,
  // },
  {
    value: 111,
    key: 0,
    bridge: { chainId: 42, name: 'Kovan Testnet' },
    label: 'VELAS (Testnet)',
    name: 'VELAS Testnet',
    icon: <NetworkIcon />,
  },
  {
    value: 42,
    key: 1,
    bridge: { chainId: 111, name: 'VELAS Testnet' },
    label: 'Kovan',
    name: 'Kovan Testnet',
    icon: <NetworkIcon />,
  },
];

export const networkNames = {
  100: 'xDai Chain',
  1: 'ETH Mainnet',
  77: 'Sokol Testnet',
  42: 'Kovan Testnet',
  111: 'Velas Testnet',
};

export const chainUrls = {
  100: {
    rpc: 'https://xdai.poanetwork.dev',
    explorer: 'https://blockscout.com/poa/xdai',
    chainId: 100,
    name: 'xDai Chain',
  },
  1: {
    rpc: `https://mainnet.infura.io/v3/${CONFIG.infuraId}`,
    explorer: 'https://etherscan.io',
    chainId: 1,
    name: 'ETH Mainnet',
  },
  77: {
    rpc: 'https://sokol.poa.network',
    explorer: 'https://blockscout.com/poa/sokol',
    chainId: 77,
    name: 'Sokol Testnet',
  },
  42: {
    rpc: `https://kovan.infura.io/v3/${CONFIG.infuraId}`,
    explorer: 'https://kovan.etherscan.io',
    chainId: 42,
    name: 'Kovan Testnet',
  },
  111: {
    rpc: `https://explorer.testnet.veladev.net/rpc`,
    explorer: 'https://explorer.testnet.veladev.net',
    chainId: 111,
    name: 'VELAS Testnet',
  },
};

export const defaultTokens = {
  100: {
    name: 'Stake on xDai',
    address: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
    symbol: 'STAKE',
    decimals: 18,
    chainId: 100,
  },
  1: {
    name: 'Stake',
    address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
    symbol: 'STAKE',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0Ae055097C6d159879521C384F1D2123D1f195e6/logo.png',
  },
  77: {
    name: 'FaucetToken on xDai',
    address: '0x1b457c787792d17bea8d41885ada00e764712cdd',
    symbol: 'FAU',
    decimals: 18,
    chainId: 77,
  },
  42: {
    name: 'USDT Coin',
    address: '0x13512979ade267ab5100878e2e0f485b568328a4',
    symbol: 'USDT',
    decimals: 6,
    chainId: 42,
  },
  111: {
    name: 'USDT on VELAS',
    address: '0x170eaf824d3cf6c61c7dffffad7aa59f14ff6762',
    symbol: 'USDT',
    decimals: 6,
    chainId: 111,
  },
};

export const graphEndpoints = {
  100: 'https://api.thegraph.com/subgraphs/name/dan13ram/xdai-omnibridge',
  1: 'https://api.thegraph.com/subgraphs/name/dan13ram/mainnet-omnibridge',
  77: 'https://api.thegraph.com/subgraphs/name/dan13ram/sokol-omnibridge',
  42: 'https://api.thegraph.com/subgraphs/name/dan13ram/kovan-omnibridge',
  111: '',
};

export const mediators = {
  42: '0x3D61bF9925cfC137cadBeb142e4deECC8B4dAA33',
  77: '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e',
  1: '0x88ad09518695c6c3712AC10a214bE5109a655671',
  100: '0xf6A78083ca3e2a662D6dd1703c939c8aCE2e268d',
  111: '0x51B82CE1621EC34a3165Cf80EE75fcb8C346704d',
};

export const ambs = {
  42: '0xaa76D011C0019A8bCf39bE5508758123df19069c',
  77: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
  1: '0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e',
  100: '0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59',
  111: '0xFB8874b46D91e34B16489D458c9d952e9Bf74f63',
};

export const defaultTokensUrl = {
  100: 'https://tokens.honeyswap.org',
  1: 'https://tokens.uniswap.org',
  42: '',
  77: '',
  111: '',
};
