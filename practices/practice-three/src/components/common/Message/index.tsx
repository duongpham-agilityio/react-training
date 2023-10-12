import { Center, Text } from '@chakra-ui/react';
import { memo } from 'react';

export const Message = memo(({ message }: { message: string }) => (
  <Center>
    <Text fontSize={18} fontWeight="bold">
      {message}
    </Text>
  </Center>
));
