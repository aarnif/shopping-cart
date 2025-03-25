import { render, screen, waitFor, within, act } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useNavigate } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import Art from "../components/Art.jsx";
import mockData from "./mocks/data.js";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const { allArtWorks } = mockData;
const mocks = allArtWorks;

const renderArtComponent = () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Art />
      </MemoryRouter>
    </MockedProvider>
  );
};

const setViewport = (width, height) => {
  Object.defineProperty(window, "innerWidth", { value: width, writable: true });
  Object.defineProperty(window, "innerHeight", {
    value: height,
    writable: true,
  });
  window.dispatchEvent(new Event("resize"));
};

const scrollDown = () => {
  global.window.scrollY = document.documentElement.scrollHeight;
  global.window.dispatchEvent(
    new Event("scroll", {
      bubbles: true,
      cancelable: true,
    })
  );
};

describe("<Art />", () => {
  test("displays art page loading state initially", () => {
    renderArtComponent();
    const artContainer = screen.getByTestId("art-page");
    expect(within(artContainer).getByTestId("loading")).toBeInTheDocument();
  });

  test("displays art page content", async () => {
    renderArtComponent();

    await waitFor(() => {
      expect(screen.getByTestId("art-page-content")).toBeInTheDocument();
      expect(screen.getByTestId("art-item-1")).toBeInTheDocument();
    });
  });

  // Fix this test (not working all the time, timeOut issue)
  test("more artworks are fetched when scrolling down", async () => {
    const timeOut = 3000;
    renderArtComponent();

    await act(async () => {
      scrollDown();
    });

    await waitFor(
      () => {
        expect(screen.getByTestId("art-item-21")).toBeInTheDocument();
      },
      { timeout: timeOut }
    );

    await act(async () => {
      scrollDown();
    });

    await waitFor(
      () => {
        expect(screen.getByTestId("art-item-31")).toBeInTheDocument();
      },
      { timeout: timeOut }
    );
  });

  test("click sort button works", async () => {
    const user = userEvent.setup();
    renderArtComponent();

    await waitFor(() => {
      expect(screen.getByTestId("art-page-content")).toBeInTheDocument();
      expect(screen.getByTestId("selected-sort")).toHaveTextContent("Title");
      expect(screen.getByTestId("sort-by-artist")).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("sort-by-artist"));
    expect(screen.getByTestId("selected-sort")).toHaveTextContent("Artist");
  });

  test("single art item buy link navigates to art work page", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderArtComponent();

    await waitFor(() => {
      const desktopArtItemView = screen.getByTestId("art-item-1-desktop-view");
      expect(desktopArtItemView).toBeInTheDocument();
      within(desktopArtItemView).getByTestId(`art-item-1-button`).click();
      expect(navigate).toHaveBeenCalledWith("/art/1");
    });
  });

  test("single art item buy link navigates to art work page", async () => {
    setViewport(375, 667);
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderArtComponent();

    await waitFor(() => {
      const mobileArtItemView = screen.getByTestId("art-item-1-mobile-view");
      expect(mobileArtItemView).toBeInTheDocument();
      within(mobileArtItemView).getByTestId(`art-item-1-button`).click();
      expect(navigate).toHaveBeenCalledWith("/art/1");
    });
  });
});
