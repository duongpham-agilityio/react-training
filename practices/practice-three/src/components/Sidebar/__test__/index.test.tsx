import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import React from 'react';
// import * as ChakraUI from '@chakra-ui/react';

// Components
import { SideBar } from '..';
import { ReactNode } from 'react';

const query: QueryClient = new QueryClient();

const setup = () =>
  render(
    <BrowserRouter>
      <QueryClientProvider client={query}>
        <SideBar />
      </QueryClientProvider>
    </BrowserRouter>,
  );

describe('Sidebar', () => {
  beforeEach(() => {
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      lazy: (callback: () => any) => callback(),
      Suspense: ({ children }: { children: ReactNode }) => children,
    }));
  });

  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Show full sidebar', () => {
    const { getAllByRole, getByText } = setup();

    act(() => {
      fireEvent.click(getAllByRole('button')[2]);
    });

    expect(getByText('Wishlist')).toBeDefined();
  });

  it('Click show wishlist option', async () => {
    const { getAllByRole, getByText } = setup();

    await act(() => {
      fireEvent.click(getAllByRole('button')[0]);
    });

    expect(getByText('Wishlist')).toBeDefined();
  });

  it('Click show cart option', async () => {
    const { getAllByRole, getAllByText } = setup();

    await act(() => {
      fireEvent.click(getAllByRole('button')[1]);
    });

    expect(getAllByText('Checkout').length).toBe(2);
  });
});
