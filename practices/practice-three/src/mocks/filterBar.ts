// Types
import { FilterBarProps } from '@/components';

export interface IFilterOption {
  name: string;
  value: string;
}

export const filterOptions: IFilterOption[] = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Fashion',
    value: 'fashion',
  },
  {
    name: 'Electrics',
    value: 'electrics',
  },
  {
    name: 'Books',
    value: 'books',
  },
];

export const filterBarProps: FilterBarProps = {
  value: '',
  onChange: () => {},
};
