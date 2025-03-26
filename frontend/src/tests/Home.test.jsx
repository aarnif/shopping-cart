import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useNavigate } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import Home from "../components/Home.jsx";
import mockData from "./mocks/data.js";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const { featureArtWorks } = mockData;

const mocks = featureArtWorks;
const artworks = mocks[0].result.data.featuredArtWorks;

const renderHomeComponent = () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockedProvider>
  );
};

describe("<Home />", () => {
  test("displays mobile loading state initially", () => {
    renderHomeComponent();
    const mobileContainer = screen.getByTestId("desktop-home-content");
    expect(within(mobileContainer).getByTestId("loading")).toBeInTheDocument();
  });

  test("displays desktop loading state initially", () => {
    renderHomeComponent();
    const desktopContainer = screen.getByTestId("desktop-home-content");
    expect(within(desktopContainer).getByTestId("loading")).toBeInTheDocument();
  });

  test("renders desktop content", async () => {
    renderHomeComponent();
    expect(screen.getByTestId("desktop-home-content")).toBeInTheDocument();
  });

  test("renders mobile content", async () => {
    renderHomeComponent();
    expect(screen.getByTestId("mobile-home-content")).toBeInTheDocument();
  });

  test("renders featured artworks in desktop view after loading", async () => {
    renderHomeComponent();

    await waitFor(() => {
      const desktopContainer = screen.getByTestId("desktop-home-content");
      expect(desktopContainer.textContent).toContain(artworks[0].title);
    });

    const desktopContainer = screen.getByTestId("desktop-home-content");

    artworks.forEach((artwork) => {
      expect(desktopContainer).toHaveTextContent(artwork.title);
    });
  });

  test("renders featured artworks in mobile view after loading", async () => {
    renderHomeComponent();

    await waitFor(() => {
      const mobileContainer = screen.getByTestId("mobile-home-content");
      expect(mobileContainer.textContent).toContain(artworks[0].title);
    });

    const mobileContainer = screen.getByTestId("mobile-home-content");

    artworks.forEach((artwork) => {
      expect(mobileContainer).toHaveTextContent(artwork.title);
    });
  });

  test("desktop hero buy link navigates to shop page", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderHomeComponent();

    await waitFor(() => {
      const desktopContainer = screen.getByTestId("desktop-home-content");
      const heroBuyButton =
        within(desktopContainer).getByTestId("hero-buy-button");
      heroBuyButton.click();
      expect(navigate).toHaveBeenCalledWith("/art");
    });
  });

  test("mobile hero buy link navigates to shop page", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderHomeComponent();

    await waitFor(() => {
      const mobileContainer = screen.getByTestId("mobile-home-content");
      const heroBuyButton =
        within(mobileContainer).getByTestId("hero-buy-button");
      heroBuyButton.click();
      expect(navigate).toHaveBeenCalledWith("/art");
    });
  });

  test("mobile single art work buy link navigates to art work page", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderHomeComponent();

    await waitFor(() => {
      const mobileContainer = screen.getByTestId("mobile-home-content");
      const heroBuyButton =
        within(mobileContainer).getByTestId(`artwork-1-buy-button`);
      heroBuyButton.click();
      expect(navigate).toHaveBeenCalledWith("/art/1");
    });
  });

  test("desktop single art work buy link navigates to art work page", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderHomeComponent();

    await waitFor(() => {
      const desktopContainer = screen.getByTestId("desktop-home-content");
      const heroBuyButton =
        within(desktopContainer).getByTestId(`artwork-1-buy-button`);
      heroBuyButton.click();
      expect(navigate).toHaveBeenCalledWith("/art/1");
    });
  });
});
