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

export const getProducts = async (categoryId?: string): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products", {
    params: {
      categoryId,
    },
  });
  return response.data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await axiosClient.get<Product>(`/products/slug/${slug}`);
  return response.data;
};
