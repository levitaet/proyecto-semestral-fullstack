import { create } from "zustand";
import type { LoggedUser } from "./types/user";


export interface UserStore {
  user: LoggedUser | null;
  setUser: (user: LoggedUser | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
