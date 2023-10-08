import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Center, Grid, GridItem, Text } from '@chakra-ui/react';

// Components
import { IProductCard, ProductCard, ProductCardProps } from '@/components';

// Types
import { IProduct } from '@/interface';

// Constants
import { LIMIT_QUANTITY } from '@/constants';
import { MESSAGES } from '@/constants/message';

export interface ProductsProps extends Omit<ProductCardProps, 'info'> {
  data: IProduct[];
}

const areCompare = (prevProps: ProductsProps, nextProps: ProductsProps) =>
  isEqual(prevProps.data, nextProps.data);

export const Products = memo(
  ({ data, ...rest }: ProductsProps): JSX.Element =>
    data.length ? (
      <Grid
        templateColumns={{
          base: '1fr',
          xl: '1fr 1fr',
        }}
        gap={6}
      >
        {data.map((product: IProduct): JSX.Element => {
          const { id, imageURL, name, description, price, quantity } = product;
          const info: IProductCard = {
            id,
            imageURL,
            price,
            description,
            title: name,
            status: quantity <= LIMIT_QUANTITY,
            statusMessage: `Only ${quantity} left`,
          };

          return (
            <GridItem key={id}>
              <ProductCard info={info} {...rest} />
            </GridItem>
          );
        })}
      </Grid>
    ) : (
      <Center>
        <Text fontSize={18} fontWeight="bold">
          {MESSAGES.Empty}
        </Text>
      </Center>
    ),
  areCompare,
);
