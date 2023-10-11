import { IProduct } from '@/interface';

export const products: IProduct[] = [
  {
    name: 'Tasty Plastic Mouse',
    description: 'Quos tempora adipisci quidem ipsum.',
    imageURL: 'https://loremflickr.com/640/480/fashion',
    price: 430,
    quantity: 10,
    isLiked: true,
    id: 1,
    category: 'fashion',
    createdAt: new Date(),
  },
  {
    name: 'Tasty Wooden Chair',
    description:
      'Ab repellat ullam autem. Esse facere facere debitis dicta quidem nihil. Saepe suscipit ex.',
    imageURL: 'https://loremflickr.com/640/480/fashion',
    price: 430,
    quantity: 10,
    isLiked: false,
    id: 2,
    category: 'fashion',
    createdAt: new Date(),
  },
];
