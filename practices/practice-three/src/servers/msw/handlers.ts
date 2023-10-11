import {
  MockedRequest,
  MockedResponse,
  ResponseComposition,
  RestContext,
} from 'msw';

// Interfaces
import { IAccount, IAuthEmpty, IMswResponse } from '@/interface';

// Helpers
import { isEmpty, isMatchRegexp } from '@/helpers';

// Constants
import { MESSAGES, REGEXP_EMAIL } from '@/constants';

export const signIn = async (
  req: MockedRequest,
  res: ResponseComposition,
  context: RestContext,
): Promise<MockedResponse> => {
  const MOCK_EMAIL: string = 'phamtanduong@gmail.com';
  const MOCK_PASSWORD: string = '12345678';
  const payload: Pick<IAccount, 'email' | 'password'> = await req.json();

  const [isNotEmpty, data] = isEmpty<IAuthEmpty>(payload);

  if (isNotEmpty)
    return res(
      context.status(401),
      context.json<IMswResponse<IAuthEmpty>>({ data }),
    );

  if (!isMatchRegexp(payload.email, REGEXP_EMAIL)) {
    return res(
      context.status(401),
      context.json<IMswResponse<IAuthEmpty>>({
        data: {
          email: MESSAGES.EMAIL_NOT_CORRECT,
        },
      }),
    );
  }

  if (payload.password !== MOCK_PASSWORD || payload.email !== MOCK_EMAIL) {
    return res(
      context.status(401),
      context.json<IMswResponse<IAuthEmpty>>({
        data: {
          password: MESSAGES.AUTH_INCORRECT,
          email: MESSAGES.AUTH_INCORRECT,
        },
      }),
    );
  }
  return res(context.status(200), context.json(''));
};
