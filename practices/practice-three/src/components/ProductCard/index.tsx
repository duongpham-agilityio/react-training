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
import { memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';

// Components
import { CartIcon, HeartIcon } from '@/components';

// Todo: Update to later
export interface IProductCard {
  id: number;
  imageURL: string;
  title: string;
  description: string;
  status: boolean;
  statusMessage?: string;
  price: number;
  isLike?: boolean;
}

interface BadgeData {
  color: string;
  message: string;
}

interface IBadge {
  available: BadgeData;
  other: BadgeData;
}

export interface ProductCardProps {
  info: IProductCard;
  onAddToCard: (id: number) => void | Promise<void>;
  onLike: (id: number) => void | Promise<void>;
}

const Component = (props: ProductCardProps) => {
  const {
    info: {
      imageURL,
      title,
      description,
      price,
      id,
      isLike,
      status,
      statusMessage,
    },
    onAddToCard,
    onLike,
  } = props;

  const badge: BadgeData = useMemo(() => {
    const obj: IBadge = {
      available: {
        color: 'green.10',
        message: 'available',
      },
      other: {
        color: 'yellow.20',
        message: statusMessage ?? '',
      },
    };

    return obj[status ? 'available' : 'other'];
  }, [status, statusMessage]);

  const handleAddToCart = useCallback(() => {
    onAddToCard(id);
  }, [id, onAddToCard]);

  const handleAddToFavorite = useCallback(() => {
    onLike(id);
  }, [id, onLike]);

  return (
    <Card
      as={Link} // Todo: Update to later when I install react-router-dom
      href={`${id}`} // Todo: Update when the task above complete
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
              <Badge w={98} h={6} borderRadius={50} bg={badge.color} my={2}>
                <Center
                  h="full"
                  color="white"
                  fontWeight="regular"
                  textTransform="capitalize"
                  fontSize={14}
                >
                  {badge.message}
                </Center>
              </Badge>
            </Box>

            <HStack w="full">
              <Text flex={1} fontSize={20} fontWeight="bold">
                ${price}
              </Text>
              <HStack flex={1} justifyContent="space-between">
                <CartIcon onClick={handleAddToCart} />
                <HeartIcon
                  onClick={handleAddToFavorite}
                  variant={isLike ? 'fill' : 'outline'}
                />
              </HStack>
            </HStack>
          </VStack>
        </CardBody>
      </HStack>
    </Card>
  );
};

const areCompare = (prevProps: ProductCardProps, nextProps: ProductCardProps) =>
  isEqual(prevProps.info, nextProps.info);

export const ProductCard = memo(Component, areCompare);
