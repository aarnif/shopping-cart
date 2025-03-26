import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useMatch } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";
import mockData from "./mocks/data.js";

const { featureArtWorks, allArtWorks, artWork } = mockData;
const singleArtWork = artWork[0].result.data.findArtWork;

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useMatch: () => ({ params: { id: singleArtWork.id } }),
  };
});

const renderAppComponent = (mocks, url) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[url]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
};

describe("<App />", () => {
  test("displays home page route", () => {
    renderAppComponent(featureArtWorks, "/");
    const desktopContent = screen.getByTestId("desktop-home-content");
    const mobileContent = screen.getByTestId("mobile-home-content");
    expect(desktopContent).toBeInTheDocument();
    expect(mobileContent).toBeInTheDocument();
  });

  test("displays art page route", async () => {
    renderAppComponent(allArtWorks, "/art");
    expect(screen.getByTestId("art-page-header")).toBeInTheDocument();
  });

  test("displays single art work page route", async () => {
    const match = useMatch("/art/:id").params;
    renderAppComponent(artWork, "/art/1");
    await waitFor(() => {
      expect(screen.getByTestId(`artwork-${match.id}`)).toBeInTheDocument();
    });
  });

  test("displays cart page route", async () => {
    renderAppComponent([], "/cart");
    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
  });

  test("displays mobile shopping cart button", () => {
    renderAppComponent(featureArtWorks, "/");
    expect(
      screen.getByTestId("mobile-shopping-cart-button")
    ).toBeInTheDocument();
  });

  test("mobile shopping cart button is not visible on cart page", () => {
    renderAppComponent([], "/cart");
    expect(
      screen.queryByTestId("mobile-shopping-cart-button")
    ).not.toBeInTheDocument();
  });

  test("display mobile menu works", async () => {
    const user = userEvent.setup();
    renderAppComponent(featureArtWorks, "/");
    await user.click(screen.getByTestId("show-mobile-menu-button"));
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    await user.click(screen.getByTestId("back-button"));
    await waitFor(() => {
      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    });
  });

  test("shows latest item modal when adding item to cart", async () => {
    const user = userEvent.setup();
    renderAppComponent(artWork, "/art/1");
    await waitFor(() => {
      expect(
        screen.getByTestId(`artwork-${singleArtWork.id}`)
      ).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("add-to-cart-button"));
    expect(screen.getByTestId("latest-item-modal")).toBeInTheDocument();
  });
});
