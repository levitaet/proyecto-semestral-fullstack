# proyecto-semestral-fullstack

Se requieren dos terminales

## terminal 1: back
```pws
cd backend
npm run build
npm start
```

inicia el server

## terminal 2: front
```pws
cd frontend
npm run dev
```
inicia el frontend



# Informe Hito 3 – FCFMarket

## 1. Tema General del Proyecto
FCFMarket es una aplicación web (SPA) que centraliza la oferta de productos y servicios de estudiantes. Hoy la venta ocurre en redes como WhatsApp/Instagram, lo que obliga a los vendedores a repostear para mantener visibilidad y dificulta a los compradores saber quién está disponible en el campus para concretar la entrega.

La solución propone un único catálogo filtrable donde cada vendedor crea su tienda y publica productos con precio, stock, categoría, ubicación y fotos. Un indicador de "En la U" permite señalizar disponibilidad en tiempo real, de modo que los compradores puedan encontrar rápidamente qué hay cerca y coordinar la entrega presencial sin problemas.

## 2. Estructura del Estado Global
Para el estado avanzado, se eligió utilizar Zustand.

### Stores implementados
`UserStore`
- Mantiene la información del usuario autenticado
- Gestiona login, logout y acceso global al estado

`PostsStore`
- Almacena productos publicados
- Gestiona filtros por categoría y disponibilidad
- Expone funciones para agregar, editar y actualizar posts

## 3. Pruebas E2E

El proyecto incluye pruebas end-to-end (E2E) implementadas con Playwright. Las pruebas cubren:

1. **Autenticación y acceso protegido**: Login, registro, y protección de rutas
2. **CRUD de Posts**: Crear, listar, ver detalles y eliminar publicaciones

### Ejecutar las pruebas E2E

Para ejecutar las pruebas E2E, necesitas tres terminales:

#### Terminal 1: Backend en modo test
```bash
cd backend
npm run start:test
```

#### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

#### Terminal 3: Tests E2E
```bash
cd e2e-tests
npm install  # Solo la primera vez
npx playwright install  # Solo la primera vez
npm test
```

### Ver reporte de tests

```bash
cd e2e-tests
npm run test:report
```

Para más detalles sobre las pruebas E2E, consulta el [README de e2e-tests](./e2e-tests/README.md).

## 4. Mapa de Rutas y Flujo de Autenticación

### Rutas principales
- `/` — catálogo público  
- `/post/:id` — detalle de producto  
- `/register` y `/login`
- `/profile` y `/new-post`

### Flujo de autenticación
1. Registro con validación y hash de contraseña
2. Login con: 
   - generación de JWT 
   - cookie httpOnly + token CSRF separado 
3. Restauración automática de sesión al cargar la app 
4. Middleware backend que valida JWT + coincidencia CSRF 
5. Logout limpiando cookie, CSRF y estado global

## 5. Librería de Estilos y Decisiones de Diseño

### Librería utilizada: Material-UI (MUI)
Se seleccionó debido a:
- componentes reutilizables
- sistema de theming integrado

### Decisiones de diseño
- Color principal: morado `#aa6eae`
- Fondo: lila `#fef0ff`
- Tipografía: Nunito

## 6. Aplicación desplegada
```
colocar link aqui
```