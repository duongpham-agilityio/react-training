import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo } from 'react';

// Images
import ShoesImage from '@/assets/images/shoes.png';
import SocialImage from '@/assets/images/social.png';

const Component = (): JSX.Element => {
  // Todo: Update handle to late

  return (
    <VStack
      h="full"
      backgroundImage={ShoesImage}
      backgroundPosition="center"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      justifyContent="space-between"
      alignItems="unset"
    >
      {/* Info */}
      <Flex flex={1} minH={250}>
        <Box flex={1}></Box>
        <Box maxW={448}>
          <Heading
            fontSize={50}
            py={{
              base: 2,
              '2xl': 6,
            }}
            fontWeight="regular"
          >
            HUNK - Toffee
          </Heading>
          <Text
            fontSize={{
              base: 16,
              '2xl': 20,
            }}
            lineHeight={{
              base: 6,
              '2xl': 8,
            }}
            color="gray.20"
          >
            Add a spring to your step with this elegant and sleek pair of
            footwear! With its heavily padded ankle straps for secure footing
            and matted steel buckles that add flair, support and style go hand
            in hand with these hunk sandals
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
            fontSize={16}
            letterSpacing={2}
          >
            Scroll down
          </Text>

          <Image src={SocialImage} />
        </Center>

        {/* Add to cart */}
        <Flex
          py={{
            base: 8,
            '2xl': 16,
          }}
          px={{
            base: 'unset',
            '2xl': 20,
          }}
          justifyContent="flex-end"
        >
          <Button
            color="black"
            textTransform="uppercase"
            _hover={{
              color: 'gray.20',
            }}
          >
            add to cart — $1599
          </Button>
        </Flex>
      </Box>
    </VStack>
  );
};

const Detail = memo(Component);

export default Detail;
