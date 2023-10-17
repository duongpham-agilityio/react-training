import { Spinner, Square } from '@chakra-ui/react';
import { memo } from 'react';

const Loading = () => (
  <Square size="full">
    <Spinner />
  </Square>
);

export default memo(Loading);
