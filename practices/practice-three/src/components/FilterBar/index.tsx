import { VStack } from '@chakra-ui/react';
import { memo } from 'react';

// Components
import { SearchBar, TSearchBarProps } from './SearchBar';
import { FilterOptions } from './FilterOptions';

export type TFilterBarProps = TSearchBarProps;

const Component = (props: TFilterBarProps) => {
  const { value, onChange } = props;

  return (
    <VStack alignItems="flex-start">
      <SearchBar value={value} onChange={onChange} />
      <FilterOptions />
    </VStack>
  );
};

export const FilterBar = memo(Component);
