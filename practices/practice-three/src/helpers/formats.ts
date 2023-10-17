import { ProductPayload } from '@/services/apis';

// Data format is correct for the model
export const formatPayloadProduct = (
  product: Partial<ProductPayload>,
): Partial<ProductPayload> => {
  const { price, quantity } = product;

  if (price) product.price = Number(price);

  if (quantity) product.quantity = Number(quantity);

  return product;
};
