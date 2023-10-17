import { formatPayloadProduct } from '..';

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
