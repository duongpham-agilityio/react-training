import { ChangeEvent, memo, useCallback } from 'react';
import { Center, Input, InputGroup } from '@chakra-ui/react';

// Icons
import { Search } from '@/assets/icons';

export type TSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = memo(({ value, onChange }: TSearchBarProps) => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      onChange(value);
    },
    [onChange],
  );

  return (
    <InputGroup
      border="1px"
      borderColor="gray.300"
      alignItems="center"
      borderRadius="md"
    >
      <Input
        fontSize="lg"
        placeholder="Search"
        borderColor="transparent"
        focusBorderColor="transparent"
        _hover={{
          borderColor: 'transparent',
        }}
        _placeholder={{
          fontWeight: 'light',
        }}
        value={value}
        onChange={handleChangeValue}
      />
      <Center h="60px" pr={5}>
        <Search />
      </Center>
    </InputGroup>
  );
});
