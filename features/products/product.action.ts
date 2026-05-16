import axiosClient from "@/lib/axios";

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ProductParams {
  title?: string;
  price?: number;
  categoryId?: number;
  offset?: number;
  limit?: number;
}

export const getProducts = async (params?: ProductParams): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products", { params });
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosClient.get<Category[]>("/categories");
  return response.data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await axiosClient.get<Product>(`/products/slug/${slug}`);
  return response.data;
};
