import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';

import { LanguageContext } from '../contexts/LanguageContext';
import { languageOptions } from '../lib/constants';

const SelectOption = props => {
  const { onChange, data } = props;
  const { icon, value } = data;

  return (
    <Flex transition="0.25s" _hover={{ background: 'background' }}>
      <Button
        background="transparent"
        width="100%"
        justifyContent="flex-start"
        fontWeight="normal"
        _hover={{ color: 'blue.500' }}
        color="grey"
        onClick={() => onChange(data)}
      >
        {icon}
        <Text color="black" ml={2}>
          {value}
        </Text>
      </Button>
    </Flex>
  );
};

const SelectValue = ({ icon, value }) => (
  <Flex
    cursor="pointer"
    color="grey"
    transition="0.25s"
    px={4}
    _hover={{ color: 'blue.500' }}
    align="center"
  >
    {icon}
    <Text color="black" ml={2} fontWeight="bold">
      {value}
    </Text>
  </Flex>
);

export const LanguageSelector = props => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onChange = data => {
    close();
    setLanguage(data);
  };

  const selectOptions = languageOptions.map(data => {
    return (
      <SelectOption onChange={onChange} data={data} key={data.key.toString()} />
    );
  });

  const handleOpen = isOpen ? close : open;

  return (
    <Flex>
      <Popover isOpen={isOpen} onClose={close} placement="bottom">
        <PopoverTrigger>
          <Button
            p={0}
            background="transparent"
            _hover={{ background: 'transparent' }}
            onClick={handleOpen}
          >
            <SelectValue icon={language.icon} value={language.value} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          width="min-content"
          border="1px solid rgba(226,232,240, 0.8)"
          boxShadow="0 0.5rem 1rem #CADAEF"
        >
          <PopoverBody padding={0}>{selectOptions}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
