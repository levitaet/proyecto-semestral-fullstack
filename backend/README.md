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
```


# Modelos
Los dividiremos en Users, Products y Posts, siendo posts la publicacion que contempla a un producto y opcionalmente a un usuario

