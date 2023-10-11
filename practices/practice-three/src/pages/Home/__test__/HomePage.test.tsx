import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

// Components
import HomePage from '..';

// Mocks
import { products } from '@/mocks';

// Constants
import { MESSAGES } from '@/constants';

const queryClient: QueryClient = new QueryClient();

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </QueryClientProvider>,
  );

describe('Home page', () => {
  it('Match to snapshot', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: products,
    });
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('With Loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    const { getByText } = setup();

    expect(getByText('Loading...')).toBeDefined();
  });

  it('With Error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isError: true,
    });
    const { getByText } = setup();

    expect(getByText(MESSAGES.FAIL_TO_FETCH)).toBeDefined();
  });

  it('Change filter', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: products,
    });
    const { container, getByPlaceholderText } = setup();

    expect(container).toMatchSnapshot();

    const input: HTMLInputElement = getByPlaceholderText(
      'Search',
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'abcd',
        },
      });
    });

    expect(input.value).toBe('abcd');
  });

  it('Add to cart', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: products,
    });
    const { container } = setup();
    const buttons = container.querySelectorAll(
      'button[aria-label="Button add to cart"]',
    );
    const button = buttons[0];
    const mock = jest.fn();

    button.addEventListener('click', mock);

    fireEvent.click(button);

    expect(mock).toBeCalled();
  });

  it('Add to wishlist', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: products,
    });
    const { container } = setup();
    const buttons = container.querySelectorAll(
      'button[aria-label="Button add to favorite"]',
    );
    const button = buttons[0];
    const mock = jest.fn();

    button.addEventListener('click', mock);

    fireEvent.click(button);

    expect(mock).toBeCalled();
  });
});
