export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  images?: string[];
  created_at: string;
  purchase_price: number;
};

export type CreateProduct = Omit<Product, "created_at" | "id">;
