import axios from "axios";
import { useState, useEffect } from "react";
import './Form.css';
// import { ImageUpload } from "./ImageUpload";

const Form = (props : {goBack: () => void}) => {
    const clean = {
        product_name: "",
        description: "",
        price: "",
        image: "/img/no-image.png",
        tag: "Selecciona una categoría",
        location: "",
        availability: false,
        stock: null as number | null,
        post_author: "",
    };
    const [formData, setFormData] = useState(clean);

    const [tags, setTags] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3001/tags").then((response) => {
        const tagNames = response.data.map((t: {id: number, name: string}) => t.name);
        setTags(tagNames);
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
        setFormData({
            ...formData,
            [name]: (e.target as HTMLInputElement).checked, // forzamos TS a saber que es un input
        });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/posts", formData);
            console.log("Product added:", response.data);
            setMessage("Producto agregado correctamente :)");
            setError(null);

            setTimeout(() => setMessage(null), 3000);
            setShowForm(false);
        } catch (error) {
            console.error("Error adding product:", error);
            setError("Ocurrió un error al agregar el producto :(");
            setMessage(null);
        }
    };


    return (
        <div className="form-container">
            {showForm 
                ? (<form className="form" onSubmit={handleSubmit}>
                    <h2 className="form-title">Agregar Producto</h2>

                    <label htmlFor="product_name">Nombre del Producto</label>
                    <input 
                        type="text" 
                        id="product_name" 
                        name="product_name" 
                        value={formData.product_name}
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="description">Descripción</label>
                    <textarea 
                        id="description" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required 
                    />

                    <label htmlFor="price">Precio</label>
                    <input 
                        type="text" 
                        id="price" 
                        name="price" 
                        value={formData.price}
                        onChange={handleChange}
                        required 
                    />

                    {/* <ImageUpload /> */}

                    <label htmlFor="tag">Categoría</label>
                    <select 
                        id="tag" 
                        name="tag" 
                        value={formData.tag}
                        onChange={handleChange}
                        required
                    >
                        <option value="">{formData.tag}</option>
                        {tags.map((tag) => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>

                    <label htmlFor="location">Ubicación</label>
                    <input 
                        type="text" 
                        id="location" 
                        name="location" 
                        value={formData.location}
                        onChange={handleChange}
                        required 
                    />

                    <label>
                        Disponible en la U ahora
                        <input 
                        type="checkbox" 
                        name="availability" 
                        checked={formData.availability}
                        onChange={handleChange}
                        />
                    </label>

                    <label htmlFor="stock">Stock</label>
                    <input 
                        type="number" 
                        id="stock" 
                        name="stock" 
                        value={formData.stock ? Math.max(formData.stock, 0) : ""}
                        onChange={handleChange}
                    />

                    <label htmlFor="post_author">Autor</label>
                    <input 
                        type="text" 
                        id="post_author" 
                        name="post_author" 
                        value={formData.post_author}
                        onChange={handleChange}
                        required 
                    />

                    <button type="submit" className="btn-primary">Publicar</button>
                    </form>) 
            : <div>
                <button className="btn-primary" type="button" onClick={props.goBack}>Volver</button>
                <button className="btn-primary" type="button" onClick={() => {
                    setFormData(clean);
                    setShowForm(true);
                }}>Agregar otro producto</button>
                {message && <p className="success-message">{message}</p>}
            </div>
            }

            
            {error && <p className="error-message">{error}</p>}

        </div>
        );

};

export default Form;