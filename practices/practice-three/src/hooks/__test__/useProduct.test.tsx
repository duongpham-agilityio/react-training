import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';
import { renderHook } from '@testing-library/react';

// Hooks
import { useProduct } from '..';

// Types
import { IFormAddData } from '@/pages/Profile/components/FormAdd';

// Mocks

// Services
import { apiRequest } from '@/services/configs';

const mock: IFormAddData = {
  imageURL:
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d455e5b6-23e9-4f06-8b86-32610d838937/renew-run-3-road-running-shoes-395S7c.png',
  name: 'Nike React Miler',
  description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage',
  category: 'books',
  id: 1,
  price: 1000,
  quantity: 10,
};

const wrapper = ({ children }: { children: ReactElement }) => {
  const query: QueryClient = new QueryClient();

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};

const setup = () =>
  renderHook(useProduct, {
    wrapper: wrapper as any,
  });

jest.mock('@/services/configs');

describe('useProduct', () => {
  it('onAddProduct', async () => {
    (apiRequest.post as jest.Mock).mockResolvedValue('');
    const { result } = setup();
    const res = await result.current.onAddProduct(mock);

    expect(res).toBeTruthy();
  });

  it('onUpdateProduct', async () => {
    (apiRequest.patch as jest.Mock).mockResolvedValue('');
    const { result } = setup();
    const res = await result.current.onUpdateProduct(mock.id, { price: 10 });

    expect(res).toBeTruthy();
  });

  it('onRemoveProduct', async () => {
    (apiRequest.delete as jest.Mock).mockResolvedValue('');
    const { result } = setup();

    await (async () => {
      const res = await result.current.onRemoveProduct(mock.id);

      console.log(res);
    });
  });
});
