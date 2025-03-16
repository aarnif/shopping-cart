import { render, screen } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter } from "react-router";
import Cart from "../components/Cart.jsx";

const handleAddItemToCart = vi.fn();
const handleRemoveItemFromCart = vi.fn();

const renderCartComponent = (shoppingCart = []) => {
  render(
    <MemoryRouter>
      <Cart
        shoppingCart={shoppingCart}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
        handleShowAlertModal={() => {}}
      />
    </MemoryRouter>
  );
};

describe("<Cart />", () => {
  test("displays page", () => {
    renderCartComponent();
    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
  });
});
