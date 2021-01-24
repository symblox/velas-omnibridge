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
              ? `https://app.uniswap.org/#/swap?outputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&use=v2`
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
