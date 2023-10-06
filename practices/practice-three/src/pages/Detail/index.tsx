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
import { memo } from 'react';

// Images
import ShoesImage from '@/assets/images/shoes.png';
import SocialImage from '@/assets/images/social.png';

// Icons
import { ArrowLeftOutline, ArrowRightOutline, Increase } from '@/assets/icons';

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
      <Flex flex={1} minH={250} justifyContent="flex-end">
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
              color="black"
              display="flex"
              flexDirection="column"
            >
              <Text fontSize={18} py={2} fontWeight="regular">
                Prev
              </Text>
              <ArrowLeftOutline />
            </Button>

            <Button
              height="fit-content"
              color="black"
              display="flex"
              flexDirection="column"
            >
              <Text fontSize={18} py={2} fontWeight="regular">
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
            <Text fontSize={18} fontWeight="regular" color="gray.30">
              Play video
            </Text>
          </Flex>

          <Button
            color="black"
            textTransform="uppercase"
            _hover={{
              color: 'gray.20',
            }}
            p="unset"
          >
            add to cart — $1599
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

const Detail = memo(Component);

export default Detail;
