import { test, expect } from "@playwright/test";

test.describe("Autenticación y acceso protegido", () => {
  test.beforeEach(async ({ request }) => {
    await request.post("http://localhost:3001/api/test/reset");

    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Usuario Test",
        username: "testuser",
        password: "testpass123",
        email: "test@test.com",
      },
    });
  });

  test("Debe redirigir a /login cuando se intenta acceder a ruta protegida sin autenticación", async ({ page }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL("/login");
  });

  test("Debe redirigir a /login cuando se intenta crear un post sin autenticación", async ({ page }) => {
    await page.goto("/new-post");
    await expect(page).toHaveURL("/login");
  });

  test("Login exitoso y acceso a perfil mediante click", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Iniciar Sesión" }).click();
    await expect(page).toHaveURL("/login");

    await page.getByLabel("Usuario").fill("testuser");
    await page.getByLabel("Contraseña").fill("testpass123");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page).toHaveURL("/");

    await page.getByRole("button", { name: "testuser" }).click();
    await expect(page).toHaveURL("/profile");
  });

  test("Login fallido con credenciales incorrectas", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Iniciar Sesión" }).click();

    await page.getByLabel("Usuario").fill("testuser");
    await page.getByLabel("Contraseña").fill("wrongpassword");
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page.getByText(/error|inválid|incorrecto/i)).toBeVisible();
    await expect(page).toHaveURL("/login");
  });

  test("Usuario autenticado puede acceder a crear post mediante click", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Iniciar Sesión" }).click();

    await page.getByLabel("Usuario").fill("testuser");
    await page.getByLabel("Contraseña").fill("testpass123");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page).toHaveURL("/");

    await page.getByRole("button", { name: /agregar producto/i }).click();
    await expect(page).toHaveURL("/new-post");
  });

  test("Usuario autenticado es redirigido desde /login a /", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Iniciar Sesión" }).click();

    await page.getByLabel("Usuario").fill("testuser");
    await page.getByLabel("Contraseña").fill("testpass123");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page).toHaveURL("/");

    await page.goto("/login");
    await expect(page).toHaveURL("/");
  });

  test("Registro de nuevo usuario mediante click", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Registrarse" }).click();
    await expect(page).toHaveURL("/register");

    await page.getByLabel(/nombre|name/i).fill("Nuevo Usuario");
    await page.getByLabel(/usuario|username/i).fill("newuser");
    await page.getByLabel(/email|correo/i).fill("nuevo@test.com");
    await page.getByLabel(/contraseña|password/i).first().fill("newpass123");
    await page.getByLabel(/confirmar contraseña|confirm password/i).fill("newpass123");

    await page.getByRole("button", { name: /registrarse|register|crear cuenta/i }).click();
    await page.getByRole("button", { name: "Ir al inicio" }).click();
    await page.waitForURL((url) => !url.pathname.includes('/register'));
  });

  test("Cerrar sesión regresa a home sin autenticación", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Iniciar Sesión" }).click();

    await page.getByLabel("Usuario").fill("testuser");
    await page.getByLabel("Contraseña").fill("testpass123");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page).toHaveURL("/");

    await page.getByRole("button", { name: /cerrar sesión/i }).click();
    await expect(page.getByRole("button", { name: "Iniciar Sesión" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Registrarse" })).toBeVisible();
  });
});
