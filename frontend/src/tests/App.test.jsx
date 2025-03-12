import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import App from "../App";
import { FEATURED_ARTWORKS } from "../graphql/queries";
import { within, waitFor } from "@testing-library/dom";

import artData from "./data.js";

const mocks = [
  {
    request: {
      query: FEATURED_ARTWORKS,
    },
    result: {
      data: {
        featuredArtWorks: artData,
      },
    },
  },
];

const renderAppComponent = () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
};

describe("<App />", () => {
  test("renders mobile nav", async () => {
    renderAppComponent();

    const mobileNav = screen.getByTestId("mobile-nav");
    expect(mobileNav).toBeInTheDocument();

    const mobileNavTitle = within(mobileNav).getByText("Artful Finds");
    expect(mobileNavTitle).toBeInTheDocument();
  });

  test("renders desktop nav", async () => {
    renderAppComponent();

    const desktopNav = screen.getByTestId("desktop-nav");
    expect(desktopNav).toBeInTheDocument();

    const desktopNavTitle = within(desktopNav).getByText("Artful Finds");
    expect(desktopNavTitle).toBeInTheDocument();
  });

  test("renders mobile home", async () => {
    renderAppComponent();

    const mobileHomeContent = screen.getByTestId("mobile-home-content");
    expect(mobileHomeContent).toBeInTheDocument();

    const heroContent = within(mobileHomeContent).getByTestId("hero-content");
    expect(heroContent).toBeInTheDocument();
  });

  test("renders desktop home", async () => {
    renderAppComponent();

    const desktopHomeContent = screen.getByTestId("desktop-home-content");
    expect(desktopHomeContent).toBeInTheDocument();

    const heroContent = within(desktopHomeContent).getByTestId("hero-content");
    expect(heroContent).toBeInTheDocument();
  });

  test("renders featured art work", async () => {
    renderAppComponent();

    const desktopHomeContent = screen.getByTestId("desktop-home-content");
    expect(desktopHomeContent).toBeInTheDocument();

    expect(
      within(desktopHomeContent).getByText(/Loading Art/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      const artFeedHeader =
        within(desktopHomeContent).getByTestId("art-feed-header");
      expect(artFeedHeader).toBeInTheDocument();
      expect(artFeedHeader).toHaveTextContent("This Month's Featured Artworks");
    });
  });
});
