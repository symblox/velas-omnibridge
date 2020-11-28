import { Flex, Image, Text, useDisclosure } from '@chakra-ui/core';
import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import TransferIcon from '../assets/transfer.svg';
import { BridgeContext } from '../contexts/BridgeContext';
import { Web3Context } from '../contexts/Web3Context';
import { formatValue } from '../lib/helpers';
import { ConfirmTransferModal } from './ConfirmTransferModal';
import { ErrorModal } from './ErrorModal';

export const TransferButton = () => {
  const { network, networkMismatch, ethersProvider } = useContext(Web3Context);
  const {
    fromAmount: amount,
    fromToken: token,
    fromBalance: balance,
    tokenLimits,
    allowed,
  } = useContext(BridgeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState();
  const onClick = () => {
    setMessage();
    if (
      ethersProvider &&
      !networkMismatch &&
      window.BigInt(amount) >= window.BigInt(tokenLimits.minPerTx) &&
      window.BigInt(amount) < window.BigInt(tokenLimits.maxPerTx) &&
      window.BigInt(balance) >= window.BigInt(amount)
    ) {
      return onOpen();
    }
    if (!ethersProvider) {
      setMessage('Please connect wallet');
    } else if (networkMismatch) {
      setMessage(`Please switch wallet to ${network.name}`);
    } else if (window.BigInt(amount) < window.BigInt(tokenLimits.minPerTx)) {
      setMessage(
        `Please specify amount more than ${formatValue(
          tokenLimits.minPerTx,
          token.decimals,
        )}`,
      );
    } else if (window.BigInt(amount) >= window.BigInt(tokenLimits.maxPerTx)) {
      setMessage(
        `Please specify amount less than ${formatValue(
          tokenLimits.maxPerTx,
          token.decimals,
        )}`,
      );
    } else if (window.BigInt(balance) < window.BigInt(amount)) {
      setMessage('Not enough balance');
    }
    return onOpen();
  };
  return (
    <Flex
      as="button"
      align="center"
      mt={{ base: 2, md: 2, lg: 3 }}
      color="blue.500"
      _hover={
        !allowed
          ? undefined
          : {
              color: 'blue.600',
            }
      }
      cursor={!allowed ? 'not-allowed' : 'pointer'}
      transition="0.25s"
      position="relative"
      opacity={!allowed ? 0.4 : 1}
      onClick={() => {
        if (allowed) onClick();
      }}
      borderRadius="0.25rem"
      w={{ base: '13rem', lg: 'auto' }}
    >
      {isOpen && message && (
        <ErrorModal message={message} isOpen={isOpen} onClose={onClose} />
      )}
      {isOpen && !message && (
        <ConfirmTransferModal isOpen={isOpen} onClose={onClose} />
      )}
      <svg width="100%" height="50px" viewBox="0 0 81 25" version="1.1">
          <defs>
              <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="linearGradient-1">
                  <stop stop-color="#2872FA" offset="0%"></stop>
                  <stop stop-color="#42D9FE" offset="100%"></stop>
              </linearGradient>
          </defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="SVG-Layer" transform="translate(-7.209058, -96.966446)" fill="url(#linearGradient-1)">
                  <path d="M20.0967601,96.966446 L75.3213563,96.966446 C76.4751217,96.966446 77.5266553,97.6281067 78.0259255,98.6682528 L87.8336364,119.100984 C88.3116179,120.096779 87.8918473,121.291511 86.8960524,121.769492 C86.6259581,121.899137 86.330188,121.966446 86.0305903,121.966446 L9.38752613,121.966446 C8.28295663,121.966446 7.38752613,121.071016 7.38752613,119.966446 C7.38752613,119.666848 7.45483477,119.371078 7.58448002,119.100984 L17.3921909,98.6682528 C17.8914611,97.6281067 18.9429947,96.966446 20.0967601,96.966446 Z" id="Rectangle"></path>
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
          <FormattedMessage id="TRANSFER" />
        </Text>
        <Image src={TransferIcon} ml={2} />
      </Flex>
    </Flex>
  );
};
