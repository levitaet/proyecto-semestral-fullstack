import { useState, useEffect } from "react";
import "./HomeComponent.css";
import Form from "../form/Form";
import PostsList from "./PostsList";
import PostDetail from "../post/PostDetail";
import Register from "../register/Register";
import Login from "../login/Login";
import { loginService } from "../../api/login";
import type { LoggedUser } from "../../api/login";

const HomeComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const user = await loginService.restoreLogin();
      setUser(user);
    };
    init();
  }, []);

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
  };

  const handleGoBack = () => {
    setSelectedPostId(null);
    setShowForm(false);
    setShowRegister(false);
    setShowLogin(false);
  };

  const handleShowForm = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setSelectedPostId(null);
    setShowRegister(false);
    setShowLogin(false);
    setShowForm(true);
  };

  const handleShowRegister = () => {
    setSelectedPostId(null);
    setShowForm(false);
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleShowLogin = () => {
    setSelectedPostId(null);
    setShowForm(false);
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setErrorMessage(null);
      setShowLogin(false);
    } catch (_error) {
      setErrorMessage("Usuario o contraseña incorrectos");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    await loginService.logout();
    setUser(null);
    handleGoBack();
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
            {user ? (
              <>
                <span className="user-name">Hola, {user.username}</span>
                <button 
                  className="btn-primary" 
                  type="button" 
                  onClick={handleShowForm}
                >
                  + Agregar Producto
                </button>
                <button 
                  className="btn-secondary" 
                  type="button" 
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
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
                  onClick={handleShowLogin}
                >
                  Iniciar Sesión
                </button>
              </>
            )}
          </div>

          <div className="user-avatar" />
        </header>

        {selectedPostId ? (
          <PostDetail postId={selectedPostId} onGoBack={handleGoBack} />
        ) : showRegister ? (
          <Register goBack={() => setShowRegister(false)} />
        ) : showLogin ? (
          <Login onLogin={handleLogin} errorMessage={errorMessage} />
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