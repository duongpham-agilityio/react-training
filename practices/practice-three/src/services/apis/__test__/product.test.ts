// Services
import { apiRequest } from '@/services/configs';
import { productAPI } from '..';

// Constants
import { MESSAGES } from '@/constants';
import { products } from '@/mocks';

jest.mock('@/services/configs');

describe('Product service', () => {
  it('Get all (resolve)', async () => {
    const mockData = { data: ['Duong'] };
    (apiRequest.get as jest.Mock).mockResolvedValue(mockData);

    const res = await productAPI.getAll();

    expect(res).toEqual(mockData.data);
  });

  it('Get all (reject)', async () => {
    try {
      const mockData = [{ data: 'Duong' }];

      (apiRequest.get as jest.Mock).mockRejectedValue(mockData);

      await productAPI.getAll();
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toEqual(MESSAGES.FAIL_TO_FETCH);
    }
  });

  it('Get by id (resolve)', async () => {
    const mockData = { data: 'Duong' };
    (apiRequest.get as jest.Mock).mockResolvedValue(mockData);

    const res = await productAPI.getById(1);

    expect(res).toEqual(mockData.data);
  });

  it('Get by id (reject)', async () => {
    try {
      (apiRequest.get as jest.Mock).mockRejectedValue('');

      await productAPI.getById(1);
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toEqual(MESSAGES.FAIL_TO_FETCH);
    }
  });

  it('Get by name (resolve)', async () => {
    const mockData = { data: 'Duong' };
    (apiRequest.get as jest.Mock).mockResolvedValue(mockData);

    const res = await productAPI.getByName('Duong');

    expect(res).toEqual(mockData.data);
  });

  it('Get by name (resolve)', async () => {
    try {
      (apiRequest.get as jest.Mock).mockRejectedValue('');

      await productAPI.getByName('Duong');
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toEqual(MESSAGES.FAIL_TO_FETCH);
    }
  });

  it('Get by category (reject)', async () => {
    const mockData = { data: 'Duong' };
    (apiRequest.get as jest.Mock).mockResolvedValue(mockData);

    const res = await productAPI.getByCategory('Duong');

    expect(res).toEqual(mockData.data);
  });

  it('Get by category (resolve)', async () => {
    try {
      (apiRequest.get as jest.Mock).mockRejectedValue('');

      await productAPI.getByCategory('Duong');
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toEqual(MESSAGES.FAIL_TO_FETCH);
    }
  });

  it('add (reject)', async () => {
    const mockData = { data: 'Duong' };
    (apiRequest.post as jest.Mock).mockResolvedValue(mockData);

    const res = await productAPI.add(products[0]);

    expect(res).toEqual(mockData.data);
  });

  it('add (resolve)', async () => {
    try {
      (apiRequest.post as jest.Mock).mockRejectedValue('');

      await productAPI.add(products[0]);
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toEqual(MESSAGES.FAIL_TO_FETCH);
    }
  });

  it('update (reject)', async () => {
    const mockData = { data: 'Duong' };
    (apiRequest.patch as jest.Mock).mockResolvedValue(mockData);

    const res = await productAPI.update(1, products[0]);

    expect(res).toEqual(mockData.data);
  });

  it('update (resolve)', async () => {
    try {
      (apiRequest.patch as jest.Mock).mockRejectedValue('');

      await productAPI.update(1, products[0]);
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toEqual(MESSAGES.FAIL_TO_FETCH);
    }
  });

  it('remove (resolve)', async () => {
    const mockData = { data: 'Duong' };
    (apiRequest.delete as jest.Mock).mockResolvedValue(mockData);

    const res = await productAPI.removeById(1);

    expect(res).toEqual(false);
  });

  it('remove (reject)', async () => {
    try {
      (apiRequest.patch as jest.Mock).mockRejectedValue('');

      await productAPI.removeById(1);
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toEqual(MESSAGES.FAIL_TO_FETCH);
    }
  });

  it('remove (resolve status = 200) ', async () => {
    const mockData = { data: 'Duong', status: 200 };
    (apiRequest.delete as jest.Mock).mockResolvedValue(mockData);

    const res = await productAPI.removeById(1);

    expect(res).toEqual(true);
  });
});
