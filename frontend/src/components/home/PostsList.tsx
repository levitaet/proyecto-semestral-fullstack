import PostComponent from '../post/PostComponent';
import { useEffect, useState } from "react";
import { DropMenu } from "./DropMenu";
import { postsService } from '../../api';
import { usePostsStore } from '../../postsStore';
import type { PostsState } from '../../postsStore';
import { useNavigate } from "react-router-dom";

import { 
    Box, Grid as MuiGrid, TextField, InputAdornment
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

const PostsList = () => {
    const navigate = useNavigate();
    const store: PostsState = usePostsStore(state => state);
    
    const [categories, setCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const states = ["Cualquier disponibilidad", "En la U ahora"];

    useEffect(() => {
        postsService.getAll().then((posts) => {
            store.setPosts(posts);
            store.setFilter({});
        });

        postsService.getCategories().then((categories) => {
            setCategories(["Todas", ...categories]);
        });
    }, []);

    const handlePostClick = (id: string) => {
        navigate(`/post/${id}`);
    };

    const handleCategorySelect = (item: string) => {
        store.setFilter({ 
            ...store.filter, 
            category: item === "Todas" ? null : item 
        });
    };

    const handleAvailabilitySelect = (item: string) => {
        store.setFilter({ 
            ...store.filter, 
            availability: item === "En la U ahora" ? true : null 
        });
    };

    const displayPosts = store.filteredPosts.filter((post) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(searchLower) ||
            post.product_name.toLowerCase().includes(searchLower) ||
            post.author_name.toLowerCase().includes(searchLower)
        );
    });

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
                    title={store.filter?.category || "Todas las categorías"}
                    items={categories}
                    onSelect={handleCategorySelect}
                />

                <DropMenu
                    title={store.filter?.availability ? "En la U ahora" : "Cualquier disponibilidad"}
                    items={states}
                    onSelect={handleAvailabilitySelect}
                />
            </Box>

            <MuiGrid container spacing={4}>
                {displayPosts.map((post) => {
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