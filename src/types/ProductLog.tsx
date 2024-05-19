interface Product {
  id: number;
  name: string;
  image?: string;
  quantity?: number;
}

interface User {
  id: number;
  name: string;
}

export interface ProductLog {
  id: number;
  quantity: number;
  type: string;
  createdAt: string;
  user: User;
  product: Product;
}