import React, { useContext } from 'react';
import { Link, Button } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { isxDaiChain } from '../lib/helpers';
import { BridgeContext } from '../contexts/BridgeContext';
import { LanguageContext } from '../contexts/LanguageContext';

export const WrapETHModal = ({ isOpen, onClose }) => {
  const { fromToken: token } = useContext(BridgeContext);
  const { language } = useContext(LanguageContext);

  return (
    <>
      {token && !isxDaiChain(token.chainId) && (
        <Link
          href={
            token.chainId === 1
              ? `https://widget.kyber.network/v0.8.0/?type=swap&mode=tab&lang=${language.key}&defaultPair=ETH_WETH&&network=mainnet&theme=theme-emerald`
              : 'https://widget-test.relay.radar.tech/'
          }
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
