import {
  MockedRequest,
  MockedResponse,
  ResponseComposition,
  RestContext,
} from 'msw';

// Interfaces
import { IAccount, IAuthEmpty } from '@/interface';
import { isEmpty } from '@/helpers';

export const signIn = async (
  req: MockedRequest,
  res: ResponseComposition,
  context: RestContext,
): Promise<MockedResponse> => {
  const payload: Pick<IAccount, 'email' | 'password'> = await req.json();

  const [isNotEmpty, data] = isEmpty<IAuthEmpty>(payload);

  if (isNotEmpty) return res(context.status(401), context.json({ data }));

  return res(context.status(200), context.json(''));
};
