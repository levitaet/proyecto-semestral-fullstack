# Pruebas E2E con Playwright

Este directorio contiene las pruebas end-to-end (E2E) del proyecto FCFMarket, implementadas con Playwright.

## Requisitos previos

- Node.js (v18 o superior)
- El backend debe estar corriendo en `http://localhost:3001`
- El frontend debe estar corriendo en `http://localhost:5173`
- MongoDB debe estar disponible para las pruebas

## Instalación

Desde el directorio `e2e-tests`, instala las dependencias:

```bash
cd e2e-tests
npm install
```

Si es la primera vez que usas Playwright, instala los navegadores:

```bash
npx playwright install
```

## Configuración del Backend en modo test

Para que las pruebas funcionen correctamente, el backend debe estar corriendo en modo test. Esto:
- Habilita el endpoint `/api/test/reset` que permite resetear la base de datos entre tests
- Usa el puerto 3001 (en lugar del 7103 del modo desarrollo)
- Usa una base de datos separada `test` (para no afectar tus datos de desarrollo)

Desde el directorio `backend`, ejecuta:

```bash
cd backend
npm run start:test
```

Este comando inicia el backend con `NODE_ENV=test`.

## Configuración del Frontend

Desde el directorio `frontend`, ejecuta:

```bash
cd frontend
npm run dev
```

Esto inicia el servidor de desarrollo en `http://localhost:5173`.

## Ejecutar los tests

Una vez que tanto el backend como el frontend estén corriendo:

### Ejecutar todos los tests

```bash
npm test
```

### Ejecutar tests en modo UI (interfaz visual)

```bash
npx playwright test --ui
```

### Ejecutar tests en modo debug

```bash
npx playwright test --debug
```

### Ejecutar un archivo de test específico

```bash
npx playwright test tests/auth.spec.ts
npx playwright test tests/posts-crud.spec.ts
```

### Ejecutar tests en un navegador específico

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Ver el reporte de tests

Después de ejecutar los tests, puedes ver el reporte HTML:

```bash
npm run test:report
```

Esto abrirá automáticamente el reporte en tu navegador.

## Estructura de los tests

```
e2e-tests/
├── tests/
│   ├── auth.spec.ts          # Tests de autenticación y acceso protegido
│   └── posts-crud.spec.ts    # Tests de CRUD de posts (crear, listar, ver, eliminar)
├── playwright.config.ts       # Configuración de Playwright
├── package.json
└── README.md
```

## Tests implementados

### 1. Autenticación y acceso protegido (`auth.spec.ts`)

- ✅ Redirección a `/login` cuando se intenta acceder a ruta protegida sin autenticación
- ✅ Redirección a `/login` cuando se intenta crear un post sin autenticación
- ✅ Login exitoso y acceso a perfil mediante click
- ✅ Login fallido con credenciales incorrectas
- ✅ Usuario autenticado puede acceder a crear post mediante click
- ✅ Usuario autenticado es redirigido desde `/login` a `/`
- ✅ Registro de nuevo usuario mediante click
- ✅ Cerrar sesión regresa a home sin autenticación

### 2. CRUD de Posts (`posts-crud.spec.ts`)

- ✅ Crear un nuevo post exitosamente
- ✅ Listar posts y verificar que el post creado aparece
- ✅ Ver detalles de un post
- ✅ Eliminar un post desde el perfil
- ✅ CRUD completo: Crear, Listar, Ver, Eliminar
- ✅ Verificar que solo el autor puede eliminar su post
- ✅ Validar campos requeridos al crear post

## Solución de problemas

### Error: "net::ERR_CONNECTION_REFUSED"

Asegúrate de que tanto el backend como el frontend estén corriendo:

```bash
# Terminal 1: Backend en modo test
cd backend
npm run start:test

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Tests
cd e2e-tests
npm test
```

