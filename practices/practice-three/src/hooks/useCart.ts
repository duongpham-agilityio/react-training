import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
import { ICartData, IProduct } from '@/interface';

export interface IUseCartStore {
  data: ICartData[];
  handleAddToCart: (product: ICartData) => void;
}

export interface IUseCart {
  data: ICartData[];
  handleAddToCart: (product: IProduct) => boolean;
}

export type Selector<T> = (state: IUseCartStore) => T;

//  Cart store
const useCartStore = create(
  persist<IUseCartStore>(
    (set) => ({
      data: [],
      handleAddToCart: (product: ICartData): void =>
        set((state) => ({ data: [...state.data, product] })),
    }),
    {
      name: 'cart',
    },
  ),
);

export const useCart = () => {
  const handleAddToCartStore = useCartStore(
    (state: IUseCartStore) => state.handleAddToCart,
  );

  const cart: ICartData[] = useCartStore(
    (state: IUseCartStore): ICartData[] => state.data,
  );

  console.log('Outside callback (cart)', cart);

  const onAddToCart = (product: IProduct): boolean => {
    const { id, description, imageURL, name, price, quantity } = product;

    console.log('Inside callback', cart);
    console.log('Inside callback (get)', useCartStore.getState().data);

    // Check Product exists from cart store
    const isExist: ICartData | undefined = cart.find(
      (item) => item.productId === id,
    );

    if (!isExist) {
      const newRecord: ICartData = {
        productId: id,
        quantity: 1,
        description,
        imageURL,
        name,
        price,
      };

      handleAddToCartStore(newRecord);

      return true;
    }

    const isQuantityValid = isExist.quantity <= quantity;

    if (isQuantityValid) {
      isExist.quantity += 1;
      isExist.price = price * isExist.quantity;

      useCartStore.setState({ data: [...cart] });

      return true;
    }

    return false;
  };

  return {
    data: cart,
    onAddToCart,
  };
};
