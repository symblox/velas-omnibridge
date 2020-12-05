import {
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import LoadingImage from '../assets/loading.svg';
import { BridgeContext } from '../contexts/BridgeContext';
import { getMonitorUrl } from '../lib/helpers';
import { ProgressRing } from './ProgressRing';

const getTransactionString = hash => {
  if (!hash) return 'here';
  const len = hash.length;
  return `${hash.substr(0, 6)}...${hash.substr(len - 4, len - 1)}`;
};

export const LoadingModal = ({ loadingProps }) => {
  const {
    loading,
    loadingText,
    fromToken,
    txHash,
    receipt,
    totalConfirms,
  } = useContext(BridgeContext);
  const intl = useIntl();

  return (
    <Modal
      isOpen={loading || loadingProps}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay background="modalBG">
        {(!receipt || totalConfirms === 0) && (
          <Flex direction="column" align="center">
            <Image src={LoadingImage} mb={4} />
            <Text color="white" fontWeight="bold">
              Loading ...
            </Text>
          </Flex>
        )}
        {receipt && totalConfirms && (
          <ModalContent
            boxShadow="0px 1rem 2rem #617492"
            borderRadius="full"
            mx={{ base: 12, lg: 0 }}
            maxW={{ base: '20rem', md: '25rem' }}
          >
            <ModalBody p={4}>
              <Flex
                align={{ base: 'center', md: 'stretch' }}
                direction={{ base: 'column', md: 'row' }}
              >
                <Flex
                  height="5rem"
                  width="5rem"
                  align="center"
                  justify="center"
                  border="5px solid #eef4fd"
                  borderRadius="50%"
                  mr={4}
                  position="relative"
                >
                  <Text>{`${
                    receipt.confirmations < totalConfirms
                      ? receipt.confirmations
                      : totalConfirms
                  }/${totalConfirms}`}</Text>
                  <Flex
                    position="absolute"
                    justify="center"
                    align="center"
                    color="blue.500"
                  >
                    <ProgressRing
                      radius={47.5}
                      stroke={5}
                      progress={
                        receipt.confirmations < totalConfirms
                          ? receipt.confirmations
                          : totalConfirms
                      }
                      totalProgress={totalConfirms}
                    />
                  </Flex>
                </Flex>
                <Flex
                  flex={1}
                  direction="column"
                  align={{ base: 'stretch', md: 'center' }}
                >
                  <Text width="100%">
                    {`${
                      loadingText ||
                      intl.formatMessage({ id: 'WAITING_FOR_CONFIRM' })
                    } ...`}
                  </Text>
                  <Text width="100%" color="grey">
                    <FormattedMessage id="ALM_MONITOR" />
                    <Link
                      href={getMonitorUrl(fromToken.chainId, txHash)}
                      rel="noreferrer noopener"
                      target="_blank"
                      color="blue.500"
                    >
                      {getTransactionString(txHash)}
                    </Link>
                  </Text>
                </Flex>
              </Flex>
            </ModalBody>
          </ModalContent>
        )}
      </ModalOverlay>
    </Modal>
  );
};
