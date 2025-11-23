import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container, Alert } from "@mui/material";

interface LoginProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
  errorMessage: string | null;
}

const Login = ({ onLogin, errorMessage }: LoginProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onLogin(username, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
