// Constants
import { MESSAGES } from '@/constants';

// Services
import { apiRequest } from '../configs';

export const uploadImage = async (image: FormData): Promise<string> => {
  try {
    const data = await apiRequest
      .post(
        `${process.env.VITE_UPLOAD_URL}?key=${process.env.VITE_UPLOAD_KEY}`,
        image,
      )
      .then((r) => r.data);

    return data.data.url;
  } catch (error) {
    throw new Error(MESSAGES.FAIL_TO_FETCH);
  }
};
