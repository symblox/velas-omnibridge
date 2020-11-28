import { Flex, Image, Text } from '@chakra-ui/core';
import React from 'react';

import DownTriangle from '../assets/down-triangle.svg';
import UpTriangle from '../assets/up-triangle.svg';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children }) => (
  <Flex
    p={0}
    m={0}
    overflowX="hidden"
    fontFamily="body"
    w="100%"
    minH="100vh"
    color="grey"
    align="center"
    direction="column"
    background="radial-gradient(51.87% 46.24% at 103.96% 53.74%,#593ca4 0,#1c1f4e 96.32%)"
    position="relative"
  >
    <Image
      src={DownTriangle}
      position="absolute"
      left="min(-15rem, -20%)"
      w="60rem"
      opacity={0.99}
    />
    <Header />
    <Flex
      flex={1}
      align="center"
      justify="flex-start"
      direction="column"
      w="100%"
      h="100%"
      position="relative"
    >
      {children}
    </Flex>
    <Footer />
  </Flex>
);
