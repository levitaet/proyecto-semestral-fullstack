import { useState, useEffect } from "react";
import './Form.css';
import { postsService } from "../../api";
import { ImageUpload } from "./ImageUpload";
import { useNavigate } from "react-router-dom";
import { 
    Container, Box, Typography, TextField, Button, Alert, Select, MenuItem, 
    FormControl, InputLabel, Checkbox, FormControlLabel, Chip, Stack 
} from "@mui/material";

const Form = () => {
    const navigate = useNavigate();
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
        file: null as File | null,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | import('@mui/material').SelectChangeEvent) => {
        const { name, value} = e.target;
        const type = (e.target as HTMLInputElement).type; 
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
            setError("Ocurrió un error al agregar el producto. Debes iniciar sesión.");
            setMessage(null);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showForm ? (
                    <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate sx={{ mt: 1, width: '100%' }}>
                        <Typography component="h1" variant="h5" align="center">
                            Agregar Producto
                        </Typography>
                        
                        <TextField margin="normal" required fullWidth id="title" label="Título de la Publicación" name="title" value={formData.title} onChange={handleChange} autoFocus />
                        <TextField margin="normal" required fullWidth id="product_name" label="Nombre del Producto/Servicio" name="product_name" value={formData.product_name} onChange={handleChange} />
                        <TextField margin="normal" required fullWidth multiline rows={4} id="description" label="Descripción" name="description" value={formData.description} onChange={handleChange} />
                        <TextField margin="normal" required fullWidth type="number" id="price" label="Precio" name="price" value={formData.price === 0 ? "" : formData.price} onChange={handleChange} InputProps={{ inputProps: { min: 0 } }} />
                        
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="category-label">Categoría</InputLabel>
                            <Select labelId="category-label" id="category" name="category" value={formData.category} label="Categoría" onChange={handleChange}>
                                {availableCategories.map((cat) => (
                                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyUp={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                                placeholder="Escribe un tag y presiona Enter"
                            />
                            <Button variant="outlined" onClick={handleAddTag}>Agregar</Button>
                        </Box>
                        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                            {formData.tags.map((tag) => (
                                <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} />
                            ))}
                        </Stack>

                        <TextField margin="normal" required fullWidth id="location" label="Ubicación" name="location" value={formData.location} onChange={handleChange} />
                        <TextField margin="normal" fullWidth type="number" id="stock" label="Stock" name="stock" value={formData.stock ?? ""} onChange={handleChange} />

                        <FormControlLabel control={<Checkbox name="availability" checked={formData.availability} onChange={handleChange} />} label="Disponible en la U ahora" />

                        <Box mt={2} mb={2}>
                            <Typography variant="subtitle1">Imagen del Producto</Typography>
                            <ImageUpload onImageSelect={(file) => formData.file = file} />
                        </Box>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Publicar</Button>
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button variant="contained" onClick={() => navigate("/")}>Volver al Inicio</Button>
                            <Button variant="outlined" onClick={() => { setFormData(clean); setShowForm(true); }}>Agregar otro producto</Button>
                        </Stack>
                    </Box>
                )}
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
            </Box>
        </Container>
    );
};

export default Form;