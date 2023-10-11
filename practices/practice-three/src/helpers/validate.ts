// Constants
import { MESSAGES } from '@/constants';

interface EmptyData {
  [key: string]: string;
}

// Check empty for object
export const isEmpty = <T = EmptyData>(
  data: EmptyData & T,
): [boolean, EmptyData] => {
  let isNotEmpty: boolean = true;
  const res: EmptyData = {};

  Object.entries(data).forEach(([key, value]: [string, string]): void => {
    if (!value) {
      isNotEmpty = false;
      res[key] = MESSAGES.EMPTY_FILED;
    }
  });

  return [!isNotEmpty, res];
};
