import "./HomeComponent.css";
import PostsList from "./PostsList";
import PostDetail from "../post/PostDetail";
import Register from "../register/Register";
import Login from "../login/Login";
import Profile from "../profile/Profile";
import { loginService } from "../../api/loginService";
import { useUserStore } from "../../usersStore";
import { useNavigate } from "react-router-dom";
import type { LoggedUser } from "../../types/user";


interface HomeComponentProps {
  user: LoggedUser | null;
  onLogout: () => Promise<void>;
}

  const store = useUserStore();

  // useEffect(() => {
  //   const init = async () => {
  //     const user = await loginService.restoreLogin();
  //     store.setUser(user);
  //   };
  //   init();
  // }, []);

const HomeComponent = ({ user, onLogout }: HomeComponentProps) => {
  const navigate = useNavigate();

  const handleShowForm = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/new-post");
  };

  //     if (!store.user) {
  //     setShowLogin(true);
  //     return;
  //   }
  //   setSelectedPostId(null);
  //   setShowForm(false);
  //   setShowRegister(false);
  //   setShowLogin(false);
  //   setShowProfile(true);
  // };

  // const handleLogin = async (username: string, password: string) => {
  //   try {
  //     const user = await loginService.login({ username, password });
  //     store.setUser(user);
  //     setErrorMessage(null);
  //     setShowLogin(false);
  //   } catch (_error) {
  //     setErrorMessage("Usuario o contraseña incorrectos");
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 5000);
  //   }
  // };

  // const handleLogout = async () => {
  //   await loginService.logout();
  //   store.setUser(null);
  //   handleGoBack();

  const handleShowProfile = () => {
    if (!store.user) {
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
            {store.user ? (
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
                  <span className="user-name">{store.user.username}</span>
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