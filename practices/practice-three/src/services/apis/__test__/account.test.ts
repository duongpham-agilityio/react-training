// Services
import { apiRequest } from '@/services/configs';
import { accountAPI } from '..';

// Constants
import { MESSAGES } from '@/constants';

jest.mock('@/services/configs');

describe('Account service', () => {
  it('Resolve', async () => {
    const mockData = { data: 'Duong' };
    (apiRequest.get as jest.Mock).mockResolvedValue(mockData);

    const res = await accountAPI.get('Duong', '123');

    expect(res).toEqual(mockData.data);
  });

  it('Resolve', async () => {
    try {
      (apiRequest.get as jest.Mock).mockRejectedValue({ data: 'Duong' });

      await accountAPI.get('Duong', '123');
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toEqual(MESSAGES.FAIL_TO_FETCH);
    }
  });
});
