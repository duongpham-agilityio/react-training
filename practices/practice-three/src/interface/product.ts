export interface IProduct {
  id: string;
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
