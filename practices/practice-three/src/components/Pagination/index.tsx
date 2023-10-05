import { Button, HStack } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

export interface PaginationProps {
  data: number[];
  currentPage: number;
  isNextPage: boolean;
  isPrevPage: boolean;
  onChangePage: (page: number) => void;
  onNextPage: (nextPage: number) => void;
  onPreviousPage: (prevPage: number) => void;
}

// Control re-render
const areCompare = (
  prevProps: PaginationProps,
  nextProps: PaginationProps,
): boolean => isEqual(prevProps.data, nextProps.data);

export const Pagination = memo((props: PaginationProps) => {
  const {
    data,
    currentPage,
    isPrevPage,
    isNextPage,
    onChangePage,
    onNextPage,
    onPreviousPage,
  } = props;

  const handlePrevPage = useCallback(() => {
    onPreviousPage(currentPage - 1);
  }, [currentPage, onPreviousPage]);

  const handleNextPage = useCallback(() => {
    onNextPage(currentPage + 1);
  }, [currentPage, onNextPage]);

  return (
    <HStack justifyContent="center">
      <Button
        bg="gray.400"
        boxShadow="base"
        isDisabled={!isPrevPage}
        onClick={handlePrevPage}
      >
        Prev
      </Button>
      {data.map((page: number) => {
        const isActive = page === currentPage;
        const handleChangePage = () => {
          onChangePage(page);
        };

        return (
          <Button
            key={page}
            bg={isActive ? 'yellow.20' : 'gray.400'}
            boxShadow="base"
            onClick={handleChangePage}
          >
            {page}
          </Button>
        );
      })}
      <Button
        bg="gray.400"
        boxShadow="base"
        isDisabled={!isNextPage}
        onClick={handleNextPage}
      >
        Next
      </Button>
    </HStack>
  );
}, areCompare);
