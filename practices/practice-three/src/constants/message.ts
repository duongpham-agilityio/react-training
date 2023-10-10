interface IMessages {
  EMPTY: string;
  FAIL_TO_FETCH: string;
  ADD_TO_CART_SUCCESS: string;
  ADD_TO_CART_FAIL: string;
  REMOVE_FORM_CART_SUCCESS: string;
  REMOVE_FORM_CART_FAIL: string;
}

export const MESSAGES: Readonly<IMessages> = {
  EMPTY: 'No data',
  FAIL_TO_FETCH: 'Something went wrong!! Please reload page.',
  ADD_TO_CART_SUCCESS: 'Add to cart successful!',
  ADD_TO_CART_FAIL: 'Add to cart fail!',
  REMOVE_FORM_CART_SUCCESS: 'Remove from cart successful!',
  REMOVE_FORM_CART_FAIL: 'Remove from cart fail!',
};
