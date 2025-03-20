import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Footer from "../components/Footer.jsx";

describe("<Footer />", () => {
  test("render footer", () => {
    render(<Footer />);
    expect(screen.getByTestId("page-footer")).toBeInTheDocument();
  });

  test("render social media buttons", () => {
    render(<Footer />);
    const socialMediaButtons = screen.getAllByRole("button");
    expect(socialMediaButtons).toHaveLength(4);
  });

  test("display text", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-text")).toHaveTextContent(
      "© 2025 Artful Finds Inc."
    );
  });
});
