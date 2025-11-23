import "./PostComponent.css";
import {BACKEND_URL} from "../../api/http";
import React from "react";
import { 
    Card, CardMedia, CardContent, Typography, Box, Chip, Button, CardActions 
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';


interface PostComponentProps {
  id: string;
  title: string;
  product_name: string;
  price: number;
  author_name: string;
  tags: string[];
  category: string;
  location: string;
  availability: boolean;
  stock: number | null;
  image: string;
  onPostClick?: (id: string) => void;
}

const PostComponent = React.forwardRef<HTMLDivElement, PostComponentProps>(
  (
    {
      id,
      title,
      product_name,
      price,
      category,
      location,
      availability,
      stock,
      image,
      onPostClick,
    },
    ref
  ) => {
    const handleClick = () => {
      if (onPostClick) {
        onPostClick(id);
      }
    };

    return (
      <Card 
        ref={ref}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="180"
            image={`${BACKEND_URL}${image}`}
            alt={product_name}
          />
          <Chip 
            label={category} 
            size="small"
            sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white' }} 
          />
          <Chip
            label={availability ? "En la U" : "No disponible"}
            color={availability ? "success" : "default"}
            size="small"
            sx={{ position: 'absolute', bottom: 8, left: 8 }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h3" noWrap>
            {title}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h5" color="primary">
              ${price.toLocaleString("es-CL")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock: {stock ?? "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">
              {location ?? "Contactar"}
            </Typography>
          </Box>
        </CardContent>

        <CardActions>
          <Button size="small" fullWidth variant="outlined" onClick={handleClick}>
            Ver Detalles
          </Button>
        </CardActions>
      </Card>
    );
  }
);

export default PostComponent;