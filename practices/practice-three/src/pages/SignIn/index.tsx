import {
  Box,
  Button,
  Center,
  Heading,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// HOCs
import { withIsUnAuth } from '@/hocs';

// Hooks
import { useForm, useHandleAuth } from '@/hooks';

// Stores
import { TAuthStore, useAuthStore } from '@/stores';

// Constants
import { ROUTES } from '@/constants';

// Components
import { InputForm } from '@/components/common';

export interface IFormData {
  email: string;
  password: string;
}

const Component = () => {
  const { formData, onChange } = useForm<IFormData>({
    email: '',
    password: '',
  });
  const { error, onLogin } = useHandleAuth<IFormData>();
  const setAuth = useAuthStore((state: TAuthStore) => state.setIsAuth);
  const redirect = useNavigate();

  const handleChangeValue = useCallback(
    (value: string, name?: string) => {
      const key = (name ?? 'name') as keyof IFormData;

      onChange(value, key);
    },
    [onChange],
  );

  const handleVerifySuccessFull = useCallback(() => {
    setAuth();
    redirect(ROUTES.ROOT, { replace: true });
  }, [redirect, setAuth]);

  const handleLogin = useCallback(async () => {
    onLogin(formData, handleVerifySuccessFull);
  }, [formData, handleVerifySuccessFull, onLogin]);

  // !ISSUES: Because it is currently being re-render, I must use useMemo to remember
  const renderFormHeader = useMemo(
    () => (
      <>
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
      </>
    ),
    [],
  );

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
        {renderFormHeader}

        {/* Input Form  */}
        <VStack py={10} gap={5}>
          <InputForm
            isError={!!error['email']}
            errorMessage={error['email']}
            value={formData.email}
            label="Email"
            name="email"
            placeholder="Please enter your email"
            onChange={handleChangeValue}
          />
          <InputForm
            isError={!!error['password']}
            errorMessage={error['password']}
            value={formData.password}
            type="password"
            name="password"
            label="Password"
            placeholder="Please enter your password"
            onChange={handleChangeValue}
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
