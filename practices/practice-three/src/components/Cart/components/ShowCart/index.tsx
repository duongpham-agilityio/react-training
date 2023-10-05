import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

// Types
import { ICart } from '@/interface';

export interface ShowCartProps {
  data: ICart[]; // Todo: Change type when I apply BE
}

const areCompare = (
  prevProps: ShowCartProps,
  nextProps: ShowCartProps,
): boolean => isEqual(prevProps.data, nextProps.data);

export const ShowCart = memo(
  ({ data }: ShowCartProps): JSX.Element => <Box></Box>,
  areCompare,
);
