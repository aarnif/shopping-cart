import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useMatch, useNavigate } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import ArtWork from "../components/ArtWork.jsx";
import mockData from "./mocks/data.js";

const { artWork } = mockData;

const singleArtWork = artWork[0].result.data.findArtWork;

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useMatch: () => ({ params: { id: singleArtWork.id } }),
    useNavigate: vi.fn(),
  };
});

const handleAddItemToCart = vi.fn();

const renderArtWorkComponent = () => {
  render(
    <MockedProvider mocks={artWork} addTypename={false}>
      <MemoryRouter>
        <ArtWork handleAddItemToCart={handleAddItemToCart} />
      </MemoryRouter>
    </MockedProvider>
  );
};

describe("<ArtWork />", () => {
  test("displays loading state initially", () => {
    renderArtWorkComponent();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("displays art work page after loading", async () => {
    const match = useMatch("/art/:id").params;

    renderArtWorkComponent();
    await waitFor(() => {
      expect(screen.getByTestId(`artwork-${match.id}`)).toBeInTheDocument();
    });
  });

  test("back button navigates back to shop page", async () => {
    const user = userEvent.setup();
    const match = useMatch("/art/:id").params;
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    renderArtWorkComponent();

    await waitFor(() => {
      const artWorkView = screen.getByTestId(`artwork-${match.id}`);
      expect(artWorkView).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("back-button"));
    expect(navigate).toHaveBeenCalledWith("/art");
  });

  test("default size is selected", async () => {
    const defaultSize = singleArtWork.sizes[0];

    renderArtWorkComponent();

    await waitFor(() => {
      const selectedSize = screen.getByTestId("selected-size");
      expect(selectedSize).toBeInTheDocument();
      expect(selectedSize).toHaveTextContent(
        `${defaultSize.width} x ${defaultSize.height} cm`
      );
    });
  });

  test("change selected size works", async () => {
    const user = userEvent.setup();
    const nextSize = singleArtWork.sizes[1];

    renderArtWorkComponent();

    await waitFor(() => {
      expect(screen.getByTestId(nextSize.width)).toBeInTheDocument();
    });

    await user.click(screen.getByTestId(nextSize.width));

    expect(screen.getByTestId("selected-size")).toHaveTextContent(
      `${nextSize.width} x ${nextSize.height} cm`
    );
  });

  test("add to cart button works", async () => {
    const user = userEvent.setup();
    const defaultSize = singleArtWork.sizes[0];

    renderArtWorkComponent();

    await waitFor(() => {
      expect(screen.getByTestId("add-to-cart-button")).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("add-to-cart-button"));

    expect(handleAddItemToCart).toHaveBeenCalledWith(
      singleArtWork,
      defaultSize
    );
  });
});
