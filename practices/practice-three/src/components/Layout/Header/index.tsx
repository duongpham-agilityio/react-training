import { Center, Image, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

// Constants
import { ROUTES } from '@/constants';

// Images
import { Shoes } from '@/assets/images';

export const Header = memo(
  (): JSX.Element => (
    <Center
      as={Link}
      py={2}
      gap={3}
      to={ROUTES.ROOT}
      w="full"
      justifyContent="flex-start"
    >
      <Image
        w={45}
        h={45}
        src={Shoes}
        objectFit="cover"
        borderRadius="sm"
        alt="Logo for website"
      />
      <Text fontSize="lg" letterSpacing={2}>
        My Site
      </Text>
    </Center>
  ),
);
