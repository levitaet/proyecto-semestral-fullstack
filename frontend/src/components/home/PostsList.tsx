import PostComponent from '../post/PostComponent';
import { useEffect, useState } from "react";
import { DropMenu } from "./DropMenu";
import { postsService } from '../../api';
import { usePostsStore } from '../../postsStore';
import type { PostsState } from '../../postsStore';
import { useNavigate } from "react-router-dom";


const PostsList = () => {
  const navigate = useNavigate();
    const store : PostsState = usePostsStore(state => state);
    
    const [categories, setCategories] = useState<string[]>([]);
    const [categoryExpanded, setCategoryExpanded] = useState(false);
    const [availabilityExpanded, setAvailabilityExpanded] = useState(false);
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

  return (
    <div>
      <section className="home_filters">
        <button
          type="button"
          className="filter-btn filter-btn--search"
          onClick={() => {}}
        >
          <img src="/search-icon.svg" width="18" height="18" alt="lupita" />
          <span>Buscar productos o vendedores...</span>
        </button>

        <div className="filter-group">
          <button
            type="button"
            className="filter-btn"
            onClick={() => {
              setCategoryExpanded(!categoryExpanded);
            }}
          >
            <span>{store.categoryFilter || "Todas"}</span>
            <span className="chevron">▾</span>
          </button>
          {categoryExpanded && (
            <div className="dropdown">
              <DropMenu 
                data={categories}
                onSelect={(item : string) => {
                  store.setFilter({category: item === "Todas" ? null : item});
                  setCategoryExpanded(false);
                }}
              />
            </div>
          )}  
        </div>

        <div className="filter-group">
          <button type="button" className="filter-btn" onClick={() => {
            setAvailabilityExpanded(!availabilityExpanded);
          }}>
            <span className="dot dot--on" />
            <span>{store.availabilityFilter ? "En la U ahora" : "Cualquier disponibilidad"}</span>
          </button>
          {availabilityExpanded && (
            <div className="dropdown">
              <DropMenu 
                data={states}
                onSelect={(item : string) => {
                  store.setFilter({availability: item === "En la U ahora" ? true : null});
                  setAvailabilityExpanded(false);
                }}
              />
            </div>
          )}
        </div>

      </section>

      <main className="home_grid">
        {store.filteredPosts.map((post) => (
          <PostComponent 
            key={post.id} 
            {...post} 
            onPostClick={handlePostClick}/>
        ))}
      </main>
      </div>
    );
};

export default PostsList;
