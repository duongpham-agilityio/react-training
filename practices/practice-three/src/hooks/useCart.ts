import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCallback } from 'react';

// Services
import { productAPI } from '@/services/apis';

// Types
import { ICartData, IProduct } from '@/interface';

export interface IUseCartStore {
  data: ICartData[];
  addNewProduct: (product: ICartData) => void;
  updateCart: (product: ICartData[]) => void;
}

export interface IUseCart {
  handleAddProductToCart: (product: IProduct) => boolean;
  handleRemove: (productId: number) => void;
  handleQuantity: (productId: number, quantity: number) => void;
  handleCheckout: () => Promise<void>;
}

//  Cart store
export const useCartStore = create(
  persist<IUseCartStore>(
    (set) => ({
      data: [],
      addNewProduct: (product: ICartData): void =>
        set((state) => ({ data: [...state.data, product] })),
      updateCart: (products: ICartData[]) => set({ data: products }),
    }),
    {
      name: 'cart',
    },
  ),
);

export const useHandleCart = (): IUseCart => {
  const addNewProduct = useCartStore(
    (state: IUseCartStore): IUseCartStore['addNewProduct'] =>
      state.addNewProduct,
  );

  const updateCart = useCartStore(
    (state: IUseCartStore): IUseCartStore['updateCart'] => state.updateCart,
  );

  const isValidQuantity = useCallback(
    (quantityInCart: number, quantityInStock: number): boolean =>
      quantityInCart <= quantityInStock && !!quantityInCart,
    [],
  );

  // Handle add product to cart
  const handleAddProductToCart = useCallback(
    (product: IProduct): boolean => {
      try {
        const { data: carts } = useCartStore.getState();
        const { id, description, imageURL, name, price, quantity } = product;

        // Check Product exists from cart store
        const isExist: ICartData | undefined = carts.find(
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

          addNewProduct(newRecord);

          return true;
        }

        const isQuantityValid = isValidQuantity(isExist.quantity, quantity);

        if (isQuantityValid) {
          isExist.quantity += 1;
          isExist.price = price * isExist.quantity;

          updateCart([...carts]);

          return true;
        }

        return false;
      } catch (error) {
        return false;
      }
    },
    [addNewProduct, isValidQuantity, updateCart],
  );

  const handleRemove = useCallback(
    (productId: number): void => {
      const carts: ICartData[] = useCartStore.getState().data;
      const newCarts: ICartData[] = carts.filter(
        (cart: ICartData): boolean => cart.productId !== productId,
      );

      updateCart(newCarts);
    },
    [updateCart],
  );

  const handleQuantity = useCallback(
    async (productId: number, quantity: number): Promise<void> => {
      try {
        // Get product from BE
        const product: IProduct | undefined =
          await productAPI.getById(productId);

        if (!product) {
          return;
        }

        const { price, quantity: quantityInStock } = product;
        // Get carts from localStore
        const carts: ICartData[] = useCartStore.getState().data;
        // Get cart matching with productID
        const cart: ICartData = carts.find(
          (cart: ICartData) => cart.productId === productId,
        ) as ICartData;

        const isValid: boolean = isValidQuantity(quantity, quantityInStock);

        if (!isValid) return;

        // Update information
        cart.price = price * quantity;
        cart.quantity = quantity;

        updateCart([...carts]);
      } catch (error) {
        console.log(error);
      }
    },
    [isValidQuantity, updateCart],
  );

  const handleCheckout = useCallback(async () => {
    // Get products from DB
    const products: IProduct[] = (await productAPI.getAll()) || [];
    //  Get cart from localStore
    const carts: ICartData[] = useCartStore.getState().data;

    await Promise.all(
      carts.map((cart: ICartData) => {
        const { quantity, productId } = cart;
        const product: IProduct | undefined = products.find(
          (product: IProduct) => product.id === productId,
        );

        if (!product) return Promise.resolve();

        return productAPI.update(productId, {
          quantity: product.quantity - quantity,
        });
      }),
    );
  }, []);

  return {
    handleAddProductToCart,
    handleRemove,
    handleQuantity,
    handleCheckout,
  };
};
