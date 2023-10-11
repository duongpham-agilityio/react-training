// Interface
import { IAccount } from '.';

export interface IError {
  isError: boolean;
  message: string;
}

export type IAuthEmpty = Partial<Pick<IAccount, 'email' | 'password'>>;

export type IResponse<T = object> = Partial<IError> & T;
