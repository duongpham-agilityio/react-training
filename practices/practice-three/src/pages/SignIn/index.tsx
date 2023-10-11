import {
  Box,
  Button,
  Center,
  Heading,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo, useCallback, useState } from 'react';

// HOCs
import { withIsUnAuth } from '@/hocs';

// Hooks
import { useHandleAuth } from '@/hooks';

// Components
import { InputForm } from '@/components/common';

export interface IFormData {
  email: string;
  password: string;
}

const Component = () => {
  const { error, onLogin } = useHandleAuth<IFormData>();
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
  });

  const onChange = useCallback((value: string, name?: string) => {
    const key = (name ?? '') as keyof IFormData;

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleLogin = useCallback(async () => {
    const { email, password } = formData;

    onLogin(email, password);
  }, [formData, onLogin]);

  return (
    <Square bg="yellow.20" minH="100vh">
      <Box
        w={475}
        h={550}
        borderRadius={20}
        p={18}
        boxShadow="base"
        bg="white"
        alignItems="unset"
      >
        {/* Heading */}
        <Center h="fit-content" gap={2} py={6}>
          <Box w="1.5" h={39} bg="yellow.10" />
          <Heading fontSize={32}>CRUD OPERATIONS</Heading>
        </Center>

        {/* Title */}
        <Box textAlign="center" py={4}>
          <Heading fontSize={22} py={1}>
            Sign In
          </Heading>
          <Text color="gray.20" fontSize={14} fontWeight="regular">
            Enter your credentials to access your account
          </Text>
        </Box>

        {/* Input Form  */}
        <VStack py={10} gap={5}>
          <InputForm
            isError={!!error['email']}
            errorMessage={error['email']}
            value={formData.email}
            label="Email"
            name="email"
            placeholder="Please enter your email"
            onChange={onChange}
          />
          <InputForm
            isError={!!error['password']}
            errorMessage={error['password']}
            value={formData.password}
            type="password"
            name="password"
            label="Password"
            placeholder="Please enter your password"
            onChange={onChange}
          />
        </VStack>

        {/* Submit */}
        <Button
          w="full"
          bg="yellow.20"
          textTransform="uppercase"
          fontWeight="regular"
          fontSize={14}
          _hover={{
            boxShadow: 'base',
          }}
          onClick={handleLogin}
        >
          Sign in
        </Button>
      </Box>
    </Square>
  );
};

const SignIn = memo(withIsUnAuth(Component));

export default SignIn;
