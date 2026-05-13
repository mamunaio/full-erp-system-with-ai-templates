import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("should load login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/Login | Injaazh ERP/);
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    
    const error = page.locator(".text-rose-500");
    await expect(error).toBeVisible();
  });

  test("should navigate to dashboard on success", async ({ page }) => {
    // This assumes a test user exists
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@nexuserp.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toContainText("Dashboard");
  });
});
