import { Flex, Image, Text, useDisclosure } from '@chakra-ui/core';
import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import UnlockIcon from '../assets/unlock.svg';
import { BridgeContext } from '../contexts/BridgeContext';
import { Web3Context } from '../contexts/Web3Context';
import { ErrorModal } from './ErrorModal';

export const UnlockButton = () => {
  const { network, networkMismatch, ethersProvider } = useContext(Web3Context);
  const {
    fromAmount: amount,
    fromBalance: balance,
    allowed,
    approve,
  } = useContext(BridgeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState();
  const onClick = () => {
    setMessage();
    if (
      ethersProvider &&
      !networkMismatch &&
      window.BigInt(amount) > 0 &&
      window.BigInt(balance) >= window.BigInt(amount)
    ) {
      return approve();
    }
    if (!ethersProvider) {
      setMessage('Please connect wallet');
    } else if (networkMismatch) {
      setMessage(`Please switch wallet to ${network.name}`);
    } else if (window.BigInt(amount) <= 0) {
      setMessage('Please specify amount');
    } else if (window.BigInt(balance) < window.BigInt(amount)) {
      setMessage('Not enough balance');
    }
    return onOpen();
  };
  return (
    <Flex
      align="center"
      as="button"
      color="#fd19af"
      _hover={
        allowed
          ? undefined
          : {
              color: 'cyan.600',
            }
      }
      cursor={allowed ? 'not-allowed' : 'pointer'}
      transition="0.25s"
      position="relative"
      opacity={allowed ? 0.4 : 1}
      onClick={() => {
        if (!allowed) onClick();
      }}
      borderRadius="0.25rem"
      w={{ base: '13rem', lg: 'auto' }}
    >
      {isOpen && (
        <ErrorModal message={message} isOpen={isOpen} onClose={onClose} />
      )}
      <svg width="100%" height="50px" viewBox="0 0 81 25">
          <defs>
              <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="linearGradient-2">
                  <stop stop-color="#FC06C6" offset="0%"></stop>
                  <stop stop-color="#FF3A33" offset="100%"></stop>
              </linearGradient>
          </defs>
          <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="SVG-Layer" transform="translate(-17.209058, -68.966446)" fill="url(#linearGradient-2)">
                  <path d="M30.0967601,68.966446 L85.3213563,68.966446 C86.4751217,68.966446 87.5266553,69.6281067 88.0259255,70.6682528 L97.8336364,91.1009839 C98.3116179,92.0967788 97.8918473,93.2915106 96.8960524,93.7694921 C96.6259581,93.8991374 96.330188,93.966446 96.0305903,93.966446 L19.3875261,93.966446 C18.2829566,93.966446 17.3875261,93.0710155 17.3875261,91.966446 C17.3875261,91.6668483 17.4548348,91.3710782 17.58448,91.1009839 L27.3921909,70.6682528 C27.8914611,69.6281067 28.9429947,68.966446 30.0967601,68.966446 Z" id="Rectangle-Copy" transform="translate(57.709058, 81.466446) scale(1, -1) translate(-57.709058, -81.466446) "></path>
              </g>
              <g id="SVG-Layer" transform="translate(-23.000000, -30.000000)" fill="#000000" fill-rule="nonzero">
                  <path d="M89.1576923,25.4615385 C87.9370176,25.098594 87.1676996,23.8947593 87.3510832,22.6345427 C87.5344667,21.3743261 88.6149721,20.439673 89.8884615,20.439673 C91.161951,20.439673 92.2424564,21.3743261 92.4258399,22.6345427 C92.6092235,23.8947593 91.8399054,25.098594 90.6192308,25.4615385 L13.1576923,25.4615385 C14.378367,25.824483 15.147685,27.0283177 14.9643015,28.2885342 C14.7809179,29.5487508 13.7004125,30.4834039 12.4269231,30.4834039 C11.1534336,30.4834039 10.0729283,29.5487508 9.8895447,28.2885342 C9.70616116,27.0283177 10.4754792,25.824483 11.6961538,25.4615385 L1.31794872,3.66666667 C-0.346153846,1.96474359 0.894230769,0 2.77884615,0 L97.2211538,0 C99.1057692,0 100.346154,1.96474359 99.5358974,3.66666667 L89.1576923,25.4615385 Z" id="Path"></path>
              </g>
          </g>
      </svg>
      <Flex
        position="absolute"
        w="100%"
        h="100%"
        justify="center"
        align="center"
      >
        <Text color="white" fontWeight="bold">
          {allowed ? (
            <FormattedMessage id="UNLOCKED" />
          ) : (
            <FormattedMessage id="UNLOCK" />
          )}
        </Text>
        <Image src={UnlockIcon} ml={2} />
      </Flex>
    </Flex>
  );
};
