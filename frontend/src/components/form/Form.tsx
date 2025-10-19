import { useState, useEffect } from "react";
import './Form.css';
import { postsService } from "../../api";

const Form = (props : {goBack: () => void}) => {
    const clean = {
        title: "",
        product_name: "",
        description: "",
        price: 0,
        tags: [] as string[],
        category: "Otros",
        location: "",
        availability: false,
        stock: null as number | null,
        author_name: "",
    };
    const [formData, setFormData] = useState(clean);
    const [tagInput, setTagInput] = useState("");

    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        postsService.getCategories().then((response) => {
            setAvailableCategories(response);
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked,
            });
        } else if (name === "price" || name === "stock") {
            setFormData({
                ...formData,
                [name]: value === "" ? (name === "price" ? 0 : null) : Number(value),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            });
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await postsService.create(formData);
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

                    <label htmlFor="title">Título de la Publicación</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={formData.title}
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="product_name">Nombre del Producto/Servicio</label>
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
                        value={formData.price === 0 ? "" : formData.price}
                        onChange={handleChange}
                        required 
                    />

                    <label htmlFor="category">Categoría</label>
                    <select 
                        id="category" 
                        name="category" 
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        {availableCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <label htmlFor="tags">Tags (Escribe y presiona "Agregar")</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input 
                            type="text" 
                            id="tagInput" 
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                            placeholder="Escribe un tag..."
                        />
                        <button 
                            type="button" 
                            onClick={handleAddTag}
                            className="btn-secondary"
                        >
                            Agregar
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        {formData.tags.map((tag, index) => (
                            <span 
                                key={index} 
                                style={{ 
                                    background: '#e0e0e0', 
                                    padding: '4px 8px', 
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                {tag}
                                <button 
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

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

                    <label htmlFor="author_name">Tu nombre</label>
                    <input 
                        type="text" 
                        id="author_name" 
                        name="author_name" 
                        value={formData.author_name}
                        onChange={handleChange}
                        placeholder="Ingresa tu nombre"
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