import { AxiosResponse } from 'axios';

// Types
import { IProduct } from '@/interface';

// Services
import { apiRequest } from '../configs';

// Constants
import { ENDPOINT_SERVICES, MESSAGES_FETCHING } from '@/constants';

type ProductPayload = Pick<
  IProduct,
  | 'imageURL'
  | 'isLiked'
  | 'category'
  | 'description'
  | 'name'
  | 'price'
  | 'quantity'
>;

interface IProductAPI {
  getAll: () => Promise<IProduct[]> | undefined;
  getById: (id: number) => Promise<IProduct> | undefined;
  getByName: (name: string) => Promise<IProduct[]> | undefined;
  getByCategory: (category: string) => Promise<IProduct[]> | undefined;
  add: (product: ProductPayload) => Promise<IProduct> | undefined;
  update: (
    id: number,
    payload: Partial<ProductPayload>,
  ) => Promise<IProduct> | undefined;
  removeById: (id: number) => Promise<boolean> | undefined;
}

/**
 *   Get all products from db
 * @returns
 */
const getAll: IProductAPI['getAll'] = async () => {
  try {
    const res: AxiosResponse<IProduct[]> = await apiRequest.get<IProduct[]>(
      ENDPOINT_SERVICES.Products,
    );

    return res.data;
  } catch (error) {
    throw new Error(MESSAGES_FETCHING.FailToFetch);
  }
};

/**
 * Get product from db by product_id
 * @param id
 * @returns
 */
const getById: IProductAPI['getById'] = async (id: number) => {
  try {
    const res: AxiosResponse<IProduct> = await apiRequest.get(
      `${ENDPOINT_SERVICES.Products}/${id}`,
    );

    return res.data;
  } catch (error) {
    throw new Error(MESSAGES_FETCHING.FailToFetch);
  }
};

/**
 * Get products by name from db
 * @param name
 * @returns
 */
const getByName: IProductAPI['getByName'] = async (name: string) => {
  try {
    const res: AxiosResponse<IProduct[]> = await apiRequest.get(
      `${ENDPOINT_SERVICES.Products}?name=${name}`,
    );

    return res.data;
  } catch (err) {
    throw new Error(MESSAGES_FETCHING.FailToFetch);
  }
};

/**
 * Get products by category from db
 * @param category
 * @returns
 */
const getByCategory: IProductAPI['getByCategory'] = async (
  category: string,
) => {
  try {
    const res: AxiosResponse<IProduct[]> = await apiRequest.get(
      `${ENDPOINT_SERVICES.Products}?category=${category}`,
    );

    return res.data;
  } catch (error) {
    throw new Error(MESSAGES_FETCHING.FailToFetch);
  }
};

/**
 * Create new product
 * @param payload
 * @returns
 */
const add: IProductAPI['add'] = async (payload: ProductPayload) => {
  try {
    // Define new product
    const newProduct: Omit<IProduct, 'id'> = {
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res: AxiosResponse<IProduct> = await apiRequest.post(
      ENDPOINT_SERVICES.Products,
      newProduct,
    );

    return res.data;
  } catch (error) {
    throw new Error(MESSAGES_FETCHING.FailToFetch);
  }
};

/**
 * Update product by id
 * @param id
 * @param payload
 * @returns
 */
const update: IProductAPI['update'] = async (
  id: number,
  payload: Partial<ProductPayload>,
): Promise<IProduct> => {
  try {
    const res: AxiosResponse<IProduct> = await apiRequest.patch(
      `${ENDPOINT_SERVICES.Products}/${id}`,
      payload,
    );

    return res.data;
  } catch (error) {
    throw new Error(MESSAGES_FETCHING.FailToFetch);
  }
};

/**
 * Remove product by id from db
 * @param id
 * @returns
 */
const removeById: IProductAPI['removeById'] = async (
  id: number,
): Promise<boolean> => {
  try {
    const res: AxiosResponse = await apiRequest.delete(
      `${ENDPOINT_SERVICES.Products}/${id}`,
    );

    if (+`${res.status}`[0] === 200) return true;

    return false;
  } catch (error) {
    throw new Error(MESSAGES_FETCHING.FailToFetch);
  }
};

export const productAPI: IProductAPI = {
  getAll,
  getById,
  getByName,
  getByCategory,
  add,
  update,
  removeById,
};
