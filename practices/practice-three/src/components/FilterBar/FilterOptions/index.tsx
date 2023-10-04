import { memo } from 'react';
import { Button, Link, List, ListItem } from '@chakra-ui/react';

// Mocks
import { filterOptions } from '@/mocks';

export const FilterOptions = memo(() => (
  <List display="flex" gap={5} py={5}>
    {filterOptions.map((option) => {
      const { name, value } = option;

      return (
        <ListItem key={value}>
          <Button
            as={Link} // Todo: Update to later
            href={`?filter_option=${value}`} // Todo: Update to later
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
));
