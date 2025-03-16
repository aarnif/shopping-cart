import { render, screen } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useNavigate } from "react-router";
import Cart from "../components/Cart.jsx";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

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

  test("displays empty cart view", () => {
    renderCartComponent([]);
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
  });

  test("user can navigate to shop page from empty cart page", () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderCartComponent([]);
    const emptyCartPage = screen.getByTestId("empty-cart");

    expect(emptyCartPage).toBeInTheDocument();

    const startShoppingButton = screen.getByTestId("start-shopping-button");
    startShoppingButton.click();

    expect(navigate).toHaveBeenCalledWith("/art");
  });
});
