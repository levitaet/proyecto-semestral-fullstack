import { useState } from "react";
import './Register.css';
import { usersService } from "../../api";

const Register = (props: { goBack: () => void }) => {
    const clean = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
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
                password: formData.password
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
        <div className="form-container">
            {showForm 
                ? (
                    <form className="form" onSubmit={handleSubmit}>
                        <h2 className="form-title">Registrarse</h2>

                        <label htmlFor="username">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange} 
                            required 
                        />

                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />

                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />

                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                        />

                        <button type="submit" className="btn-primary">Registrarse</button>
                    </form>
                ) 
                : (
                    <div>
                        <p className="success-message">{message}</p>
                        <button className="btn-primary" type="button" onClick={props.goBack}>
                            Ir al inicio
                        </button>
                    </div>
                )
            }
            
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Register;