import "./HomeComponent.css";
import PostsList from "./PostsList";
import { loginService } from "../../api/loginService";
import { useUserStore } from "../../usersStore";
import { useNavigate } from "react-router-dom";
import type { LoggedUser } from "../../api/login";
import { AppBar, Toolbar, Button, Box, Typography, Avatar, Container } from "@mui/material";

interface HomeComponentProps {
  onLogout: () => Promise<void>;
}


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
    <Box sx={{ backgroundColor: '#fef0ff', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#222', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', border: '2px solid #e9d9f2' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              component="img"
              src="/icon.svg"
              alt="logo"
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Button color="inherit" onClick={() => navigate("/")} sx={{ color: '#222', p: 0 }}>
              <Typography variant="h6" component="span" sx={{ fontWeight: 800 }}>
                FCFMarket
              </Typography>
            </Button>
          </Box>

          <Box>
            {user ? (
              <>
                <Button 
                  variant="contained" 
                  onClick={handleShowForm} 
                  sx={{ 
                    mr: 2,
                    backgroundColor: '#aa6eae',
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: '999px',
                    '&:hover': {
                      backgroundColor: '#9a5e9e'
                    }
                  }}
                >
                  + Agregar Producto
                </Button>
                <Button 
                  onClick={handleLogout} 
                  sx={{ 
                    mr: 2, 
                    color: '#222',
                    fontWeight: 700,
                    borderRadius: '999px'
                  }}
                >
                  Cerrar Sesión
                </Button>
                <Button 
                  onClick={handleShowProfile} 
                  title="Ver mi perfil" 
                  startIcon={<Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #aa6eae 0%, #764ba2 100%)' }} />}
                  sx={{ 
                    color: '#222',
                    fontWeight: 600,
                    borderRadius: '999px'
                  }}
                >
                  {user.username}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => navigate("/register")}
                  sx={{ 
                    color: '#222',
                    fontWeight: 700,
                    borderRadius: '999px'
                  }}
                >
                  Registrarse
                </Button>
                <Button 
                  onClick={() => navigate("/login")}
                  sx={{ 
                    color: '#222',
                    fontWeight: 700,
                    borderRadius: '999px'
                  }}
                >
                  Iniciar Sesión
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <PostsList />
      </Container>
    </Box>
  );
};

export default HomeComponent;