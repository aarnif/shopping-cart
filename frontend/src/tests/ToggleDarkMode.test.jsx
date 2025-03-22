import { render, screen, act } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ToggleDarkMode from "../components/ToggleDarkMode.jsx";

const localStorage = {
  setItem: vi.fn(),
  getItem: vi.fn(),
};

Object.defineProperty(global, "localStorage", { value: localStorage });

describe("<ToggleDarkMode />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.classList.remove("dark");
  });

  test("display dark mode icon", () => {
    render(<ToggleDarkMode />);
    expect(screen.getByTestId("toggle-dark-mode-button")).toBeInTheDocument();
  });

  test("User can change from light mode to dark mode", async () => {
    const user = userEvent.setup();
    render(<ToggleDarkMode />);

    expect(screen.getByTestId("light-mode")).toBeInTheDocument();

    await user.click(screen.getByTestId("toggle-dark-mode-button"));

    expect(screen.getByTestId("dark-mode")).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  test("initializes with light theme if localStorage does not have a theme set", () => {
    localStorage.getItem.mockImplementation(() => null);

    render(<ToggleDarkMode />);
    expect(screen.getByTestId("light-mode")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  test("initializes with dark theme if localStorage has dark theme set", async () => {
    localStorage.getItem.mockImplementation((key) =>
      key === "theme" ? "dark" : null
    );

    await act(async () => {
      render(<ToggleDarkMode />);
    });

    expect(screen.getByTestId("dark-mode")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
