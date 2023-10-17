import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';

// Hooks
import { useProducts } from '..';

// Services
import { apiRequest } from '@/services/configs';

const wrapper = ({ children }: { children: ReactElement }) => {
  const query: QueryClient = new QueryClient();

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};

const setup = () =>
  renderHook(useProducts, {
    wrapper: wrapper as any,
  });

jest.mock('@/services/configs');

describe('useProduct', () => {
  it('fetch', async () => {
    (apiRequest.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    });

    const { result } = setup();

    await waitFor(() => expect(result.current.data?.length).toBe(2));
  });
});
