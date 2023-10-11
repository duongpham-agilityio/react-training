export interface IError {
  isError: boolean;
  message: string;
}

export type IResponse<T = object> = Partial<IError> & T;
