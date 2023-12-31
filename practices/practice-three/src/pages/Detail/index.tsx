import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// Hooks
import { useHandleCart, useToast } from '@/hooks';

// Services
import { productAPI } from '@/services/apis';

// Constants
import { MESSAGES, PARAM, ROUTES, TITLES } from '@/constants';

// Components
import { Spinner } from '@/components';
import { FetchingMessage } from '@/components/common';

// Images
import SocialImage from '@/assets/images/social.png';

// Icons
import { ArrowLeftOutline, ArrowRightOutline, Increase } from '@/assets/icons';

// Types
import { IProduct } from '@/interface';

const Component = (): JSX.Element => {
  // Toast
  const { showToast } = useToast();

  // Get params
  const params = useParams();

  //  Query data
  const { isLoading, isError, data } = useQuery({
    queryKey: [ROUTES.DETAIL, params[PARAM.PRODUCT]] as string[],
    queryFn: ({ queryKey: [, param] }: QueryFunctionContext<string[]>) =>
      productAPI.getById(+param),
  });

  //
  const { handleAddProductToCart } = useHandleCart();

  const handleAddToCart = useCallback(async () => {
    try {
      const product: IProduct | undefined = await productAPI.getById(
        Number(params[PARAM.PRODUCT]),
      );

      if (!product) return;

      const isAddSuccess: boolean = handleAddProductToCart(product);

      return showToast({
        title: TITLES.ADD,
        description: isAddSuccess
          ? MESSAGES.ADD_TO_CART_SUCCESS
          : MESSAGES.ADD_TO_CART_FAIL,
        status: isAddSuccess ? 'success' : 'error',
      });
    } catch (error) {
      showToast({
        title: TITLES.ERROR,
        description: MESSAGES.FAIL_TO_FETCH,
      });
    }
  }, [handleAddProductToCart, params, showToast]);

  if (isLoading) return <Spinner />;

  if (isError || !data)
    return <FetchingMessage message={MESSAGES.FAIL_TO_FETCH} />;

  //Destructure to get property
  const { name, description, price, imageURL } = data;

  return (
    <VStack
      h="full"
      backgroundImage={imageURL}
      backgroundPosition="center"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      justifyContent="space-between"
      alignItems="unset"
    >
      {/* Info */}
      <Flex flex={1} minH={250} justifyContent="flex-end">
        <Box maxW={448}>
          <Heading
            fontSize="7xl"
            py={{
              base: 2,
              '2xl': 6,
            }}
            fontWeight="regular"
          >
            {name}
          </Heading>
          <Text
            fontSize={{
              base: 'md',
              '2xl': 'xl',
            }}
            lineHeight={{
              base: 6,
              '2xl': 8,
            }}
            color="darkGrey30"
            noOfLines={4}
          >
            {description}
          </Text>
        </Box>
      </Flex>

      <Box h="fit-content">
        {/* Socials */}
        <Center justifyContent="space-between">
          <Text
            transform="rotate(-90deg)"
            textTransform="uppercase"
            fontWeight="regular"
            fontSize="md"
            letterSpacing={2}
          >
            Scroll down
          </Text>

          <Image src={SocialImage} />
        </Center>

        {/* Add to cart */}
        <HStack
          py={{
            base: 9,
            '2xl': 16,
          }}
          px={{
            base: 'unset',
            '2xl': 20,
          }}
          justifyContent="space-between"
        >
          {/* Slide control */}
          <Center>
            <Button
              height="fit-content"
              color="primary"
              display="flex"
              flexDirection="column"
            >
              <Text fontSize="lg" py={2} fontWeight="regular">
                Prev
              </Text>
              <ArrowLeftOutline />
            </Button>

            <Button
              height="fit-content"
              color="primary"
              display="flex"
              flexDirection="column"
            >
              <Text fontSize="lg" py={2} fontWeight="regular">
                Next
              </Text>
              <ArrowRightOutline />
            </Button>
          </Center>

          <Flex alignItems="center" gap={5}>
            <IconButton
              aria-label="Button play video"
              bg="gray.100"
              borderRadius="full"
              size="lg"
              icon={<Increase />}
            />
            <Text fontSize="lg" fontWeight="regular" color="darkGrey40">
              Play video
            </Text>
          </Flex>

          <Button
            color="primary"
            textTransform="uppercase"
            _hover={{
              color: 'darkGrey30',
            }}
            p="unset"
            onClick={handleAddToCart}
          >
            add to cart — ${price}
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

const Detail = memo(Component);

export default Detail;
