import { FormEvent, useCallback, useState } from 'react';

type TFormData<T> = T & { [key: string]: string };
type TSubmitCallback = () => void;
type TUseForm<T> = {
  formData: TFormData<T>;
  onChange: (value: string, name: string) => void;
  onSubmit: (callback: TSubmitCallback) => void;
};

export const useForm = <T>(value: TFormData<T>): TUseForm<T> => {
  const [formData, setFormData] = useState<TFormData<T>>(value);

  const onChange = useCallback(
    (value: string, name: string) =>
      setFormData((prev) => ({ ...prev, [name]: value })),
    [],
  );

  const onSubmit = useCallback((callback: TSubmitCallback) => {
    return (e: FormEvent) => {
      e.preventDefault();

      callback();
    };
  }, []);

  return {
    formData,
    onChange,
    onSubmit,
  };
};
