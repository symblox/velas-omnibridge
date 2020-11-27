import { Box, Flex, HStack, useBreakpointValue } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { GithubIcon } from '../icons/GithubIcon';
import { SymbloxIcon } from '../icons/SymbloxIcon';
import { TelegramIcon } from '../icons/TelegramIcon';
import { TwitterIcon } from '../icons/TwitterIcon';

export const Footer = () => {
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  return (
    <Flex
      position="relative"
      justify={{ base: 'center', sm: 'space-between' }}
      align="center"
      h={20}
      maxW="75rem"
      px={8}
      w="100%"
      color="grey"
    >
      {!smallScreen && (
        <Link to="/" display={{ base: 'none', sm: 'block' }}>
          <Flex
            justify="space-around"
            align="center"
            _hover={{ color: 'blue.500' }}
            transition="0.25s"
          >
            <SymbloxIcon w={6} />
          </Flex>
        </Link>
      )}
      <HStack spacing={4}>
        <Box _hover={{ color: 'blue.500' }}>
          <a
            href="https://symblox.io"
            rel="noreferrer noopener"
            target="_blank"
          >
            <SymbloxIcon />
          </a>
        </Box>
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://twitter.com/symbloxdefi"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TwitterIcon />
          </a>
        </Box>
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://t.me/symblox"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TelegramIcon />
          </a>
        </Box>
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://github.com/symblox"
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
