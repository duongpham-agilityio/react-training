import { renderHook } from '@testing-library/react';

// Hooks
import { useHandleCart } from '..';

// Types
import { IProduct } from '@/interface';

// Services
import { apiRequest } from '@/services/configs';
import { MESSAGES } from '@/constants';

const setup = () => renderHook(useHandleCart);

jest.mock('@/services/configs');

describe('useCart(Add to cart)', () => {
  it('add new', () => {
    const { result } = setup();
    const { handleAddProductToCart } = result.current;

    // Add new
    // Success
    const successData: IProduct = { id: 1, quantity: 9 } as IProduct;
    const successResult = handleAddProductToCart(successData);

    expect(successResult).toBeTruthy();

    // Failed
    const failedData: IProduct = { id: 1, quantity: 0 } as IProduct;
    const failedResult = handleAddProductToCart(failedData);

    expect(failedResult).toBeFalsy();
  });

  it('update quantity', () => {
    const { result } = setup();
    const { handleAddProductToCart } = result.current;

    // Update quantity
    const successData: IProduct = { id: 1, quantity: 9 } as IProduct;
    const successResult = handleAddProductToCart(successData);

    expect(successResult).toBeTruthy();

    const failedData: IProduct = { id: 1, quantity: 1 } as IProduct;
    const failedResult = handleAddProductToCart(failedData);

    expect(failedResult).toBeFalsy();
  });
});

describe('useCart(Remove)', () => {
  it('Add new', () => {
    const { result } = setup();
    const { handleAddProductToCart } = result.current;

    const successData: IProduct = { id: 1, quantity: 9 } as IProduct;
    const successResult = handleAddProductToCart(successData);

    expect(successResult).toBeTruthy();
  });

  it('Remove', () => {
    const { result } = setup();
    const { handleRemove } = result.current;
    const successResult = handleRemove(1);

    expect(successResult).toBeTruthy();
  });
});

describe('useCart(Change quantity)', () => {
  it('add new', () => {
    const { result } = setup();
    const { handleAddProductToCart } = result.current;

    const successData: IProduct = { id: 1, quantity: 9 } as IProduct;
    const successResult = handleAddProductToCart(successData);

    expect(successResult).toBeTruthy();
  });

  it('update quantity (success)', () => {
    (apiRequest.get as jest.Mock).mockResolvedValue({
      data: {
        price: 10,
        quantity: 9,
        id: 1,
      },
    });
    const { result } = setup();
    const { handleQuantity } = result.current;

    // Update quantity
    const successResult = handleQuantity(1, 1);

    expect(successResult).toBeTruthy();
  });

  it('update quantity (invalid  quantity)', async () => {
    (apiRequest.get as jest.Mock).mockResolvedValue({
      data: {
        price: 10,
        quantity: 0,
        id: 1,
      },
    });
    const { result } = setup();
    const { handleQuantity } = result.current;

    // Update quantity
    const failedResult = await handleQuantity(1, 1);

    expect(failedResult.message).toBe(MESSAGES.CHANGE_QUANTITY_ERROR);
  });

  it('update quantity (product is null)', async () => {
    (apiRequest.get as jest.Mock).mockResolvedValue({
      data: undefined,
    });
    const { result } = setup();
    const { handleQuantity } = result.current;

    // Update quantity
    const failedResult = await handleQuantity(1, 1);

    expect(failedResult.isError).toBeTruthy();
  });
});

describe('useCart(Checkout)', () => {
  it('Success', () => {
    (apiRequest.get as jest.Mock).mockResolvedValue({
      data: [
        {
          quantity: 10,
          id: 1,
        },
      ],
    });
    (apiRequest.patch as jest.Mock).mockResolvedValue({ data: 'success' });
    const { result } = setup();
    const { handleCheckout } = result.current;

    handleCheckout();
  });
});
