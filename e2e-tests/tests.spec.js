// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Shopping cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Shopping Cart");
  });

  test("has a desktop or mobile nav", async ({ page }) => {
    const nav =
      page.getByTestId("desktop-nav") || page.getByTestId("mobile-nav");
    const header = nav.getByTestId("page-header");

    await expect(header).toBeVisible();
    await expect(header).toHaveText("Artful Finds");
  });
});
