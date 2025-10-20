import http from "./http";
import type { Post } from "../types/post";
import axiosSecure from "./axiosSecure";

export const postsService = {
  // Obtener todos los posts
  getAll: async (): Promise<Post[]> => {
    const response = await http.get("/posts");
    return response.data;
  },

  // Obtener un post por ID
  getById: async (id: string): Promise<Post> => {
    const response = await http.get(`/posts/${id}`);
    return response.data;
  },

  // Obtener todas las categorías
  getCategories: async (): Promise<string[]> => {
    const response = await http.get("/posts/categories");
    return response.data;
  },

  // Crear un nuevo post
  create: async (postData: {
    title: string;
    product_name: string;
    description: string;
    price: number;
    tags: string[];
    category: string;
    location: string;
    availability: boolean;
    stock: number | null;
    author_name: string;
    file?: File | null;
  }): Promise<Post> => {
    const response = await http.post("/posts", postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Eliminar todos los posts
  deleteAll: async (): Promise<void> => {
    await http.delete("/posts/all");
  },
};