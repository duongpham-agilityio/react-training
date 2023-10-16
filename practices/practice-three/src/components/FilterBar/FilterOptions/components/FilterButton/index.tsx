import { Button, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { memo } from 'react';

// Constants
import { SEARCH_PARAMS } from '@/constants';

export type TFilterButtonProps = {
  value: string;
  title: string;
  isActive: boolean;
};

export const FilterButton = memo(
  ({ value, title, isActive }: TFilterButtonProps) => (
    <ListItem>
      <Button
        as={Link}
        to={`?${SEARCH_PARAMS.CATEGORY}=${value}`}
        border="1px"
        boxShadow="md"
        fontWeight="regular"
        borderRadius="md"
        fontSize="md"
        px={15}
        variant={isActive ? 'active' : 'default'}
      >
        {title}
      </Button>
    </ListItem>
  ),
);
