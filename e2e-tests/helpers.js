const addItemToCart = async (page) => {
  const desktopNav = page.getByTestId("desktop-nav");
  await desktopNav.getByTestId("nav-item-shop").click();
  const artItem = page.getByTestId("art-item-1").first();
  await artItem.click();

  await page.getByTestId("add-to-cart-button").click();
};

export default {
  addItemToCart,
};
