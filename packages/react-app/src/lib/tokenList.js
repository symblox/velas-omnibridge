import schema from '@uniswap/token-lists/src/tokenlist.schema.json';
import Ajv from 'ajv';
import { gql, request } from 'graphql-request';

import {
  getBridgeNetwork,
  getGraphEndpoint,
  getTokenListUrl,
  isxDaiChain,
} from './helpers';

export const fetchTokenList = async chainId => {
  const tokens = await fetchDefaultTokens(chainId);
  return tokens;
};

const tokenListValidator = new Ajv({ allErrors: true }).compile(schema);

export const fetchDefaultTokens = async chainId => {
  const url = getTokenListUrl(chainId);
  if (url) {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      if (tokenListValidator(json)) {
        return json.tokens.filter(token => token.chainId === chainId);
      }
    }
  }
  // eslint-disable-next-line
  console.log({
    defaultTokensError: `DefaultTokenList not found for chainId ${chainId}`,
  });
  return [];
};

const homeTokensQuery = gql`
  query homeTokens {
    tokens {
      chainId: homeChainId
      address: homeAddress
      name: homeName
      symbol
      decimals
    }
  }
`;

const foreignTokensQuery = gql`
  query foreignTokens {
    tokens {
      chainId: foreignChainId
      address: foreignAddress
      name: foreignName
      symbol
      decimals
    }
  }
`;

export const fetchTokensFromSubgraph = async chainId => {
  const isxDai = isxDaiChain(chainId);
  const xDaiChainId = isxDai ? chainId : getBridgeNetwork(chainId);

  const endpoint = getGraphEndpoint(xDaiChainId);
  const query = isxDai ? homeTokensQuery : foreignTokensQuery;

  const data = await request(endpoint, query);
  return data.tokens;
};
