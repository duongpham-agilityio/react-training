export interface IProduct {
  id: number;
  name: string;
  description: string;
  category: string;
  imageURL: string;
  price: number;
  quantity: number;
  isLiked: boolean;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
}
