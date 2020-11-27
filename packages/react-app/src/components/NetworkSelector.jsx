import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import { BridgeContext } from '../contexts/BridgeContext';
import { Web3Context } from '../contexts/Web3Context';
import { DownArrowIcon } from '../icons/DownArrowIcon';
import { networkOptions } from '../lib/constants';

const SelectOption = props => {
  const { onChange, network } = props;
  const { icon, label } = network;

  return (
    <Flex transition="0.25s" _hover={{ background: 'background' }}>
      <Button
        background="#1c204e"
        width="100%"
        justifyContent="flex-start"
        fontWeight="normal"
        _hover={{ color: 'blue.500' }}
        color="white"
        onClick={() => onChange(network)}
      >
        {icon}
        <Text color="white" ml={2}>
          {label}
        </Text>
      </Button>
    </Flex>
  );
};

const DropdownIndicator = () => {
  return (
    <Flex align="center" justify="center" paddingLeft="15px">
      <DownArrowIcon fontSize={8} color="white" />
    </Flex>
  );
};

const SelectValue = ({ icon, label }) => (
  <Flex
    cursor="pointer"
    color="white"
    transition="0.25s"
    px={4}
    _hover={{ color: 'blue.500' }}
    align="center"
  >
    {icon}
    <Text color="white" ml={2} fontWeight="bold">
      {label}
    </Text>
    <DropdownIndicator />
  </Flex>
);

export const NetworkSelector = props => {
  const [localNetwork, setLocalNetwork] = useState(0);
  const { setNetwork } = useContext(Web3Context);
  const { setDefaultToken } = useContext(BridgeContext);

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    let storageNetwork = parseInt(
      window.localStorage.getItem('chosenNetwork'),
      10,
    );
    if (isNaN(storageNetwork)) {
      storageNetwork = 0;
    } else {
      storageNetwork %= networkOptions.length;
    }
    setDefaultToken(networkOptions[storageNetwork].value);
    setLocalNetwork(storageNetwork);
    setNetwork(networkOptions[storageNetwork]);
  }, [setNetwork, setDefaultToken]);

  const onChange = network => {
    close();
    setDefaultToken(network.value);
    setNetwork(network);
    setLocalNetwork(network.key);
    window.localStorage.setItem('chosenNetwork', network.key);
  };

  const currentNetwork = networkOptions[localNetwork];
  const selectOptions = networkOptions
    .filter(network => currentNetwork.value !== network.value)
    .map(network => {
      return (
        <SelectOption
          onChange={onChange}
          network={network}
          key={network.key.toString()}
        />
      );
    });

  const handleOpen = isOpen ? close : open;

  return (
    <Flex {...props}>
      <Popover isOpen={isOpen} onClose={close} placement="bottom">
        <PopoverTrigger>
          <Button
            p={0}
            background="transparent"
            _hover={{ background: 'transparent' }}
            onClick={handleOpen}
          >
            <SelectValue {...currentNetwork} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          width="min-content"
          border="1px solid rgba(226,232,240, 0.8)"
          boxShadow="0 0.5rem 1rem rgb(2 6 33 / 45%)"
        >
          <PopoverBody padding={0}>{selectOptions}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
