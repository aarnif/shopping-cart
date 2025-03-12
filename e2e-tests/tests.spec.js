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

  test("navigates from home to art page using hero button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Buy Here" }).click();
    await expect(page).toHaveURL(/\/art$/);
    await expect(page.getByTestId("art-page")).toBeVisible();
  });

  test("navigates through desktop navigation menu", async ({ page }) => {
    const desktopNav = page.getByTestId("desktop-nav");

    const navigationPaths = [
      {
        navItem: "nav-item-shop",
        expectedUrl: /\/art$/,
        visibleElement: "art-page",
      },
      {
        navItem: "nav-item-cart",
        expectedUrl: /\/cart$/,
        visibleElement: "cart-page",
      },
      {
        navItem: "nav-item-home",
        expectedUrl: /\/$/,
        visibleElement: "desktop-home-content",
      },
    ];

    for (const path of navigationPaths) {
      await desktopNav.getByTestId(path.navItem).click();
      await expect(page).toHaveURL(path.expectedUrl);
      await expect(page.getByTestId(path.visibleElement)).toBeVisible();
    }
  });
});
