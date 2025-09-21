import { useEffect, useState } from "react";
import "./HomeComponent.css";
import PostComponent from "../post/PostComponent";
import type { Post } from '../../types/post'
import axios from "axios";
import { DropMenu } from "./DropMenu";

const HomeComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tagExpanded, setTagExpanded] = useState(false);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [availabilityExpanded, setAvailabilityExpanded] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/tags").then((response) => {
      setTags(response.data);
    });
  }, []);

  function filteredPosts(postsData: Post[]): Post[] {
    return postsData.filter((post) => {
      if (tagFilter && post.tag !== tagFilter) {
        return false;
      }
      if (availabilityFilter && post.availability !== availabilityFilter) {
        return false;
      }
      return true;
    });
  };

  useEffect(() => { //aqui los cargo del server
    // console.log("entrando en use effect");
    axios.get("http://localhost:3001/posts").then((response) => {
      // console.log("la llamada termino");
      setPosts(filteredPosts(response.data));
    });
  }, [tagFilter, availabilityFilter]);

  return (
    <div className="home">
      <div className="home_container">
        <header className="home_topbar">
          <div className="brand">
            <img src="/icon.svg" className="brand_avatar" alt="logo" />
            <span className="brand_name">FCFMarket</span>
          </div>
          <button className="btn-primary" type="button">+ Agregar Producto</button>
          <div className="user-avatar" />
        </header>

        <section className="home_filters">
          <button type="button" className="filter-btn filter-btn--search" onClick={() => {}}>
            <img src="/search-icon.svg" width="18" height="18" alt="lupita" />
            <span>Buscar productos o vendedores...</span>
          </button>

          <div className="filter-group">
            <button type="button" className="filter-btn" onClick={() => {
              setTagExpanded(!tagExpanded);
            }}>
              <span>{tagFilter || "Todas"}</span>
              <span className="chevron">▾</span>
            </button>
            {tagExpanded && (
              <div className="dropdown">
                <DropMenu 
                  data={tags}
                  onSelect={(item : string) => {
                    setTagFilter(item);
                    setTagExpanded(false);
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
              <span>{availabilityFilter ? "En la U ahora" : "Cualquier disponibilidad"}</span>
            </button>
            {availabilityExpanded && (
              <div className="dropdown">
                <DropMenu 
                  data={["En la U ahora", "Cualquier disponibilidad"]}
                  onSelect={(item : string) => {
                    setAvailabilityFilter(item === "En la U ahora");
                    setAvailabilityExpanded(false);
                  }}
                />
              </div>
            )}
          </div>

        </section>

        <main className="home_grid">
          {posts.map((post) => (
            <PostComponent key={post.id} {...post} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default HomeComponent;
