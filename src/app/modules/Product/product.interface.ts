export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  rating?: number;
  thumbnail: string;
  isDeleted: boolean
}
