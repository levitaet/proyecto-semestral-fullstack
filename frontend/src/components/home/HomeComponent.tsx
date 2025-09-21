import { useEffect, useState } from "react";
import "./HomeComponent.css";
import PostComponent from "../post/PostComponent";
import type { Post } from '../../types/post'
import axios from "axios";

const HomeComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => { //aqui los cargo del server
    console.log("entrando en use effect");
    axios.get("http://localhost:3001/posts").then((response) => {
      console.log("la llamada termino");
      setPosts(response.data);
    });
  }, []);

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

          <button type="button" className="filter-btn" onClick={() => {}}>
            <span>Todas</span>
            <span className="chevron">▾</span>
          </button>

          <button type="button" className="filter-btn" onClick={() => {}}>
            <span className="dot dot--on" />
            <span>En la U ahora</span>
          </button>
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
