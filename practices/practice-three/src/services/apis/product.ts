import { AxiosResponse } from 'axios';

// Types
import { IProduct } from '@/interface';

// Services
import { apiRequest } from '../configs';

// Constants
import { ENDPOINT_SERVICES } from '@/constants';

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
  getAll: () => Promise<IProduct[]>;
  getById: (id: number) => Promise<IProduct>;
  getByName: (name: string) => Promise<IProduct[]>;
  getByCategory: (category: string) => Promise<IProduct[]>;
  add: (product: ProductPayload) => Promise<IProduct>;
  update: (id: number, payload: Partial<ProductPayload>) => Promise<IProduct>;
  removeById: (id: number) => Promise<boolean>;
}

/**
 *   Get all products from db
 * @returns
 */
const getAll: IProductAPI['getAll'] = async (): Promise<IProduct[]> => {
  const res: AxiosResponse<IProduct[]> = await apiRequest.get<IProduct[]>(
    ENDPOINT_SERVICES.Products,
  );

  return res.data;
};

/**
 * Get product from db by product_id
 * @param id
 * @returns
 */
const getById: IProductAPI['getById'] = async (
  id: number,
): Promise<IProduct> => {
  const res: AxiosResponse<IProduct> = await apiRequest.get(
    `${ENDPOINT_SERVICES.Products}/${id}`,
  );

  return res.data;
};

/**
 * Get products by name from db
 * @param name
 * @returns
 */
const getByName: IProductAPI['getByName'] = async (
  name: string,
): Promise<IProduct[]> => {
  const res: AxiosResponse<IProduct[]> = await apiRequest.get(
    `${ENDPOINT_SERVICES.Products}?name=${name}`,
  );

  return res.data;
};

/**
 * Get products by category from db
 * @param category
 * @returns
 */
const getByCategory: IProductAPI['getByCategory'] = async (
  category: string,
): Promise<IProduct[]> => {
  const res: AxiosResponse<IProduct[]> = await apiRequest.get(
    `${ENDPOINT_SERVICES.Products}?category=${category}`,
  );

  return res.data;
};

/**
 * Create new product
 * @param payload
 * @returns
 */
const add: IProductAPI['add'] = async (
  payload: ProductPayload,
): Promise<IProduct> => {
  // Define new product
  const newProduct: Omit<IProduct, 'id'> = {
    ...payload,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const res: AxiosResponse<IProduct> = await apiRequest.post(
    ENDPOINT_SERVICES.Products,
    newProduct,
  );

  return res.data;
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
  const res: AxiosResponse<IProduct> = await apiRequest.patch(
    `${ENDPOINT_SERVICES.Products}/${id}`,
    payload,
  );

  return res.data;
};

/**
 * Remove product by id from db
 * @param id
 * @returns
 */
const removeById: IProductAPI['removeById'] = async (
  id: number,
): Promise<boolean> => {
  const res: AxiosResponse = await apiRequest.delete(
    `${ENDPOINT_SERVICES.Products}/${id}`,
  );

  if (+`${res.status}`[0] === 200) return true;

  return false;
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
