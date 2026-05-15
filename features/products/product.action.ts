import axiosClient from '@/lib/axios';

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

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>('/products');
  return response.data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await axiosClient.get<Product>(`/products/slug/${slug}`);
  return response.data;
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>(`/categories/${categoryId}/products`);
  return response.data;
};

