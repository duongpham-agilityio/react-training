import {
  Badge,
  Box,
  Card,
  CardBody,
  Center,
  HStack,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo, useCallback, useMemo, MouseEvent } from 'react';
import isEqual from 'react-fast-compare';
import { CartOutline, HeartFill, HeartOutline } from '@/assets/icons';

// Components

// Todo: Update to later
export interface IProductCard {
  id: number;
  imageURL: string;
  title: string;
  description: string;
  status: boolean;
  statusMessage?: string;
  price: number;
  isLiked?: boolean;
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
      isLiked,
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

  const handleAddToCart = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      onAddToCard(id);
    },
    [id, onAddToCard],
  );

  const handleAddToFavorite = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      onLike(id);
    },
    [id, onLike],
  );

  return (
    <Card
      as={Link} // Todo: Update to later when I install react-router-dom
      href={`${id}`} // Todo: Update when the task above complete
      h={327}
      borderRadius={25}
      boxShadow="lg"
      _hover={{
        boxShadow: '2xl',
        transition: '0.3s linear',
        textDecoration: 'none',
      }}
    >
      <HStack h="full" gap="unset" borderRadius="inherit" overflow="hidden">
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
                <IconButton
                  aria-label="Button add to cart"
                  icon={<CartOutline />}
                  onClick={handleAddToCart}
                />
                <IconButton
                  aria-label="Button add to favorite"
                  icon={isLiked ? <HeartFill /> : <HeartOutline />}
                  onClick={handleAddToFavorite}
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
