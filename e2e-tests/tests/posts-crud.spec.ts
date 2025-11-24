import { test, expect } from "@playwright/test";

test.describe("CRUD de Posts (Productos)", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/test/reset");

    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Usuario Test",
        username: "testuser",
        password: "testpass123",
        email: "test@test.com",
      },
    });

    await page.goto("/");
    await page.getByRole("button", { name: "Iniciar Sesión" }).click();
    await page.getByLabel("Usuario").fill("testuser");
    await page.getByLabel("Contraseña").fill("testpass123");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page).toHaveURL("/");
  });

  test("Crear un nuevo post exitosamente", async ({ page }) => {
    await page.getByRole("button", { name: /agregar producto/i }).click();
    await expect(page).toHaveURL("/new-post");

    await page.getByLabel("Título de la Publicación").fill("Laptop HP Pavilion");
    await page.getByLabel("Nombre del Producto/Servicio").fill("Laptop HP");
    await page.getByLabel("Descripción").fill("Laptop en excelente estado, ideal para programar");
    await page.getByLabel("Precio").fill("350000");
    await page.getByLabel("Categoría").selectOption("Electrónica");
    await page.getByLabel("Ubicación").fill("Campus San Joaquín");

    await page.locator("#tagInput").fill("laptop");
    await page.getByRole("button", { name: "Agregar" }).click();
    await page.locator("#tagInput").fill("computador");
    await page.getByRole("button", { name: "Agregar" }).click();

    await page.getByLabel(/disponible en la u ahora/i).check();
    await page.getByLabel("Stock").fill("1");

    await page.getByRole("button", { name: "Publicar" }).click();
    await expect(page.getByText(/agregado correctamente|éxito/i)).toBeVisible();
  });

  test("Listar posts y verificar que el post creado aparece", async ({ page }) => {
    await page.getByRole("button", { name: /agregar producto/i }).click();
    await expect(page).toHaveURL("/new-post");

    await page.getByLabel("Título de la Publicación").fill("Laptop HP Pavilion");
    await page.getByLabel("Nombre del Producto/Servicio").fill("Laptop HP");
    await page.getByLabel("Descripción").fill("Laptop en excelente estado, ideal para programar");
    await page.getByLabel("Precio").fill("350000");
    await page.getByLabel("Categoría").selectOption("Electrónica");
    await page.getByLabel("Ubicación").fill("Campus San Joaquín");

    await page.locator("#tagInput").fill("laptop");
    await page.getByRole("button", { name: "Agregar" }).click();
    await page.locator("#tagInput").fill("computador");
    await page.getByRole("button", { name: "Agregar" }).click();

    await page.getByLabel(/disponible en la u ahora/i).check();
    await page.getByLabel("Stock").fill("1");

    await page.getByRole("button", { name: "Publicar" }).click();

    await page.getByRole("button", { name: "Volver" }).click();
    await expect(page).toHaveURL("/");

    await expect(page.getByText("Laptop HP Pavilion")).toBeVisible();
    await expect(page.getByText("$350.000")).toBeVisible();
  });

  test("Ver detalles de un post", async ({ page }) => {
    await page.getByRole("button", { name: /agregar producto/i }).click();
    await expect(page).toHaveURL("/new-post");

    await page.getByLabel("Título de la Publicación").fill("Laptop HP Pavilion");
    await page.getByLabel("Nombre del Producto/Servicio").fill("Laptop HP");
    await page.getByLabel("Descripción").fill("Laptop en excelente estado, ideal para programar");
    await page.getByLabel("Precio").fill("350000");
    await page.getByLabel("Categoría").selectOption("Electrónica");
    await page.getByLabel("Ubicación").fill("Campus San Joaquín");

    await page.locator("#tagInput").fill("laptop");
    await page.getByRole("button", { name: "Agregar" }).click();
    await page.locator("#tagInput").fill("computador");
    await page.getByRole("button", { name: "Agregar" }).click();

    await page.getByLabel(/disponible en la u ahora/i).check();
    await page.getByLabel("Stock").fill("1");

    await page.getByRole("button", { name: "Publicar" }).click();

    await page.getByRole("button", { name: "Volver" }).click();
    await expect(page).toHaveURL("/");

    await page.getByRole("button", { name: "Ver Detalles" }).click();

    await expect(page.getByText("Laptop HP")).toBeVisible();
    await expect(page.getByText("Laptop en excelente estado, ideal para programar")).toBeVisible();
    await expect(page.getByText("$350.000")).toBeVisible();
  });

  test("Eliminar un post desde el perfil", async ({ page }) => {
    await page.getByRole("button", { name: /agregar producto/i }).click();

    await page.getByLabel("Título de la Publicación").fill("Post a Eliminar");
    await page.getByLabel("Nombre del Producto/Servicio").fill("Producto Test");
    await page.getByLabel("Descripción").fill("Este post será eliminado");
    await page.getByLabel("Precio").fill("1000");
    await page.getByLabel("Ubicación").fill("Campus");

    await page.getByRole("button", { name: "Publicar" }).click();
    await expect(page.getByText(/agregado correctamente|éxito/i)).toBeVisible();

    await page.getByRole("button", { name: "Volver" }).click();
    await page.getByRole("button", { name: "testuser" }).click();
    await expect(page).toHaveURL("/profile");

    await expect(page.getByText("Post a Eliminar")).toBeVisible();

    await page.evaluate(() => {
      window.confirm = () => true;
    });

    await page.getByRole("button", { name: /eliminar/i }).first().click();
    await expect(page.getByText("Post a Eliminar")).not.toBeVisible();
    await expect(page.getByText(/aún no has publicado nada/i)).toBeVisible();
  });

  test("CRUD completo: Crear, Listar, Ver, Eliminar", async ({ page }) => {
    await page.getByRole("button", { name: /agregar producto/i }).click();

    await page.getByLabel("Título de la Publicación").fill("Bicicleta MTB");
    await page.getByLabel("Nombre del Producto/Servicio").fill("Bicicleta de Montaña");
    await page.getByLabel("Descripción").fill("Bicicleta todo terreno en excelente estado");
    await page.getByLabel("Precio").fill("120000");
    await page.getByLabel("Categoría").selectOption("Otros");
    await page.getByLabel("Ubicación").fill("Estacionamiento");
    await page.getByLabel("Stock").fill("1");

    await page.getByRole("button", { name: "Publicar" }).click();
    await expect(page.getByText(/agregado correctamente|éxito/i)).toBeVisible();

    await page.getByRole("button", { name: "Volver" }).click();
    await expect(page.getByText("Bicicleta MTB")).toBeVisible();

    await page.getByRole("button", { name: "Ver Detalles" }).click();

    await expect(page.getByText("Bicicleta de Montaña")).toBeVisible();
    await expect(page.getByText("$120.000")).toBeVisible();
    await expect(page.getByText("Estacionamiento")).toBeVisible();

    await page.getByText("Volver").click();
    await page.getByRole("button", { name: "testuser" }).click();
    await expect(page).toHaveURL("/profile");

    await expect(page.getByText("Bicicleta MTB")).toBeVisible();

    await page.evaluate(() => {
      window.confirm = () => true;
    });

    await page.getByRole("button", { name: /eliminar/i }).first().click();
    await expect(page.getByText("Bicicleta MTB")).not.toBeVisible();
    await expect(page.getByText(/aún no has publicado nada/i)).toBeVisible();

    await page.getByText("Volver").click();
    await expect(page.getByText("Bicicleta MTB")).not.toBeVisible();
  });

  test("Verificar que solo el autor puede eliminar su post", async ({ page, request }) => {
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Usuario 2",
        username: "user2",
        password: "pass123",
        email: "user2@test.com",
      },
    });

    await page.getByRole("button", { name: /agregar producto/i }).click();
    await page.getByLabel("Título de la Publicación").fill("Post de Usuario 1");
    await page.getByLabel("Nombre del Producto/Servicio").fill("Producto User1");
    await page.getByLabel("Descripción").fill("Este post es del usuario 1");
    await page.getByLabel("Precio").fill("5000");
    await page.getByLabel("Ubicación").fill("Campus");
    await page.getByRole("button", { name: "Publicar" }).click();

    await page.getByRole("button", { name: "Volver" }).click();
    await page.getByRole("button", { name: /cerrar sesión/i }).click();

    await page.getByRole("button", { name: "Iniciar Sesión" }).click();
    await page.getByLabel("Usuario").fill("user2");
    await page.getByLabel("Contraseña").fill("pass123");
    await page.getByRole("button", { name: "Entrar" }).click();

    await page.getByRole("button", { name: "user2" }).click();
    await expect(page).toHaveURL("/profile");

    await expect(page.getByText("Post de Usuario 1")).not.toBeVisible();
    await expect(page.getByText(/aún no has publicado nada/i)).toBeVisible();
  });

  test("Validar campos requeridos al crear post", async ({ page }) => {
    await page.getByRole("button", { name: /agregar producto/i }).click();

    await page.getByRole("button", { name: "Publicar" }).click();
    await expect(page).toHaveURL("/new-post");

    await page.getByLabel("Título de la Publicación").fill("Solo Título");
    await page.getByRole("button", { name: "Publicar" }).click();
    await expect(page).toHaveURL("/new-post");
  });
});
