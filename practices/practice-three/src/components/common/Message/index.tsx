import { Center, Square, Text } from '@chakra-ui/react';
import { memo } from 'react';

export type TMessageProps = {
  message: string;
};

export const Message = memo(({ message }: TMessageProps) => (
  <Center>
    <Text fontSize="lg" fontWeight="bold">
      {message}
    </Text>
  </Center>
));

export const FetchingMessage = memo(({ message }: TMessageProps) => (
  <Square size="full">
    <Text>{message}</Text>
  </Square>
));
