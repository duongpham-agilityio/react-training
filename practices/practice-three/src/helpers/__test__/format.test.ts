import { IProduct } from '@/interface';
import { formatPayloadProduct, formatProductCardProps } from '..';

describe('Format', () => {
  it('formatPayloadProduct', () => {
    const data = {
      price: '1',
      quantity: '2',
    };

    const res = formatPayloadProduct(data as any);

    expect(res).toEqual({ price: 1, quantity: 2 });
  });
});

describe('Format', () => {
  it('formatProductCardProps', () => {
    const data: IProduct = {
      name: 'Tasty Plastic Mouse',
      description: 'Quos tempora adipisci quidem ipsum.',
      imageURL: 'https://loremflickr.com/640/480/fashion',
      price: 430,
      quantity: 2,
      isLiked: true,
      id: 1,
      category: 'books',
      createdAt: new Date(),
    };
    const result = formatProductCardProps(data);

    expect(result.status).toBeTruthy();
  });
});
