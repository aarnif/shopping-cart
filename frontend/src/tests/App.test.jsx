import { render, screen, within, waitFor } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useNavigate } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";
import mockData from "./mocks/data.js";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const { featureArtWorks } = mockData;
const artworks = featureArtWorks[0].result.data.featuredArtWorks;

const renderAppComponent = (mocks) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
};

describe("<App />", () => {
  describe("Home Page", () => {
    test("displays home page", () => {
      renderAppComponent(featureArtWorks);
      const desktopContent = screen.getByTestId("desktop-home-content");
      const mobileContent = screen.getByTestId("mobile-home-content");
      expect(desktopContent).toBeInTheDocument();
      expect(mobileContent).toBeInTheDocument();
    });

    test("displays home page loading state initially", () => {
      renderAppComponent(featureArtWorks);
      const desktopContent = screen.getByTestId("desktop-home-content");
      const mobileContent = screen.getByTestId("mobile-home-content");
      expect(within(desktopContent).getByTestId("loading")).toBeInTheDocument();
      expect(within(mobileContent).getByTestId("loading")).toBeInTheDocument();
    });

    test("renders home page featured artworks after loading", async () => {
      renderAppComponent(featureArtWorks);

      await waitFor(() => {
        const desktopContent = screen.getByTestId("desktop-home-content");
        const mobileContent = screen.getByTestId("mobile-home-content");
        expect(desktopContent.textContent).toContain(artworks[0].title);
        expect(mobileContent.textContent).toContain(artworks[0].title);
      });

      const desktopContent = screen.getByTestId("desktop-home-content");
      const mobileContent = screen.getByTestId("mobile-home-content");
      artworks.forEach((artwork) => {
        expect(desktopContent).toHaveTextContent(artwork.title);
        expect(mobileContent).toHaveTextContent(artwork.title);
      });
    });

    test("hero buy link navigates to shop page", async () => {
      const user = userEvent.setup();
      const navigate = vi.fn();
      useNavigate.mockReturnValue(navigate);

      renderAppComponent(featureArtWorks);

      await waitFor(() => {
        const desktopContent = screen.getByTestId("desktop-home-content");
        const mobileContent = screen.getByTestId("mobile-home-content");

        [desktopContent, mobileContent].forEach((content) => {
          const heroBuyButton = within(content).getByTestId("hero-buy-button");
          user.click(heroBuyButton);
          expect(navigate).toHaveBeenCalledWith("/art");
        });
      });
    });

    test("single art item buy link navigates to art work page", async () => {
      const user = userEvent.setup();
      const navigate = vi.fn();
      useNavigate.mockReturnValue(navigate);

      renderAppComponent(featureArtWorks);

      await waitFor(() => {
        const desktopContent = screen.getByTestId("desktop-home-content");
        const mobileContent = screen.getByTestId("mobile-home-content");

        [desktopContent, mobileContent].forEach((content) => {
          const artWorkBuyButton = within(content).getByTestId(
            "artwork-1-buy-button"
          );
          user.click(artWorkBuyButton);
          expect(navigate).toHaveBeenCalledWith("/art/1");
        });
      });
    });
  });
});
