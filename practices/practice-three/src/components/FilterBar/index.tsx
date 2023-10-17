import { VStack } from '@chakra-ui/react';
import { memo } from 'react';

// Components
import { SearchBar, TSearchBarProps } from './SearchBar';
import { FilterOptions, TFilterOptionsProps } from './FilterOptions';

export type TFilterBarProps = TSearchBarProps & TFilterOptionsProps;

const FilterBarComponent = ({
  value,
  currentOption,
  onChange,
}: TFilterBarProps): JSX.Element => (
  <VStack alignItems="flex-start">
    <SearchBar value={value} onChange={onChange} />
    <FilterOptions currentOption={currentOption} />
  </VStack>
);

export const FilterBar = memo(FilterBarComponent);
