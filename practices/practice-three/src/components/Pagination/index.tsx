import { Button, HStack } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

export type TPaginationProps = {
  data: number[];
  currentPage: number;
  isNextPage: boolean;
  isPrevPage: boolean;
  onChangePage: (page: number) => void;
  onNextPage: (nextPage: number) => void;
  onPreviousPage: (prevPage: number) => void;
};

export const Pagination = memo((props: TPaginationProps): JSX.Element => {
  const {
    data,
    currentPage,
    isPrevPage,
    isNextPage,
    onChangePage,
    onNextPage,
    onPreviousPage,
  } = props;

  const handlePrevPage = useCallback((): void => {
    onPreviousPage(currentPage - 1);
  }, [currentPage, onPreviousPage]);

  const handleNextPage = useCallback((): void => {
    onNextPage(currentPage + 1);
  }, [currentPage, onNextPage]);

  if (!data.length) return <></>;

  return (
    <HStack justifyContent="center" py={10}>
      <Button
        bg="darkGrey30"
        boxShadow="base"
        isDisabled={!isPrevPage}
        onClick={handlePrevPage}
      >
        Prev
      </Button>
      {data.map((page: number): JSX.Element => {
        const isActive = page === currentPage;

        const handleChangePage = () => {
          onChangePage(page);
        };

        return (
          <Button
            key={page}
            bg={isActive ? 'warning' : 'darkGrey30'}
            boxShadow="base"
            onClick={handleChangePage}
          >
            {page}
          </Button>
        );
      })}
      <Button
        bg="darkGrey30"
        boxShadow="base"
        isDisabled={!isNextPage}
        onClick={handleNextPage}
      >
        Next
      </Button>
    </HStack>
  );
}, isEqual);
