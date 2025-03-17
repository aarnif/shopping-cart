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

const shoppingCart = [
  {
    id: "ac3016c7-30f3-4921-82e5-0873e56c47d4",
    title: "A Vision in Color",
    artist: "Liora Senn",
    image: {
      __typename: "Image",
      type: "portrait",
      width: 1024,
      height: 1792,
      uri: "/images/a_vision_in_color.webp",
    },
    size: {
      __typename: "Size",
      width: 40,
      height: 55,
      price: 350,
    },
    quantity: 1,
  },
  {
    id: "e906bd64-9392-4f0f-aa53-87d9466e3b9c",
    title: "Eternal Peaks of the Himalayas",
    artist: "Surya Patel",
    image: {
      __typename: "Image",
      type: "square",
      width: 1024,
      height: 1024,
      uri: "/images/eternal_peaks_of_the_himalayas.webp",
    },
    size: {
      __typename: "Size",
      width: 50,
      height: 50,
      price: 520,
    },
    quantity: 2,
  },
  {
    id: "6f6478df-0cb8-4fa0-a764-e7330789dd1d",
    title: "Golden Metropolis",
    artist: "Elijah Carter",
    image: {
      __typename: "Image",
      type: "portrait",
      width: 1024,
      height: 1792,
      uri: "/images/golden_metropolis.webp",
    },
    size: {
      __typename: "Size",
      width: 85,
      height: 120,
      price: 800,
    },
    quantity: 1,
  },
];

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
