import axiosClient from "@/lib/axios";

 interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosClient.get<Category[]>("/categories");
  return response.data;
};
