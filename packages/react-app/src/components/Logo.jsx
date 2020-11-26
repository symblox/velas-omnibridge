import { Image } from '@chakra-ui/core';
import React, { useContext, useState } from 'react';

import EthLogo from '../assets/eth-logo.png';
import VelasLogo from '../assets/velas-logo.png';
import { Web3Context } from '../contexts/Web3Context';
import { isxDaiChain, uriToHttp } from '../lib/helpers';

const BAD_SRCS = {};

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
export const Logo = ({ uri, reverseFallback = false }) => {
  const { network } = useContext(Web3Context);
  const fallbackCheck = reverseFallback
    ? !isxDaiChain(network.value)
    : isxDaiChain(network.value);
  const fallbackLogo = fallbackCheck ? VelasLogo : EthLogo;
  const [, refresh] = useState(0);

  if (uri) {
    const srcs = uriToHttp(uri);
    const src = srcs.find(s => !BAD_SRCS[s]);

    if (src) {
      return (
        <Image
          src={src}
          onError={() => {
            if (src) BAD_SRCS[src] = true;
            refresh(i => i + 1);
          }}
        />
      );
    }
  }

  return <Image src={fallbackLogo} />;
};
