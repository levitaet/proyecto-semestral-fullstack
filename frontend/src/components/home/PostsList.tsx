import PostComponent from "../post/PostComponent";
import type { Post } from "../../types/post";
import { useEffect, useState } from "react";
import { DropMenu } from "./DropMenu";
import { postsService } from "../../api";
import { useNavigate } from "react-router-dom";

const PostsList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [availabilityExpanded, setAvailabilityExpanded] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(
    null
  );
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
  }, [categoryFilter, availabilityFilter, allPosts]);

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
            <span>{categoryFilter || "Todas"}</span>
            <span className="chevron">▾</span>
          </button>
          {categoryExpanded && (
            <div className="dropdown">
              <DropMenu
                data={categories}
                onSelect={(item: string) => {
                  setCategoryFilter(item === "Todas" ? null : item);
                  setCategoryExpanded(false);
                }}
              />
            </div>
          )}
        </div>

        <div className="filter-group">
          <button
            type="button"
            className="filter-btn"
            onClick={() => {
              setAvailabilityExpanded(!availabilityExpanded);
            }}
          >
            <span className="dot dot--on" />
            <span>
              {availabilityFilter
                ? "En la U ahora"
                : "Cualquier disponibilidad"}
            </span>
          </button>
          {availabilityExpanded && (
            <div className="dropdown">
              <DropMenu
                data={states}
                onSelect={(item: string) => {
                  setAvailabilityFilter(item === "En la U ahora" ? true : null);
                  setAvailabilityExpanded(false);
                }}
              />
            </div>
          )}
        </div>
      </section>

      <main className="home_grid">
        {posts.map((post) => (
          <PostComponent
            key={post.id}
            {...post}
            onPostClick={handlePostClick}
          />
        ))}
      </main>
    </div>
  );
};

export default PostsList;
