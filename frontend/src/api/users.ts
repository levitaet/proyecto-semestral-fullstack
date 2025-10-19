import http from "./http";

export interface User {
  id: string;
  username: string;
  email: string;
  posts: string[];
}

export const usersService = {
  // Obtener todos los usuarios
  getAll: async (): Promise<User[]> => {
    const response = await http.get("/users");
    return response.data;
  },

  // Obtener un usuario por ID
  getById: async (id: string): Promise<User> => {
    const response = await http.get(`/users/${id}`);
    return response.data;
  },

  // Registrar un nuevo usuario
  register: async (userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> => {
    const response = await http.post("/users", userData);
    return response.data;
  },

  // Eliminar todos los usuarios
  deleteAll: async (): Promise<void> => {
    await http.delete("/users/all");
  },
};