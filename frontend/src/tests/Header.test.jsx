import { render, screen } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter } from "react-router";
import Header from "../components/Header.jsx";

const handleShowMenu = vi.fn();

const shoppingCart = [];

const numberOfItemsInCart = 0;

const renderHeaderComponent = () => {
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
});
