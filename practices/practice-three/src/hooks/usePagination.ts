import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Constants
import { RECORDS_PER_PAGE, SEARCH_PARAMS } from '@/constants';

export interface IUsePagination<T> {
  data: T[];
  pagination: number[];
  currentPage: number;
  isNextPage: boolean;
  isPrevPage: boolean;
  onChangePage: (page: number) => void;
}

export const usePagination = <T>(
  data: T[],
  record = RECORDS_PER_PAGE,
): IUsePagination<T> => {
  const [searchParam, setSearchParam] = useSearchParams({
    page: '1',
  });

  //  Get current page
  const currentPage: number = Number(searchParam.get(SEARCH_PARAMS.PAGE));

  /**
   * Calculate the number of pages to RECORDS_PER_PAGE
   */
  const pagination = useMemo(() => {
    const filtersLength = data.length;
    const isSizePage = filtersLength % RECORDS_PER_PAGE;
    const sizePage = Math.floor(filtersLength / record);

    return Array.from({ length: isSizePage ? sizePage + 1 : sizePage }).map(
      (_, index: number): number => index + 1,
    );
  }, [data.length, record]);

  /**
   * Get items by page
   */
  const dataShow: T[] = useMemo((): T[] => {
    const result = data.filter((item) => {
      const index = data.indexOf(item);
      const isStartIndex = index >= (currentPage - 1) * RECORDS_PER_PAGE;
      const isEndIndex = index < currentPage * RECORDS_PER_PAGE;
      const condition = isStartIndex && isEndIndex;

      return condition;
    });

    return result;
  }, [currentPage, data]);

  // Change page
  const onChangePage = useCallback(
    (page: number) => {
      setSearchParam((prev) => {
        prev.set(SEARCH_PARAMS.PAGE, `${page}`);

        return prev;
      });
    },
    [setSearchParam],
  );

  const paginationSize = pagination.length;

  // Should we change the next page or not?
  const isNextPage: boolean = currentPage < paginationSize;

  // Should we change the next page or not?
  const isPrevPage: boolean =
    currentPage >= paginationSize && paginationSize !== 1 && !!paginationSize;

  return {
    data: dataShow,
    isNextPage,
    isPrevPage,
    currentPage,
    pagination,
    onChangePage,
  };
};
