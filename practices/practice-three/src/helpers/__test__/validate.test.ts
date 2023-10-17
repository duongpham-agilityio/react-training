import { REGEX } from '@/constants';
import { isEmpty, isMatchRegexp } from '..';

describe('Validate', () => {
  it('Is Empty', () => {
    const data = {
      name: 'duong',
      password: '',
    };

    const [isError, error] = isEmpty(data);

    expect(isError).toBeTruthy();
    expect(error).toEqual({ password: 'Please fill in this field' });
  });

  it('Is match regexp', () => {
    const isMatch = isMatchRegexp('duong.pham@asnet.com.vn', REGEX.EMAIL);

    expect(isMatch).toBeTruthy();
  });
});
