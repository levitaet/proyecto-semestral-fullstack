import { useState } from "react";
import "./HomeComponent.css";
import Form from "../form/Form";
import PostsList from "./PostsList";
import PostDetail from "../post/PostDetail";

const HomeComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handlePostClick = (id: number) => {
    setSelectedPostId(id);
  };

  const handleGoBack = () => {
    setSelectedPostId(null);
    setShowForm(false);
  };

  return (
    <div className="home">
      <div className="home_container">
        <header className="home_topbar">
          <div className="brand">
            <img src="/icon.svg" className="brand_avatar" alt="logo" />
            <span className="brand_name">FCFMarket</span>
          </div>
          <button className="btn-primary" type="button" onClick={() => setShowForm(!showForm)}>+ Agregar Producto</button>
          <div className="user-avatar" />
        </header>

        {selectedPostId ? (
          <PostDetail postId={selectedPostId} onGoBack={handleGoBack} />
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
