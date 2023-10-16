import { useCallback } from 'react';

// Constants
import { MESSAGES } from '@/constants';

// Services
import { productAPI } from '@/services/apis';

// Stores
import { TCartStore, useCartStore } from '@/stores';

// Types
import { ICartData, IProduct, TResponse } from '@/interface';

export type TUseCart = {
  handleAddProductToCart: (product: IProduct) => boolean;
  handleRemove: (productId: number) => TResponse;
  handleQuantity: (productId: number, quantity: number) => Promise<TResponse>;
  handleCheckout: () => Promise<void>;
};

export const useHandleCart = (): TUseCart => {
  //  Get handle add to cart from store
  const addNewProduct = useCartStore(
    (state: TCartStore): TCartStore['addNewProduct'] => state.addNewProduct,
  );

  //  Get handle update cart
  const updateCart = useCartStore(
    (state: TCartStore): TCartStore['updateCart'] => state.updateCart,
  );

  //  Handle check quantity
  const isValidQuantity = useCallback(
    (quantityInCart: number, quantityInStock: number): boolean => {
      return (
        quantityInCart <= quantityInStock &&
        !!quantityInCart &&
        !!quantityInStock
      );
    },
    [],
  );

  // Handle add product to cart
  const handleAddProductToCart = useCallback(
    (product: IProduct): boolean => {
      try {
        //  Get data from cart store
        const { data: carts } = useCartStore.getState();
        const { id, description, imageURL, name, price, quantity } = product;

        // Check Product exists from cart store
        const isExist: ICartData | undefined = carts.find(
          (item) => item.productId === id,
        );

        //  Check quantity in stock is valid
        let isValid: boolean = isValidQuantity(quantity, quantity);

        if ((!isExist || isExist) && !isValid) return false;

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

        //  Check quantity between in stock and cart
        isValid = isValidQuantity(isExist.quantity, quantity);

        if (!isValid) return false;

        isExist.quantity += 1;
        isExist.price = price * isExist.quantity;

        updateCart([...carts]);

        return true;
      } catch (error) {
        return false;
      }
    },
    [addNewProduct, isValidQuantity, updateCart],
  );

  //  Handle remove product from cart
  const handleRemove = useCallback(
    (productId: number): TResponse => {
      try {
        const carts: ICartData[] = useCartStore.getState().data;
        const newCarts: ICartData[] = carts.filter(
          (cart: ICartData): boolean => cart.productId !== productId,
        );

        updateCart(newCarts);

        return {
          isError: false,
          message: MESSAGES.REMOVE_FORM_CART_SUCCESS,
        };
      } catch (error) {
        return {
          isError: true,
          message: MESSAGES.FAIL_TO_FETCH,
        };
      }
    },
    [updateCart],
  );

  //  Handle change quantity from cart
  const handleQuantity = useCallback(
    async (productId: number, quantity: number): Promise<TResponse> => {
      try {
        // Get product from BE
        const product: IProduct | undefined =
          await productAPI.getById(productId);

        if (!product) {
          return {
            isError: true,
            message: MESSAGES.FAIL_TO_FETCH,
          };
        }

        const { price, quantity: quantityInStock } = product;
        // Get carts from localStore
        const carts: ICartData[] = useCartStore.getState().data;
        // Get cart matching with productID
        const cart: ICartData = carts.find(
          (cart: ICartData) => cart.productId === productId,
        ) as ICartData;

        const isValid: boolean = isValidQuantity(quantity, quantityInStock);

        if (!isValid)
          return {
            isError: true,
            message: MESSAGES.CHANGE_QUANTITY_ERROR,
          };

        // Update information
        cart.price = price * quantity;
        cart.quantity = quantity;

        updateCart([...carts]);

        return {
          isError: false,
        };
      } catch (error) {
        console.log(error);

        const message: string = (error as unknown as Error).message;

        return {
          isError: true,
          message: message,
        };
      }
    },
    [isValidQuantity, updateCart],
  );

  //  Handle checkout
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
