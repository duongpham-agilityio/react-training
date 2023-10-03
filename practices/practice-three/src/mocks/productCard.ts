import { ProductCardProps } from '@/components';

export const productCardProps: ProductCardProps = {
  info: {
    imageURL:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d455e5b6-23e9-4f06-8b86-32610d838937/renew-run-3-road-running-shoes-395S7c.png',
    title: 'Nike React Miler',
    description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage',
    id: 1,
    price: 1000,
    status: false,
    isLike: false,
    statusMessage: 'Only 5 left',
  },
  onAddToCard: () => {},
  onLike: () => {},
};
