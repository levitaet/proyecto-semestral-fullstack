import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <label htmlFor="username">Usuario</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
