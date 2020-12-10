import React, { useContext } from 'react';
import { Link, Button } from '@chakra-ui/react';
import { BridgeContext } from '../contexts/BridgeContext';
import { isxDaiChain } from '../lib/helpers';
import { FormattedMessage } from 'react-intl';

export const WrapETHModal = ({ isOpen, onClose }) => {
  const { fromToken: token } = useContext(BridgeContext);

  return (
    <>
      {token && !isxDaiChain(token.chainId) && (
        <Link
          href="https://widget-test.relay.radar.tech/"
          //   href="https://widget.kyber.network/v0.8.0/?type=swap&mode=tab&lang=cn&defaultPair=ETH_WETH&&network=mainnet&theme=theme-emerald"
          isExternal
        >
          <Button colorScheme="blue" variant="outline">
            <FormattedMessage id="WRAP_ETHER" />
          </Button>
        </Link>
      )}
    </>
  );
};
