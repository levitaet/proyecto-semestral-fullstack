import { useState } from "react";
import "./HomeComponent.css";
import Form from "../form/Form";
import PostsList from "./PostsList";
import PostDetail from "../post/PostDetail";
import Register from "../register/Register";

const HomeComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handlePostClick = (id: number) => {
    setSelectedPostId(id);
  };

  const handleGoBack = () => {
    setSelectedPostId(null);
    setShowForm(false);
    setShowRegister(false);
  };

  return (
    <div className="home">
      <div className="home_container">
        <header className="home_topbar">
          <div className="brand">
            <img src="/icon.svg" className="brand_avatar" alt="logo" />
            <span className="brand_name">FCFMarket</span>
          </div>

          <div className="header-buttons">
            <button 
              className="btn-primary" 
              type="button" 
              onClick={() => setShowRegister(!showRegister)}
            >
              Registrarse
            </button>
            <button 
              className="btn-primary" 
              type="button" 
              onClick={() => setShowForm(!showForm)}
            >
              + Agregar Producto
            </button>
          </div>

          <div className="user-avatar" />
        </header>

        {selectedPostId ? (
          <PostDetail postId={selectedPostId} onGoBack={handleGoBack} />
        ) : showRegister ? (
          <Register goBack={() => setShowRegister(false)} />
        ) : showForm ? (
          <Form goBack={() => setShowForm(false)} />
        ) : (
          <PostsList onPostClick={handlePostClick} />
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
