import { useState } from "react";
import "./HomeComponent.css";
import Form from "../form/Form";
import PostsList from "./PostsList";
import PostDetail from "../post/PostDetail";
import Register from "../register/Register";

const HomeComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
  };

  const handleGoBack = () => {
    setSelectedPostId(null);
    setShowForm(false);
    setShowRegister(false);
  };

  const handleShowForm = () => {
    setSelectedPostId(null);
    setShowRegister(false);
    setShowForm(true);
  };

  const handleShowRegister = () => {
    setSelectedPostId(null);
    setShowForm(false);
    setShowRegister(true);
  };

  return (
    <div className="home">
      <div className="home_container">
        <header className="home_topbar">
          <div className="brand">
            <img src="/icon.svg" className="brand_avatar" alt="logo" />
            <button className="brand_name-btn" type="button" onClick={handleGoBack}>
              <span className="brand_name">FCFMarket</span>
            </button>
          </div>

          <div className="header-buttons">
            <button 
              className="btn-primary" 
              type="button" 
              onClick={handleShowRegister}
            >
              Registrarse
            </button>
            <button 
              className="btn-primary" 
              type="button" 
              onClick={handleShowForm}
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