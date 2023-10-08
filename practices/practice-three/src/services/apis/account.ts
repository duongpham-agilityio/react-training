// Types
import { ENDPOINT_SERVICES } from '@/constants';
import { IAccount } from '@/interface';

// Services
import { apiRequest } from '@/services/configs';

interface AccountAPI {
  get: (email: string, password: string) => Promise<IAccount>;
}

/**
 * Get account by email & password
 * @param email your email
 * @param password your password
 * @returns your account
 */
const get: AccountAPI['get'] = async (
  email: string,
  password: string,
): Promise<IAccount> => {
  const account: IAccount = (
    await apiRequest.get(
      `${ENDPOINT_SERVICES.Users}?email=${email}&password=${password}`,
    )
  ).data;

  return account;
};

export const accountAPI = {
  get,
};
