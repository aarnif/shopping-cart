import { render, screen, within } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useNavigate } from "react-router";
import Header from "../components/Header.jsx";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const handleShowMenu = vi.fn();

const renderHeaderComponent = (shoppingCart = [], numberOfItemsInCart = 0) => {
  render(
    <MemoryRouter>
      <Header
        handleShowMenu={handleShowMenu}
        shoppingCart={shoppingCart}
        numberOfItemsInCart={numberOfItemsInCart}
      />
    </MemoryRouter>
  );
};

describe("<Header />", () => {
  test("displays desktop nav", () => {
    renderHeaderComponent();
    expect(screen.getByTestId("desktop-nav")).toBeInTheDocument();
  });

  test("displays mobile nav", () => {
    renderHeaderComponent();
    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
  });

  test("displays desktop page header", () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderHeaderComponent();
    const desktopNav = screen.getByTestId("desktop-nav");
    const pageHeaderButton = within(desktopNav).getByTestId("page-header");
    expect(pageHeaderButton).toBeInTheDocument();
    pageHeaderButton.click();
    expect(navigate).toHaveBeenCalledWith("/");
  });

  test("displays mobile page header", () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderHeaderComponent();
    const mobileNav = screen.getByTestId("mobile-nav");
    expect(within(mobileNav).getByTestId("page-header")).toBeInTheDocument();
  });

  test("navigation works in desktop nav", () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderHeaderComponent();
    const desktopNav = screen.getByTestId("desktop-nav");

    const navItems = [
      { testId: "nav-item-home", expectedPath: "/" },
      { testId: "nav-item-shop", expectedPath: "/art" },
      { testId: "nav-item-cart", expectedPath: "/cart" },
    ];

    navItems.forEach(({ testId, expectedPath }) => {
      navigate.mockReset();

      const navItem = within(desktopNav).getByTestId(testId);
      expect(navItem).toBeInTheDocument();

      const navButton = within(navItem).getByTestId(`${testId}-button`);
      navButton.click();

      expect(navigate).toHaveBeenCalledWith(expectedPath);
    });
  });

  test("cart displays item count when not empty", () => {
    renderHeaderComponent([{ id: 1 }, { id: 2 }], 2);
    const cartCount = screen.getByTestId("nav-item-cart");
    expect(cartCount).toBeInTheDocument();
    expect(cartCount.textContent).toBe("2");
  });
});
