import { fireEvent, render } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  // useMutation,
} from '@tanstack/react-query';

// Components
import Cart from '..';

// Hooks
import { useCartStore } from '@/hooks';

// Mocks
import { cartItemProps, products } from '@/mocks';

//Services
import { productAPI } from '@/services/apis';

const queryClient: QueryClient = new QueryClient();

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
}));

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Cart />
    </QueryClientProvider>,
  );

describe('Cart', () => {
  beforeEach(() => {
    useCartStore.setState({
      data: [
        {
          ...cartItemProps.data,
          productId: 1,
          quantity: 2,
        },
        {
          ...cartItemProps.data,
          productId: 2,
        },
      ],
    });
  });

  it('Render', () => {
    (useMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutate: jest.fn(),
    });
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Remove one product', () => {
    (useMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutate: jest.fn(),
    });
    const { container } = setup();
    const trashButtons = container.querySelectorAll(
      'button[aria-label="Button remove from cart"]',
    );

    expect(useCartStore.getState().data.length).toBe(2);

    fireEvent.click(trashButtons[0]);

    expect(useCartStore.getState().data.length).toBe(1);
  });

  // !Issues: can not expect
  it('Change quantity', () => {
    jest
      .spyOn(productAPI, 'getById')
      .mockResolvedValue({ ...products[0], id: 1 });
    (useMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutate: jest.fn(),
    });
    const { container } = setup();
    const changeButtons = container.querySelectorAll(
      'button[aria-label="Button increase quantity"]',
    );

    fireEvent.click(changeButtons[0]);
  });

  //  !Can not test
  it('Checkout', () => {
    jest.clearAllMocks();
    const mock = jest.fn();
    jest.spyOn(productAPI, 'getAll').mockResolvedValue(products);
    jest
      .spyOn(productAPI, 'update')
      .mockResolvedValue({ ...products[0], id: 1 });
    (useMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutate: mock,
    });
    const { container } = setup();
    const buttons = container.querySelectorAll('button');

    fireEvent.click(buttons[buttons.length - 1]);
  });
});
