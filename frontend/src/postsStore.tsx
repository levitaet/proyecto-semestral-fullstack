import { create } from "zustand";
import type { Post } from "./types/post";

export type PostsState = {
  posts: Post[];
  filteredPosts: Post[];
  filter?: {category?: string | null, availability?: boolean | null};
  addPost: (post: Post) => void;
  editPost: (id: string) => void;
  setPosts: (posts: Post[]) => void;
  setFilter: (filters: {category?: string | null, availability?: boolean | null}) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  filteredPosts: [],
  filter: {},

  addPost: (post: Post) => set((state) => ({ posts: [...state.posts, post] })),
  editPost: (id: string) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === id ? { ...post, edited: true } : post
    ),
  })),
  setPosts: (posts: Post[]) => set(() => ({ posts, filteredPosts: posts })),
  
  setFilter: (filters) => set((state) => {
    const newFilter = {
      category: filters.category !== undefined ? filters.category : state.filter?.category,
      availability: filters.availability !== undefined ? filters.availability : state.filter?.availability,
    };

    const filteredPosts = state.posts.filter((post) => {
      if (newFilter.category && newFilter.category !== "Todas" && post.category !== newFilter.category) {
        return false;
      }
      if (newFilter.availability !== null && newFilter.availability !== undefined && post.availability !== newFilter.availability) {
        return false;
      }
      return true;
    });

    return {
      filter: newFilter,
      filteredPosts,
    };
  })
}));