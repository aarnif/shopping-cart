import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router";
import userEvent from "@testing-library/user-event";
import MobileMenu from "../components/MobileMenu.jsx";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const handleShowMobileMenu = vi.fn();

const renderMenuComponent = () => {
  render(
    <MemoryRouter>
      <MobileMenu handleShowMobileMenu={handleShowMobileMenu} />
    </MemoryRouter>
  );
};

describe("<Menu />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("display menu", () => {
    renderMenuComponent();
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  test("user can navigate from menu", async () => {
    const user = userEvent.setup();

    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderMenuComponent();

    await user.click(screen.getByTestId("home-button"));
    expect(navigate).toHaveBeenCalledWith("/");
    expect(handleShowMobileMenu).toHaveBeenCalledTimes(1);
  });
});
