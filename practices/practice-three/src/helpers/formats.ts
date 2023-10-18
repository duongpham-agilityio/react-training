// Services
import { ProductPayload } from '@/services/apis';

// Types
import { TProductCard } from '@/components';
import { IProduct } from '@/interface';

// Constants
import { LIMIT_QUANTITY } from '@/constants';

// Data format is correct for the model
export const formatPayloadProduct = (
  product: Partial<ProductPayload>,
): Partial<ProductPayload> => {
  const { price, quantity } = product;

  if (price) product.price = Number(price);

  if (quantity) product.quantity = Number(quantity);

  return product;
};

export const formatProductCardProps = (product: IProduct): TProductCard => {
  const { id, imageURL, name, description, price, quantity, isLiked } = product;
  const isLessThanTwo = quantity < 2;

  const info: TProductCard = {
    id,
    imageURL,
    price,
    description,
    title: name,
    status: quantity <= LIMIT_QUANTITY,
    statusMessage: `Only ${quantity} ${isLessThanTwo ? 'left' : 'lefts'}`,
    isLiked,
  };

  return info;
};
