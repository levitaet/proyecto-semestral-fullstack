import "./HomeComponent.css";
import PostsList from "./PostsList";
import { useNavigate } from "react-router-dom";
import type { LoggedUser } from "../../api/login";

interface HomeComponentProps {
  user: LoggedUser | null;
  onLogout: () => Promise<void>;
}

const HomeComponent = ({ user, onLogout }: HomeComponentProps) => {
  const navigate = useNavigate();

  const handleShowForm = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/new-post");
  };

  const handleShowProfile = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/profile");
  };

  const handleLogout = async () => {
    await onLogout();
    navigate("/");
  };

  return (
    <div className="home">
      <div className="home_container">
        <header className="home_topbar">
          <div className="brand">
            <img src="/icon.svg" className="brand_avatar" alt="logo" />
            <button className="brand_name-btn" type="button" onClick={() => navigate("/")}>
              <span className="brand_name">FCFMarket</span>
            </button>
          </div>

          <div className="header-buttons">
            {user ? (
              <>
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
                <button 
                  className="user-profile-btn" 
                  type="button" 
                  onClick={handleShowProfile}
                  title="Ver mi perfil"
                >
                  <div className="user-avatar-small" />
                  <span className="user-name">{user.username}</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  className="btn-primary" 
                  type="button" 
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </button>
                <button 
                  className="btn-primary" 
                  type="button" 
                  onClick={() => navigate("/login")}
                >
                  Iniciar Sesión
                </button>
              </>
            )}
          </div>
        </header>

        <PostsList />
      </div>
    </div>
  );
};

export default HomeComponent;