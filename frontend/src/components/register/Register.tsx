import { useState } from "react";
import "./Register.css";
import { usersService } from "../../api";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Alert } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const clean = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(clean);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.username.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres");
      setMessage(null);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setMessage(null);
      return;
    }

    try {
      await usersService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setMessage("Registro exitoso :)");
      setError(null);

      setTimeout(() => setMessage(null), 3000);
      setShowForm(false);
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Ocurrió un error al registrar el usuario :(");
      setMessage(null);
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
        {showForm ? (
          <>
            <Typography component="h1" variant="h5">
              Registrarse
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nombre de Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            {message && <Alert severity="success">{message}</Alert>}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate("/")}
            >
              Ir al inicio
            </Button>
          </Box>
        )}
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
      </Box>
    </Container>
  );
};

export default Register;
