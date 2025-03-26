import { render, screen } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useNavigate } from "react-router";
import Cart from "../components/Cart.jsx";
import mockData from "./mocks/data.js";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const handleAddItemToCart = vi.fn();
const handleRemoveItemFromCart = vi.fn();

const { shoppingCart } = mockData;

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

  test("displays all shopping cart items", () => {
    renderCartComponent(shoppingCart);
    for (const item of shoppingCart) {
      expect(screen.getByTestId(`cart-item-${item.id}`)).toBeInTheDocument();
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(
        screen.getByTestId(`cart-item-${item.id}-quantity`)
      ).toHaveTextContent(item.quantity.toString());
    }
  });

  test("displays total cost of all items in cart", () => {
    renderCartComponent(shoppingCart);
    const totalCost = shoppingCart.reduce(
      (acc, item) => acc + item.size.price * item.quantity,
      0
    );
    expect(screen.getByTestId("total-cost")).toHaveTextContent(
      `${totalCost} €`
    );
  });

  test("adds item to cart when plus button is clicked", () => {
    renderCartComponent(shoppingCart);

    const firstItem = shoppingCart[0];
    const addButton = screen.getByTestId(`cart-item-${firstItem.id}-add`);

    addButton.click();

    expect(handleAddItemToCart).toHaveBeenCalledTimes(1);
    expect(handleAddItemToCart).toHaveBeenCalledWith(firstItem, firstItem.size);
  });

  test("removes item from cart when minus button is clicked", () => {
    renderCartComponent(shoppingCart);

    const firstItem = shoppingCart[0];
    const removeButton = screen.getByTestId(`cart-item-${firstItem.id}-remove`);

    removeButton.click();

    expect(handleRemoveItemFromCart).toHaveBeenCalledTimes(1);
    expect(handleRemoveItemFromCart).toHaveBeenCalledWith(firstItem.id);
  });
});
