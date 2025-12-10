export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  thumbnail: string;
  items: string[];
  price: number;
  productCode: string;
  deliveryCharge: number;
  discountedPrice: number;
  description: string;
  isCustomizable: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}
