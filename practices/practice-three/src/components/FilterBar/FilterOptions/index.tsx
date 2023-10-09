import { memo } from 'react';
import { Button, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Mocks
import { IFilterOption, filterOptions } from '@/mocks';

// Constants
import { SEARCH_PARAMS } from '@/constants';

export const FilterOptions = memo(
  (): JSX.Element => (
    <List display="flex" gap={5} py={5}>
      {filterOptions.map((option: IFilterOption): JSX.Element => {
        const { name, value } = option;

        return (
          <ListItem key={value}>
            <Button
              as={Link}
              to={`?${SEARCH_PARAMS.category}=${value}`}
              border="1px solid"
              borderColor="blackAlpha.300"
              borderRadius={25}
              boxShadow="md"
              bg="white"
              color="gray.20"
              fontWeight="regular"
              fontSize={16}
              px={15}
              _hover={{
                boxShadow: 'xl',
              }}
            >
              {name}
            </Button>
          </ListItem>
        );
      })}
    </List>
  ),
);
