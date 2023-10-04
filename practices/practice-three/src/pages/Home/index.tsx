import { memo, useCallback, useState } from 'react';
import { Heading } from '@chakra-ui/react';

// Components
import { FilterBar } from '@/components';
import { Products } from '@/pages/Home/components';

const Component = () => {
  const [filter, setFilter] = useState('');

  const onChangeFilter = useCallback((value: string) => {
    setFilter(value);
  }, []);

  return (
    <>
      <FilterBar value={filter} onChange={onChangeFilter} />

      {/* Title for filter by option */}
      <Heading fontSize={32} py={10} color="gray.40">
        Trending Items
      </Heading>

      {/* Render products */}
      <Products />
    </>
  );
};

const HomePage = memo(Component);

export default HomePage;
