export interface Product {
  id: number;
  name: string;
  description?: string;
  image?: string;
  price: number;
  quantity: number;
  userId: number;
}