import axiosSecure from "./axiosSecure";
import type { LoggedUser, Credentials } from "../types/user";


export const loginService = {
  login: async (credentials: Credentials): Promise<LoggedUser> => {
    const response = await axiosSecure.post(
      "/login",
      credentials,
    );

    const csrfToken = response.headers["x-csrf-token"];

    if (csrfToken) {
      localStorage.setItem("csrfToken", csrfToken);
    }

    return response.data;
  },

  restoreLogin: async () => {
    try {
      const response = await axiosSecure.get("/login/me");
      return response.data; // Usuario logueado
    } catch {
      return null; // No logueado
    }
  },


  logout: async (): Promise<void> => {
    await axiosSecure.post("/login/logout");
    localStorage.removeItem("csrfToken");
  }
};