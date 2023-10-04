import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { ChangeEvent, memo, useCallback } from 'react';

export interface InputFormProps extends Omit<InputProps, 'onChange'> {
  isError?: boolean;
  label?: string;
  errorMessage?: string;
  onChange: (value: string, name?: string) => void;
}

export const InputForm = memo(
  ({
    isError = false,
    label,
    errorMessage,
    onChange,
    ...props
  }: InputFormProps) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const el: HTMLInputElement = e.target;
        onChange(el.value, el.name ?? '');
      },
      [onChange],
    );

    return (
      <FormControl isInvalid={isError}>
        {label && <FormLabel>{label}</FormLabel>}
        <Input {...props} onChange={handleChange} />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  },
);
