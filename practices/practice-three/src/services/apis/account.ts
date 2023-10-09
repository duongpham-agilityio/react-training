// Types
import { IAccount } from '@/interface';

// Constants
import { ENDPOINT_SERVICES, MESSAGES_FETCHING } from '@/constants';

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
const get: AccountAPI['get'] = async (email: string, password: string) => {
  try {
    const account: IAccount = (
      await apiRequest.get(
        `${ENDPOINT_SERVICES.Users}?email=${email}&password=${password}`,
      )
    ).data;

    return account;
  } catch (error) {
    throw new Error(MESSAGES_FETCHING.FailToFetch);
  }
};

export const accountAPI = {
  get,
};
