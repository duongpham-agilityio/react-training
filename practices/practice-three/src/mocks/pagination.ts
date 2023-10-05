import { PaginationProps } from '@/components';

export const defaultPropsPagination: PaginationProps = {
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
