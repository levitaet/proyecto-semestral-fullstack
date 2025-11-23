import "./HomeComponent.css";
import PostsList from "./PostsList";
import { loginService } from "../../api/loginService";
import { useUserStore } from "../../usersStore";
import { useNavigate } from "react-router-dom";


interface HomeComponentProps {
  onLogout: () => Promise<void>;
}

  // useEffect(() => {
  //   const init = async () => {
  //     const user = await loginService.restoreLogin();
  //     store.setUser(user);
  //   };
  //   init();
  // }, []);

const HomeComponent = ({ onLogout }: HomeComponentProps) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

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
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/profile");
  };

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    } else {
      await loginService.logout();
      setUser(null);
    }
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