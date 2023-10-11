interface IMessages {
  EMPTY: string;
  EMPTY_FILED: string;
  FAIL_TO_FETCH: string;
  ADD_TO_CART_SUCCESS: string;
  ADD_TO_CART_FAIL: string;
  REMOVE_FORM_CART_SUCCESS: string;
  REMOVE_FORM_CART_FAIL: string;
  CHANGE_QUANTITY_ERROR: string;
  EMAIL_NOT_CORRECT: string;
  AUTH_INCORRECT: string;
}

export const MESSAGES: Readonly<IMessages> = {
  EMPTY: 'No data',
  EMPTY_FILED: 'Please fill in this field',
  FAIL_TO_FETCH: 'Something went wrong!! Please reload page.',
  ADD_TO_CART_SUCCESS: 'Add to cart successful!',
  ADD_TO_CART_FAIL: 'Add to cart fail!',
  REMOVE_FORM_CART_SUCCESS: 'Remove from cart successful!',
  REMOVE_FORM_CART_FAIL: 'Remove from cart fail!',
  CHANGE_QUANTITY_ERROR: 'Quantity cannot be changed',
  EMAIL_NOT_CORRECT: 'Email is not in correct format',
  AUTH_INCORRECT: 'Email or Password is incorrect',
};
