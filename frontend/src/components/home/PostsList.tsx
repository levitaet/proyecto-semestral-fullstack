import PostComponent from "../post/PostComponent";
import type { Post } from "../../types/post";
import { useEffect, useState } from "react";
import { postsService } from "../../api";
import { useNavigate } from "react-router-dom";
import DropMenu from './DropMenu';

import { 
    Box, Grid as MuiGrid, TextField, InputAdornment
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

const PostsList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState(""); 
  const states = ["Cualquier disponibilidad", "En la U ahora"];


  useEffect(() => {
    postsService.getCategories().then((categories) => {
      setCategories(["Todas", ...categories]);
    });
  }, []);

  useEffect(() => {
    postsService.getAll().then((posts) => {
      setAllPosts(posts);
      setPosts(posts);
    });
  }, []);

  useEffect(() => {
    const filtered = allPosts.filter((post) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(searchLower) ||
        post.product_name.toLowerCase().includes(searchLower) ||
        post.author_name.toLowerCase().includes(searchLower);

      if (!matchesSearch) {
        return false;
      }

      if (
        categoryFilter &&
        categoryFilter !== "Todas" &&
        post.category !== categoryFilter
      ) {
        return false;
      }
      if (
        availabilityFilter !== null &&
        post.availability !== availabilityFilter
      ) {
        return false;
      }
      return true;
    });
    setPosts(filtered);
  }, [categoryFilter, availabilityFilter, allPosts, searchQuery]);

  const handlePostClick = (id: string) => {
    navigate(`/post/${id}`);
  };

  const handleCategorySelect = (item: string) => {
    setCategoryFilter(item === "Todas" ? null : item);
  };

  const handleAvailabilitySelect = (item: string) => {
    setAvailabilityFilter(item === "En la U ahora" ? true : null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          variant="outlined"
          placeholder="Buscar productos o vendedores..."
          sx={{ flexGrow: 1, minWidth: '250px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <DropMenu
          title={categoryFilter || "Todas las categorías"}
          items={categories}
          onSelect={handleCategorySelect}
        />

        <DropMenu
          title={availabilityFilter ? "En la U ahora" : "Cualquier disponibilidad"}
          items={states}
          onSelect={handleAvailabilitySelect}
        />
      </Box>

      <MuiGrid container spacing={4}>
        {posts.map((post) => {
          const gridProps = {
            item: true,
            xs: 12,
            sm: 6,
            md: 6,
            lg: 4,
            sx: { minWidth: '420px' }
          };
          
          return (
            <MuiGrid key={post.id} {...gridProps}>
              <PostComponent
                {...post}
                onPostClick={handlePostClick}
              />
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </Box>
  );
};

export default PostsList;
