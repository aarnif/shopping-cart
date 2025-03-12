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

  test("navigates to single art work page", async ({ page }) => {
    const desktopNav = page.getByTestId("desktop-nav");
    await desktopNav.getByTestId("nav-item-shop").click();
    const artItem = page.getByTestId("art-item-1").first();
    await artItem.click();

    const artWorkTitle = page.getByTestId("art-work-title");
    await expect(artWorkTitle).toBeVisible();

    const artWorkDescription = page.getByTestId("art-work-description");
    await expect(artWorkDescription).toBeVisible();
  });

  test("adds item to cart and displays latest item modal", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 }); // Does not work currently without this line.
    const desktopNav = page.getByTestId("desktop-nav");
    await desktopNav.getByTestId("nav-item-shop").click();
    const artItem = page.getByTestId("art-item-1").first();
    await artItem.click();

    await page.getByTestId("add-to-cart-button").click();

    const latestItemModalOverlay = page.getByTestId(
      "latest-item-modal-overlay"
    );
    const latestItemModal = page.getByTestId("latest-item-modal");
    const continueShoppingButton = page.getByTestId("continue-shopping-button");

    await expect(latestItemModalOverlay).toBeVisible();
    await expect(latestItemModal).toBeVisible();
    await expect(continueShoppingButton).toBeVisible();

    await expect(page.getByTestId("cart-count")).toContainText("1");

    await page.getByTestId("continue-shopping-button").click();

    await expect(latestItemModalOverlay).not.toBeVisible();
    await expect(latestItemModal).not.toBeVisible();
  });

  test("navigates to cart when clicking checkout in latest item modal", async ({
    page,
  }) => {
    const desktopNav = page.getByTestId("desktop-nav");
    await desktopNav.getByTestId("nav-item-shop").click();
    const artItem = page.getByTestId("art-item-1").first();
    await artItem.click();

    await page.getByTestId("add-to-cart-button").click();

    const latestItemModalOverlay = page.getByTestId(
      "latest-item-modal-overlay"
    );
    const latestItemModal = page.getByTestId("latest-item-modal");
    const checkOutButton = page.getByTestId("checkout-button");

    await expect(latestItemModalOverlay).toBeVisible();
    await expect(latestItemModal).toBeVisible();
    await expect(checkOutButton).toBeVisible();

    await checkOutButton.click();

    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByTestId("cart-page")).toBeVisible();
    await expect(page.getByTestId("cart-count")).toContainText("1");

    const cartItem = page.locator('[data-testid^="cart-item"]').first();
    await expect(cartItem).toBeVisible();
  });
});
