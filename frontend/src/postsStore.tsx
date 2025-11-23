import { create } from "zustand";
import type { Post } from "./types/post";

export type PostsState = {
  posts: Post[];
  filteredPosts: Post[];
  categoryFilter?: string | null;
  availabilityFilter?: boolean | null;
  addPost: (post: Post) => void;
  editPost: (id: string) => void;
  setPosts: (posts: Post[]) => void;
  setFilter: (filters: {category?: string | null, availability?: boolean | null}) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  filteredPosts: [],
  categoryFilter: null,
  availabilityFilter: null,

  addPost: (post: Post) => set((state) => ({ posts: [...state.posts, post] })),
  editPost: (id: string) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === id ? { ...post, edited: true } : post
    ),
  })),
  setPosts: (posts: Post[]) => set(() => ({ posts })),
  
  setFilter: (filters) => set((state) => ({
    categoryFilter: filters.category ?? state.categoryFilter,
    availabilityFilter: filters.availability ?? state.availabilityFilter,
    filteredPosts: state.posts.filter((post) => {
      if (filters.category && filters.category !== "Todas" && post.category !== filters.category) {
        return false;
      }
      if (filters.availability && post.availability !== filters.availability) {
        return false;
      }
      return true;
    }),
  }))
}));