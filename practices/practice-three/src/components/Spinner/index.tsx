import { Spinner, Square } from '@chakra-ui/react';
import { memo } from 'react';

const Loading = () => {
  return (
    <Square size="full">
      <Spinner />
    </Square>
  );
};

export default memo(Loading);
