import { useState } from "react";
import "./HomeComponent.css";
import Form from "../form/Form";
import PostsList from "./PostsList";

const HomeComponent = () => {
  const [showForm, setShowForm] = useState(false);

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
        {showForm ? <Form /> : <PostsList />}
      </div>
    </div>
  );
};

export default HomeComponent;
