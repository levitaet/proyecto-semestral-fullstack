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


# Modelos
Los dividiremos en Users, Products y Posts, siendo posts la publicacion que contempla a un producto y opcionalmente a un usuario

Un producto tendra un listado de imagenes que se guardaran en la carpeta uploads que podran ser subidas con la libreria `multer`


# End Points
Se habilitaron los endpoints para obtener el listado de products, users y posts mediante el prefijo "api/", con finalidad de separar del acceso directo de la pagina "/" para el publico general. Todos cuentan con las requests get y post, con sus respectivos fields a ser llenados segun cada modelo
- api/users
- api/products
- api/posts