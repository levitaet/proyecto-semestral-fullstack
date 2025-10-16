# Estructura del backend

```
backend/    
└── src/
    ├── controllers/
    ├── middleware/
    └── models/
        ├── ...
    └── utils/
        ├── config.ts
        └── logger.ts
    └── app.ts
    └── index.ts
└── tests/
└── uploads/
```
para compilar con `npx tsc` y correr con `npm start`

# Modelos
Los dividiremos en Users, Products, Posts y Tags, siendo posts la publicacion que contempla a un producto ofrecido por un usuario, y con ciertas tags para su busqueda.

Un producto tendra un listado de imagenes que se guardaran en la carpeta uploads que podran ser subidas con la libreria `multer`


# End Points
Se habilitaron los endpoints para obtener el listado de products, users y posts mediante el prefijo "api/", con finalidad de separar del acceso directo de la pagina "/" para el publico general. Todos cuentan con las requests get y post, con sus respectivos fields a ser llenados segun cada modelo
- api/users
- api/products
- api/posts
- api/posts/tags