// Interface
import { IAccount } from '.';

export interface IError {
  isFetchFailed?: boolean;
  isError: boolean;
  message: string;
}

export interface IMswResponse<T> {
  data: T;
}

export type IAuthEmpty = Partial<Pick<IAccount, 'email' | 'password'>>;

export type IResponse<T = object> = Partial<IError & T>;
