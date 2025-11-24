# proyecto-semestral-fullstack

> [!NOTE]  
> La barra de buscar, el botón "Ver Detalles" y la opción de subir una imagen en el formulario están pendientes (de haberlos, los botones no hacen nada).

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
inicia el backend




Usuarios registrados:

user: felipe
pass: ola123

user: Juanito
pass: vendopan

user: Pablito
pass: agoclase

## Pruebas E2E

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