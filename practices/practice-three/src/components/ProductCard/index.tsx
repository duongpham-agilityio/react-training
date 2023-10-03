import {
  Badge,
  Box,
  Card,
  CardBody,
  Center,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

import { CartIcon, HeartIcon } from '@/components';

export interface IProductCard {
  id: number;
  imageURL: string;
  title: string;
  description: string;
  status: string;
  statusMessage?: string;
  price: number;
  saleOff?: number;
  isLike?: boolean;
}

export interface ProductCardProps {
  info: IProductCard;
  onAddToCard: (id: number) => void | Promise<void>;
  onLike: (id: number) => void | Promise<void>;
}

const ProductCard = (props: ProductCardProps) => {
  const {
    info: { imageURL, title, description, price, id },
    onAddToCard,
    onLike,
  } = props;

  const onClickOnCart = useCallback(() => {
    onAddToCard(id);
  }, [id]);

  const onClickHeart = useCallback(() => {
    onLike(id);
  }, [id]);

  return (
    <Card
      as={Link} // Update to later when I install react-router-dom
      href={`${id}`} // Update when the task above complete
      w={518}
      h={327}
      borderRadius={25}
      boxShadow="lg"
      _hover={{
        boxShadow: '2xl',
        transition: '0.3s linear',
        textDecoration: 'none',
      }}
    >
      <HStack h="full" gap={0} borderRadius="inherit" overflow="hidden">
        <Image src={imageURL} alt={title} bg="gray.10" flex={1} h="full" />
        <CardBody flex={1} px={6} py={7} h="full">
          <VStack h="full" justifyContent="space-between">
            <Box>
              <Heading fontSize={22} color="gray.40">
                {title}
              </Heading>
              <Text fontWeight="regular" py={3} fontSize={16}>
                {description}
              </Text>
              <Badge w={98} h={6} borderRadius={50} bg="green.10" my={2}>
                <Center
                  h="full"
                  color="white"
                  fontWeight="regular"
                  textTransform="capitalize"
                  fontSize={14}
                >
                  Available
                </Center>
              </Badge>
            </Box>

            <HStack w="full">
              <Text flex={1} fontSize={20} fontWeight="bold">
                ${price}
              </Text>
              <HStack flex={1} justifyContent="space-between">
                <CartIcon onClick={onClickOnCart} />
                <HeartIcon onClick={onClickHeart} />
              </HStack>
            </HStack>
          </VStack>
        </CardBody>
      </HStack>
    </Card>
  );
};

const areCompare = (current: ProductCardProps, next: ProductCardProps) =>
  isEqual(current.info, next.info);

export default memo(ProductCard, areCompare);
