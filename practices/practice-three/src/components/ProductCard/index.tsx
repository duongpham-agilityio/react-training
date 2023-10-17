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
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo, useCallback, useMemo, MouseEvent } from 'react';
import isEqual from 'react-fast-compare';
import { Link } from 'react-router-dom';

// Constants
import { ROUTES } from '@/constants';

// Icons
import { CartOutline, HeartFill, HeartOutline } from '@/assets/icons';

export type TProductCard = {
  id: number;
  imageURL: string;
  title: string;
  description: string;
  status: boolean;
  statusMessage?: string;
  price: number;
  isLiked?: boolean;
};

type TBadgeData = {
  color: string;
  message: string;
};

type TBadge = {
  available: TBadgeData;
  other: TBadgeData;
};

export type TProductCardProps = {
  info: TProductCard;
  renderIcon?: () => JSX.Element;
  onAddToCart?: (id: number) => void | Promise<void>;
  onLike?: (id: number) => void | Promise<void>;
};

const Component = (props: TProductCardProps): JSX.Element => {
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
    renderIcon,
    onAddToCart,
    onLike,
  } = props;

  const badge: TBadgeData = useMemo((): TBadgeData => {
    const obj: TBadge = {
      available: {
        color: 'successToLight',
        message: 'available',
      },
      other: {
        color: 'warning',
        message: statusMessage ?? '',
      },
    };

    return obj[!status ? 'available' : 'other'];
  }, [status, statusMessage]);

  const handleAddToCart = useCallback(
    (e: MouseEvent): void => {
      e.preventDefault();

      onAddToCart && onAddToCart(id);
    },
    [id, onAddToCart],
  );

  const handleAddToFavorite = useCallback(
    (e: MouseEvent): void => {
      e.preventDefault();

      onLike && onLike(id);
    },
    [id, onLike],
  );

  return (
    <Card
      as={Link}
      to={`/${ROUTES.DETAIL}/${id}`}
      h={327}
      boxShadow="lg"
      _hover={{
        boxShadow: '2xl',
        transition: '0.3s linear',
        textDecoration: 'none',
      }}
    >
      <HStack h="full" gap="unset" borderRadius="inherit" overflow="hidden">
        <Center w="50%" h="full" bg="darkToLight">
          <Image src={imageURL} w="full" alt={title} />
        </Center>
        <CardBody w="50%" px={6} py={7} h="full">
          <VStack h="full" justifyContent="space-between">
            <Box width="full">
              <Heading fontSize="2xl" color="dark">
                {title}
              </Heading>
              <Text fontWeight="regular" fontSize="md" noOfLines={3}>
                {description}
              </Text>
              <Badge minW={98} h={6} borderRadius="3xl" bg={badge.color} my={2}>
                <Center
                  h="full"
                  color="white"
                  fontWeight="regular"
                  textTransform="capitalize"
                  fontSize="sm"
                  px={2}
                >
                  {badge.message}
                </Center>
              </Badge>
            </Box>

            <HStack w="full" justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">
                ${price}
              </Text>
              <HStack justifyContent="space-between">
                {renderIcon ? (
                  renderIcon()
                ) : (
                  <>
                    <IconButton
                      aria-label="Button add to cart"
                      icon={<CartOutline />}
                      onClick={handleAddToCart}
                    />
                    <IconButton
                      minW="60px"
                      aria-label="Button add to favorite"
                      icon={isLiked ? <HeartFill /> : <HeartOutline />}
                      onClick={handleAddToFavorite}
                    />
                  </>
                )}
              </HStack>
            </HStack>
          </VStack>
        </CardBody>
      </HStack>
    </Card>
  );
};

export const ProductCard = memo(Component, isEqual);
