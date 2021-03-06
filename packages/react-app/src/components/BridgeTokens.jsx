import React, { useContext } from 'react';
import {
  Flex,
  Grid,
  Text,
  HStack,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { BridgeContext } from '../contexts/BridgeContext';
import { Web3Context } from '../contexts/Web3Context';
import { DaiWarning, isERC20DaiAddress } from './DaiWarning';
import { FromToken } from './FromToken';
import { LoadingModal } from './LoadingModal';
import { SystemFeedback } from './SystemFeedback';
import { ToToken } from './ToToken';
import { TransferButton } from './TransferButton';
import { UnlockButton } from './UnlockButton';
import { WrapETHModal } from './WrapETHModal';

export const BridgeTokens = () => {
  const { network } = useContext(Web3Context);
  const { fromToken } = useContext(BridgeContext);
  const isERC20Dai = isERC20DaiAddress(fromToken);
  const smallScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex
      w="calc(100% - 2rem)"
      maxW="75rem"
      background="white"
      boxShadow="0px 1rem 2rem rgba(204, 218, 238, 0.8)"
      borderRadius="1rem"
      direction="column"
      align="center"
      p={{ base: 4, md: 8 }}
      mx={4}
      my="auto"
    >
      <LoadingModal />
      {network && (
        <>
          {!smallScreen && (
            <Flex w="100%" justify="space-between">
              <HStack align="flex-start" spacing="16px">
                <Box>
                  <Text color="greyText" fontSize="sm">
                    <FormattedMessage id="FROM" />
                  </Text>
                  <Text fontWeight="bold" fontSize="lg">
                    {network.name}
                  </Text>
                </Box>
                <Box pt="10px" justify="center">
                  <WrapETHModal />
                </Box>
              </HStack>
              {isERC20Dai && <DaiWarning />}
              <Flex align="flex-end" direction="column">
                <Text color="greyText" fontSize="sm">
                  <FormattedMessage id="TO" />
                </Text>
                <Text fontWeight="bold" fontSize="lg" textAlign="right">
                  {network.bridge.name}
                </Text>
              </Flex>
            </Flex>
          )}
          <Grid
            templateColumns={{ base: 'initial', lg: '2fr 1fr 2fr' }}
            width="100%"
            my={4}
          >
            {smallScreen && isERC20Dai && <DaiWarning />}
            {smallScreen && (
              <HStack align="flex-start" spacing="16px" m={2}>
                <Box>
                  <Text color="greyText" fontSize="sm">
                    <FormattedMessage id="FROM" />
                  </Text>
                  <Text fontWeight="bold" fontSize="lg">
                    {network.name}
                  </Text>
                </Box>
                <Box pt="10px" justify="center">
                  <WrapETHModal />
                </Box>
              </HStack>
            )}
            <FromToken />
            <Flex
              direction="column"
              px={{ base: 2, lg: 4 }}
              my={{ base: 2, lg: 0 }}
              align="center"
              w="100%"
            >
              <UnlockButton />
              <TransferButton />
            </Flex>
            {smallScreen && (
              <Flex align="flex-end" direction="column" m={2}>
                <Text color="greyText" fontSize="sm">
                  <FormattedMessage id="TO" />
                </Text>
                <Text fontWeight="bold" fontSize="lg" textAlign="right">
                  {network.bridge.name}
                </Text>
              </Flex>
            )}
            <ToToken />
          </Grid>
          <SystemFeedback />
        </>
      )}
    </Flex>
  );
};
