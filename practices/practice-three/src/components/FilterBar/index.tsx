import { VStack } from '@chakra-ui/react';
import { memo } from 'react';

// Components
import { SearchBar, SearchBarProps } from './SearchBar';
import { FilterOptions } from './FilterOptions';

export type FilterBarProps = SearchBarProps;

const Component = (props: FilterBarProps) => {
  const { value, onChange } = props;

  return (
    <VStack alignItems="flex-start">
      <SearchBar value={value} onChange={onChange} />
      <FilterOptions />
    </VStack>
  );
};

export const FilterBar = memo(Component);
