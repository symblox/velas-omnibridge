import { Box, Flex, HStack, Text, useBreakpointValue } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { GithubIcon } from '../icons/GithubIcon';
import { OmniBridgeIcon } from '../icons/OmniBridgeIcon';
import { RaidGuildIcon } from '../icons/RaidGuildIcon';
import { TelegramIcon } from '../icons/TelegramIcon';
import { TwitterIcon } from '../icons/TwitterIcon';
import { XDaiIcon } from '../icons/XDaiIcon';

export const Footer = () => {
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  return (
    <Flex
      position="relative"
      justify={{ base: 'center', sm: 'space-between' }}
      align="center"
      h={20}
      px={8}
      w="100%"
      color="white"
      background={{ base: 'transparent', lg: '#14163c' }}
    >
      {!smallScreen && (
        <Link to="/" display={{ base: 'none', sm: 'block' }}>
          <Flex
            justify="space-around"
            align="center"
            _hover={{ color: 'blue.500' }}
            transition="0.25s"
            transform="scale(2.5)"
          >
            <OmniBridgeIcon w={6} />
          </Flex>
        </Link>
      )}
      <HStack spacing={4}>
        <Box _hover={{ color: '#14163c' }} transition="0.25s" background="#4a475f" borderRadius="20rem" width="30px" height="30px" textAlign="center">
          <a
            href="https://twitter.com/symbloxdefi"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TwitterIcon />
          </a>
        </Box>
        <Box _hover={{ color: '#14163c' }} transition="0.25s" background="#4a475f" borderRadius="20rem" width="30px" height="30px" textAlign="center">
          <a
            href="https://t.me/symblox"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TelegramIcon />
          </a>
        </Box>
        <Box _hover={{ color: '#14163c' }} transition="0.25s" background="#4a475f" borderRadius="20rem" width="30px" height="30px" textAlign="center">
          <a
            href="https://github.com/symblox/symblox-yield-farming"
            rel="noreferrer noopener"
            target="_blank"
          >
            <GithubIcon />
          </a>
        </Box>
      </HStack>
    </Flex>
  );
};
