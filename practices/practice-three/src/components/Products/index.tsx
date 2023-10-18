import {
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { memo, useCallback, MouseEvent } from 'react';

// Constants
import { MESSAGES } from '@/constants';

// Components
import { ProductCard, TProductCard, TProductCardProps } from '..';

// Types
import { IProduct } from '@/interface';

// Helpers
import { formatProductCardProps } from '@/helpers';

// Icons
import { Pencil, Trash } from '@/assets/icons';

export type TProductsProps = Partial<Pick<TProductCardProps, 'renderIcon'>> & {
  isUpdateMode?: boolean;
  data: IProduct[];
  onAddToCart: (productId: number) => void;
  onAddToFavorite: (productId: number) => void;
};

const ProductsComponent = (props: TProductsProps) => {
  const { isUpdateMode = false, data, onAddToCart, onAddToFavorite } = props;

  const handleShowUpdateMode = useCallback(
    (product: IProduct) => {
      const { id } = product;
      const info: TProductCard = formatProductCardProps(product);

      const handleEdit = (e: MouseEvent): void => {
        e.preventDefault();

        onAddToCart(id);
      };

      const handleRemove = (e: MouseEvent): void => {
        e.preventDefault();

        onAddToFavorite(id);
      };

      return (
        <GridItem key={id}>
          <ProductCard
            info={info}
            renderIcon={() => {
              return (
                <Flex gap={2}>
                  <IconButton
                    aria-label="Button remove product"
                    color="primary"
                    icon={<Trash fill="white" />}
                    bg="error"
                    variant="hoverShadow"
                    onClick={handleRemove}
                  />

                  <IconButton
                    aria-label="Button edit product"
                    color="primary"
                    icon={<Pencil />}
                    bg="gray.700"
                    variant="hoverShadow"
                    onClick={handleEdit}
                  />
                </Flex>
              );
            }}
          />
        </GridItem>
      );
    },
    [onAddToCart, onAddToFavorite],
  );

  const handleShowNoInUpdateMode = useCallback(
    (product: IProduct): JSX.Element => {
      const { id } = product;
      const info: TProductCard = formatProductCardProps(product);

      return (
        <GridItem key={id}>
          <ProductCard
            info={info}
            onAddToCart={onAddToCart}
            onLike={onAddToFavorite}
          />
        </GridItem>
      );
    },
    [onAddToCart, onAddToFavorite],
  );

  const render = isUpdateMode ? handleShowUpdateMode : handleShowNoInUpdateMode;

  return (
    <Grid
      templateColumns={{
        base: '1fr',
        xl: '1fr 1fr',
      }}
      gap={6}
      py={5}
    >
      {data.length ? (
        data.map(render)
      ) : (
        <Center>
          <Text fontSize="lg" fontWeight="bold">
            {MESSAGES.EMPTY}
          </Text>
        </Center>
      )}
    </Grid>
  );
};

export const Products = memo(ProductsComponent);
