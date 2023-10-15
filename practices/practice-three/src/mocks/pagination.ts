import { TPaginationProps } from '@/components';

export const defaultPropsPagination: TPaginationProps = {
  data: [1, 2, 3, 4, 5, 6, 7],
  currentPage: 1,
  isNextPage: true,
  isPrevPage: false,
  onChangePage: () => {},
  onNextPage: () => {},
  onPreviousPage: () => {
    console.log(122);
  },
};
