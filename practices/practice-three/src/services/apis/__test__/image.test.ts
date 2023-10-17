//Services
import { apiRequest } from '@/services/configs';
import { uploadImage } from '..';

// Constants
import { MESSAGES } from '@/constants';

jest.mock('@/services/configs');

describe('Upload image', () => {
  it('Resolve', async () => {
    (apiRequest.post as jest.Mock).mockResolvedValue({
      data: { data: { url: 'duong' } },
    });

    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    });

    const formData = new FormData();
    formData.append('image', file);

    const res = await uploadImage(formData);

    expect(res).toBe('duong');
  });

  it('Reject', async () => {
    try {
      (apiRequest.post as jest.Mock).mockRejectedValue('');

      const file = new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      });

      const formData = new FormData();
      formData.append('image', file);

      await uploadImage(formData);
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toBe(MESSAGES.FAIL_TO_FETCH);
    }
  });
});
