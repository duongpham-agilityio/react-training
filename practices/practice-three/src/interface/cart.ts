import { IProduct } from './product';

export interface ICartData
  extends Pick<
    IProduct,
    'imageURL' | 'name' | 'description' | 'price' | 'quantity'
  > {
  productId: number;
}

export interface ICart {
  id: number;
  userId: number;
  productId: number;
}
