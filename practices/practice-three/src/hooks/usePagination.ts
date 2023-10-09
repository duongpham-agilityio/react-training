import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Constants
import { RECORD } from '@/constants';

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
  record = RECORD,
): IUsePagination<T> => {
  const [searchParam, setSearchParam] = useSearchParams({
    page: '1',
  });
  const currentPage = Number(searchParam.get('page'));

  /**
   * Calculate the number of pages to RECORD
   */
  const pagination = useMemo(() => {
    const filtersLength = data.length;
    const isSizePage = filtersLength % RECORD;
    const sizePage = Math.floor(filtersLength / record);

    if (!isSizePage) {
      return Array.from({ length: sizePage }).map(
        (_, index: number): number => index + 1,
      );
    }

    return Array.from({ length: sizePage + 1 }).map(
      (_, index: number): number => index + 1,
    );
  }, [data.length, record]);

  /**
   * Get items by page
   */
  const dataShow: T[] = useMemo((): T[] => {
    const result = data.filter((item) => {
      const index = data.indexOf(item);
      const isStartIndex = index >= (currentPage - 1) * RECORD;
      const isEndIndex = index < currentPage * RECORD;
      const condition = isStartIndex && isEndIndex;

      return condition;
    });

    return result;
  }, [currentPage, data]);

  // Change page
  const onChangePage = useCallback(
    (page: number) => {
      setSearchParam((prev) => ({
        ...prev,
        page: `${page}`,
      }));
    },
    [setSearchParam],
  );

  return {
    data: dataShow,
    isNextPage: currentPage < pagination.length,
    isPrevPage: currentPage >= pagination.length,
    currentPage,
    pagination,
    onChangePage,
  };
};
