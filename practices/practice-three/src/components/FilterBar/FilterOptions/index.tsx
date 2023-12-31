import { memo } from 'react';
import { List } from '@chakra-ui/react';

// Constants
import { FILTER_DEFAULT } from '@/constants';

// Components
import { FilterButton } from '@/components/FilterBar/FilterOptions/components/FilterButton';

// Mocks
import { IFilterOption, filterOptions } from '@/mocks';

export type TFilterOptionsProps = {
  currentOption: string;
};

export const FilterOptions = memo(
  ({ currentOption }: TFilterOptionsProps): JSX.Element => (
    <List display="flex" gap={5} py={5}>
      {filterOptions.map((option: IFilterOption): JSX.Element => {
        const { name, value } = option;
        const isActive =
          currentOption === value ||
          (currentOption === '' && value === FILTER_DEFAULT);

        return (
          <FilterButton
            key={value}
            value={value}
            title={name}
            isActive={isActive}
          />
        );
      })}
    </List>
  ),
);
