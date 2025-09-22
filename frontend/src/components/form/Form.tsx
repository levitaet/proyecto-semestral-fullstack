import axios from "axios";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";

const Form = () => {
    const [formData, setFormData] = useState({
        product_name: "",
        description: "",
        price: "",
        image: "",
        tag: "",
        location: "",
        availability: false,
        stock: null as number | null,
        post_author: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };


    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
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
                type="number" 
                id="price" 
                name="price" 
                value={formData.price}
                onChange={handleChange}
                required 
            />

            <ImageUpload />

            <label htmlFor="tag">Categoría</label>
            <select 
                id="tag" 
                name="tag" 
                value={formData.tag}
                onChange={() =>handleChange}
                required
            >
                <option value="">Selecciona una</option>
                <option value="Comida">Comida</option>
                <option value="Ropa">Ropa</option>
                <option value="Libros">Libros</option>
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
                value={formData.stock ?? ""}
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
            </form>
        </div>
        );

};

export default Form;