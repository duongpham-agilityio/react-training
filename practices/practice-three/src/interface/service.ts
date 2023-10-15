// Interface
import { IAccount } from '.';

export type IError = {
  isFetchFailed?: boolean;
  isError: boolean;
  message: string;
};

export type IMswResponse<T> = {
  data: T;
};

export type IAuthEmpty = Partial<Pick<IAccount, 'email' | 'password'>>;

export type TResponse<T = object> = Partial<IError & T>;
