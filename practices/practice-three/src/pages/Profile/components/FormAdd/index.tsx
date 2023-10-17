import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spinner,
  Square,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

// Hooks
import { useForm } from '@/hooks';

// Components
import { InputForm } from '@/components/common';

// Types
import { IProduct } from '@/interface';

// Mocks
import { filterOptions } from '@/mocks';

// Services
import { uploadImage } from '@/services/apis';

// Helpers
import { isEmpty } from '@/helpers';

export type IFormAddData = Omit<
  IProduct,
  'isLiked' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface FormAddProps {
  data?: IFormAddData;
  onSubmit: (product: IFormAddData, id?: number) => void;
}

const initData: IFormAddData = {
  id: 0,
  name: '',
  category: filterOptions[1].value,
  description: '',
  imageURL: '',
  price: 0,
  quantity: 0,
};

const FormAddComponent = ({
  data = initData,
  onSubmit,
}: FormAddProps): JSX.Element => {
  const { formData, onChange } = useForm<IFormAddData>(data);
  const [error, setError] = useState<Partial<IFormAddData>>();
  const { isLoading: isUpload, mutate } = useMutation({
    mutationFn: (file: FormData) => uploadImage(file),
  });

  const handleChangeInputForm = useCallback(
    (value: string, key = 'name'): void => {
      onChange(value, key);
    },
    [onChange],
  );

  const handleChangeForm = useCallback(
    <T extends HTMLElement>(e: ChangeEvent<T>): void => {
      const element: T & HTMLInputElement = e.target as T & HTMLInputElement;
      const key: string = element.name;
      const value: string = element.value;

      onChange(value, key);
    },
    [onChange],
  );

  const handleChangeImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const files = e.target.files;

      if (!files) return;

      const data = new FormData();
      const file = files[0];

      data.append('image', file);
      mutate(data, {
        onSuccess: (data: string) => onChange(data, 'imageURl'),
      });
    },
    [mutate, onChange],
  );

  const handleSubmit = useCallback(() => {
    const checkValue: Partial<IFormAddData> = { ...formData, id: 0 };
    delete checkValue.id;

    const [isInvalid, err] = isEmpty(checkValue);

    if (isInvalid) {
      return setError(err);
    }

    onSubmit(formData, formData.id);
  }, [formData, onSubmit]);

  return (
    <VStack h="full" justifyContent="space-between" overflowY="scroll" px={5}>
      <VStack w="full" gap={5}>
        <Box w="full" minH={90} flex={1}>
          <InputForm
            value={formData.name}
            isError={!!error?.name}
            errorMessage={error?.name}
            w="full"
            flex={1}
            label="Product name"
            name="name"
            placeholder="Please enter product name"
            onChange={handleChangeInputForm}
          />
        </Box>

        <Flex w="full" gap={15} minH={90}>
          <InputForm
            isError={!!error?.price}
            errorMessage={`${error?.price}`}
            value={formData.price}
            flex={1}
            type="number"
            label="Price"
            name="price"
            placeholder="Please enter price"
            onChange={handleChangeInputForm}
          />
          <InputForm
            isError={!!error?.quantity}
            errorMessage={`${error?.quantity}`}
            value={formData.quantity}
            flex={1}
            type="number"
            label="Quantity"
            name="quantity"
            placeholder="Please enter quantity"
            onChange={handleChangeInputForm}
          />
        </Flex>

        <FormControl w="full" minH={90} isInvalid={!!error?.category}>
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            placeholder="Select option"
            value={formData.category}
            onChange={handleChangeForm}
          >
            {filterOptions.slice(1).map((option) => {
              const { value, name } = option;

              return (
                <option key={value} value={value}>
                  {name}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>{error?.category}</FormErrorMessage>
        </FormControl>

        <Flex
          minH={90}
          w="full"
          justifyContent="center"
          alignItems="center"
          gap={15}
        >
          <Square
            size={{
              base: 120,
              '2xl': 200,
            }}
            borderRadius="sm"
            borderStyle="dotted"
            borderWidth={2}
            fontSize="sm"
            position="relative"
            bgImg={formData.imageURL}
            bgPosition="center"
            bgSize="cover"
            borderColor={error?.imageURL ? 'red' : 'gray.200'}
            _hover={{
              cursor: 'pointer',
              boxShadow: 'base',
            }}
          >
            {isUpload ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              !formData.imageURL && <Text>Select image</Text>
            )}
            <Input
              w="full"
              h="full"
              position="absolute"
              type="file"
              accept="image/*"
              opacity={0}
              onChange={handleChangeImage}
            />
          </Square>

          <VStack
            as={FormControl}
            flex={1}
            alignItems="flex-start"
            h="full"
            isInvalid={!!error?.description}
          >
            <FormLabel textAlign="left">Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              h="full"
              placeholder="Please enter description"
              resize="none"
              onChange={handleChangeForm}
            />
            <FormErrorMessage>{error?.description}</FormErrorMessage>
          </VStack>
        </Flex>
      </VStack>

      <Button
        w="full"
        color="primary"
        bg="teal.300"
        mt={10}
        py={5}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </VStack>
  );
};

const FormAdd = memo(FormAddComponent);

export default FormAdd;
