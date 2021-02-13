import React from 'react';

import { CONFIG } from '../config';
import { NetworkIcon } from '../icons/NetworkIcon';

export const languageOptions = [
  {
    key: 'cn',
    value: '中',
    icon: <NetworkIcon />,
  },
  {
    key: 'en',
    value: 'EN',
    icon: <NetworkIcon />,
  },
];

export const networkOptions = [
  {
    value: 128,
    key: 0,
    bridge: { chainId: 106, name: 'VELAS' },
    label: 'HECO',
    name: 'HECO',
    icon: <NetworkIcon />,
  },
  {
    value: 106,
    key: 1,
    bridge: { chainId: 128, name: 'HECO' },
    label: 'VELAS',
    name: 'VELAS',
    icon: <NetworkIcon />,
  },
  {
    value: 111,
    key: 3,
    bridge: { chainId: 42, name: 'Kovan Testnet' },
    label: 'VELAS (Testnet)',
    name: 'VELAS Testnet',
    icon: <NetworkIcon />,
  },
  {
    value: 42,
    key: 4,
    bridge: { chainId: 111, name: 'VELAS Testnet' },
    label: 'Kovan',
    name: 'Kovan Testnet',
    icon: <NetworkIcon />,
  },
];

export const networkNames = {
  100: 'xDai Chain',
  1: 'Ethereum',
  77: 'Sokol Testnet',
  42: 'Kovan Testnet',
  106: 'VELAS',
  111: 'Velas Testnet',
  128: 'HECO',
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
  106: {
    rpc: `https://explorer.velas.com/rpc`,
    explorer: 'https://explorer.velas.com',
    chainId: 106,
    name: 'VELAS',
  },
  111: {
    rpc: `https://explorer.testnet.veladev.net/rpc`,
    explorer: 'https://explorer.testnet.veladev.net',
    chainId: 111,
    name: 'VELAS Testnet',
  },
  128: {
    rpc: `https://http-mainnet-node.huobichain.com`,
    explorer: 'https://hecochain.io',
    chainId: 128,
    name: 'HECO',
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
    name: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    decimals: 6,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
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
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  },
  106: {
    name: 'Symblox V2',
    address: '0x01db6acfa20562ba835ae9f5085859580a0b1386',
    symbol: 'SYX',
    decimals: 18,
    chainId: 106,
    logoURI:
      'https://raw.githubusercontent.com/symblox/assets/master/blockchains/velas-main/assets/0x01Db6ACFA20562Ba835aE9F5085859580A0b1386/logo.png',
  },
  111: {
    name: 'USDT on VELAS',
    address: '0x170eaf824d3cf6c61c7dffffad7aa59f14ff6762',
    symbol: 'USDT',
    decimals: 6,
    chainId: 111,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  },
  128: {
    name: 'Symblox V2 on HECO',
    address: '0x02a71b6a8531060b7b7a370a06fceee21669c321',
    symbol: 'SYX',
    decimals: 18,
    chainId: 128,
    logoURI:
      'https://raw.githubusercontent.com/symblox/assets/master/blockchains/velas-main/assets/0x01Db6ACFA20562Ba835aE9F5085859580A0b1386/logo.png',
  },
};

export const graphEndpoints = {
  100: 'https://api.thegraph.com/subgraphs/name/symblox/xdai-omnibridge',
  1: 'https://api.thegraph.com/subgraphs/name/symblox/mainnet-omnibridge',
  77: 'https://api.thegraph.com/subgraphs/name/symblox/sokol-omnibridge',
  42: 'https://api.thegraph.com/subgraphs/name/symblox/kovan-omnibridge',
  111: 'https://rpc.symblox.net:8080/graph/subgraphs/name/symblox/velas-omnibridge',
  106: 'https://rpc.symblox.net:8080/graph/subgraphs/name/symblox/velas-omnibridge',
};

export const mediators = {
  42: '0x3D61bF9925cfC137cadBeb142e4deECC8B4dAA33',
  77: '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e',
  1: '0x3c0A98a372cF83Cd491aE8fdE700934D502fBeD9',
  100: '0xf6A78083ca3e2a662D6dd1703c939c8aCE2e268d',
  111: '0x51B82CE1621EC34a3165Cf80EE75fcb8C346704d',
  106: '0x378A5f120ab3Ff32CAa7E0e8bA963Bd82961Be57',
  128: '0x0416C32f4A64b6cb626aAB54CcB974c5062d3d51',
};

export const ambs = {
  42: '0xaa76D011C0019A8bCf39bE5508758123df19069c',
  77: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
  1: '0xce74083Bf7Ff48dF33D194080a8945F12222b9c5',
  100: '0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59',
  111: '0xFB8874b46D91e34B16489D458c9d952e9Bf74f63',
  106: '0x71340146b5DdAC8F339F576f3833Ce06B2D6697A',
  128: '0x604C48eB45Dab7Dac69d2608c49d646Cfe275a95',
};

export const defaultTokensUrl = {
  100: 'https://tokens.honeyswap.org',
  1: '/tokens.json',
  42: '/tokens.json',
  111: '/tokens.json',
  106: '/tokens.json',
  128: '/tokens.json',
};
