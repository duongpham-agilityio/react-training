import { useCallback, MouseEvent, memo } from 'react';
import isEqual from 'react-fast-compare';
import {
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
} from '@chakra-ui/react';

// Constants
import { MESSAGES } from '@/constants';

// Components
import { ProductCard, TProductCard } from '@/components';

// Types
import { IProduct } from '@/interface';

// Icons
import { Pencil, Trash } from '@/assets/icons';
import { formatProductCardProps } from '@/helpers';

export type TProfileProductsProps = {
  data: IProduct[];
  onEdit: (productId: number) => void;
  onRemove: (productId: number) => void;
};

const ProductsComponent = ({
  data,
  onEdit,
  onRemove,
}: TProfileProductsProps) => {
  const handleRenderProduct = useCallback(
    (product: IProduct): JSX.Element => {
      const { id } = product;
      const info: TProductCard = formatProductCardProps(product);

      const handleEdit = (e: MouseEvent): void => {
        e.preventDefault();

        onEdit(id);
      };

      const handleRemove = (e: MouseEvent): void => {
        e.preventDefault();

        onRemove(id);
      };

      return (
        <GridItem key={id}>
          <ProductCard
            info={info}
            renderIcon={() => (
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
                  aria-label="Button remove product"
                  color="primary"
                  icon={<Pencil />}
                  bg="gray.700"
                  variant="hoverShadow"
                  onClick={handleEdit}
                />
              </Flex>
            )}
          />
        </GridItem>
      );
    },
    [onEdit, onRemove],
  );

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
        data.map(handleRenderProduct)
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

export const ShowProducts = memo(ProductsComponent, isEqual);
