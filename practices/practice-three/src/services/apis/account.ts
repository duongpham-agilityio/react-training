// Types
import { IAccount, TResponse } from '@/interface';

// Constants
import { ENDPOINT_SERVICES, MESSAGES, STATUS } from '@/constants';

// Services
import { apiRequest } from '@/services/configs';

type TAccountAPI = {
  get: (email: string, password: string) => Promise<IAccount>;
  verify: <T extends object>(
    email: string,
    password: string,
  ) => Promise<TResponse<{ error: T }>>;
};

/**
 * Get account by email & password
 * @param email your email
 * @param password your password
 * @returns your account
 */
const get: TAccountAPI['get'] = async (email: string, password: string) => {
  try {
    const account: IAccount = (
      await apiRequest.get(
        `${ENDPOINT_SERVICES.USERS}?email=${email}&password=${password}`,
      )
    ).data;

    return account;
  } catch (error) {
    throw new Error(MESSAGES.FAIL_TO_FETCH);
  }
};

const verify: TAccountAPI['verify'] = async <T>(
  email: string,
  password: string,
) => {
  try {
    const response: Response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === STATUS.NOT_FOUND) return Promise.reject();

    if (response.status === STATUS.UNAUTHORIZED) {
      const data: T = (await response.json()).data;
      return {
        isError: true,
        error: data,
      };
    }

    return {
      isError: false,
      error: {} as T,
    };
  } catch (error) {
    throw new Error(MESSAGES.FAIL_TO_FETCH);
  }
};

export const accountAPI: TAccountAPI = {
  get,
  verify,
};
