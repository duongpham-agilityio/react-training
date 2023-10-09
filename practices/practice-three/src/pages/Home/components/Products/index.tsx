import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { Center, Grid, GridItem, Text } from '@chakra-ui/react';

// Hooks
import { IUseFavorite, useFavorite } from '@/hooks';

// Constants
import { LIMIT_QUANTITY, MESSAGES } from '@/constants';

// Components
import { IProductCard, ProductCard, ProductCardProps } from '@/components';

// Types
import { IProduct } from '@/interface';

export interface ProductsProps extends Omit<ProductCardProps, 'info'> {
  data: IProduct[];
}

const areCompare = (prevProps: ProductsProps, nextProps: ProductsProps) =>
  isEqual(prevProps.data, nextProps.data);

export const Products = memo(
  ({ data, ...rest }: ProductsProps): JSX.Element => {
    const favorites = useFavorite((state: IUseFavorite) => state.data);

    // Check for product is liked
    const isLiked = useCallback(
      (id: number): boolean => {
        return !!favorites.find((item) => id === item.id);
      },
      [favorites],
    );

    const handleRenderProduct = useCallback(
      (product: IProduct): JSX.Element => {
        const { id, imageURL, name, description, price, quantity } = product;
        const info: IProductCard = {
          id,
          imageURL,
          price,
          description,
          title: name,
          status: quantity <= LIMIT_QUANTITY,
          statusMessage: `Only ${quantity} left`,
          isLiked: isLiked(id),
        };

        return (
          <GridItem key={id}>
            <ProductCard info={info} {...rest} />
          </GridItem>
        );
      },
      [isLiked, rest],
    );

    return data.length ? (
      <Grid
        templateColumns={{
          base: '1fr',
          xl: '1fr 1fr',
        }}
        gap={6}
      >
        {data.map(handleRenderProduct)}
      </Grid>
    ) : (
      <Center>
        <Text fontSize={18} fontWeight="bold">
          {MESSAGES.empty}
        </Text>
      </Center>
    );
  },
  areCompare,
);
