import { fireEvent, render } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Components
import Detail from '..';

// Mocks
import { products } from '@/mocks';

// Constants
import { MESSAGES } from '@/constants';
import { productAPI } from '@/services/apis';
import { IProduct } from '@/interface';

jest.mock('@/assets/images/shoes.png', () => ({
  default: '@/assets/images/shoes.png',
}));
jest.mock('@/assets/images/social.png', () => ({
  default: '@/assets/images/social.png',
}));

const queryClient: QueryClient = new QueryClient();

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const setup = () =>
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Detail />
      </QueryClientProvider>
    </BrowserRouter>,
  );

describe('Details page', () => {
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
  it('Match to snapshot', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: products[0],
    });
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Handle add product (valid)', () => {
    jest.spyOn(productAPI, 'getById').mockResolvedValue(products[0]);
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: products[0],
    });

    const { container } = setup();
    const buttons = container.querySelectorAll('button');
    const button = buttons[buttons.length - 1];
    const mockEvent = jest.fn();

    button.addEventListener('click', mockEvent);

    fireEvent.click(button);

    expect(mockEvent).toBeCalled();
  });

  it('Handle add product (undefine)', () => {
    jest
      .spyOn(productAPI, 'getById')
      .mockResolvedValue(undefined as unknown as IProduct);
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: products[0],
    });

    const { container } = setup();
    const buttons = container.querySelectorAll('button');
    const button = buttons[buttons.length - 1];
    const mockEvent = jest.fn();

    button.addEventListener('click', mockEvent);

    fireEvent.click(button);
  });

  it('Handle add product reject', () => {
    jest
      .spyOn(productAPI, 'getById')
      .mockRejectedValue(undefined as unknown as IProduct);
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: products[0],
    });

    const { container } = setup();
    const buttons = container.querySelectorAll('button');
    const button = buttons[buttons.length - 1];
    const mockEvent = jest.fn();

    button.addEventListener('click', mockEvent);

    fireEvent.click(button);
  });
});
