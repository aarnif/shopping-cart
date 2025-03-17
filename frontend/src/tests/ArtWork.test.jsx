import { render, screen } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useMatch, useNavigate } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import ArtWork from "../components/ArtWork.jsx";
import { FIND_ARTWORK } from "../graphql/queries.js";

const mocks = [
  {
    request: {
      query: FIND_ARTWORK,
      variables: { id: "1" },
    },
    result: {
      data: {
        findArtWork: {
          id: "1",
          title: "A Vision in Color",
          artist: "Liora Senn",
          description:
            "Bold brushstrokes and rich hues of purple, blue, and red bring this abstract masterpiece to life. A striking blend of movement and emotion, this piece captures energy and depth in every layer.",
          image: {
            type: "portrait",
            width: 1024,
            height: 1792,
            uri: "/images/a_vision_in_color.webp",
          },
          sizes: [
            {
              width: 40,
              height: 55,
              price: 350,
            },
            {
              width: 50,
              height: 70,
              price: 450,
            },
            {
              width: 60,
              height: 85,
              price: 550,
            },
            {
              width: 70,
              height: 100,
              price: 650,
            },
            {
              width: 85,
              height: 120,
              price: 750,
            },
            {
              width: 100,
              height: 140,
              price: 850,
            },
          ],
          reviews: [
            {
              name: "Sarah M.",
              date: "10-01-2025",
              rating: 5,
              text: "Absolutely stunning! The colors are vibrant, and the details are even more breathtaking in person.",
            },
            {
              name: "John D.",
              date: "05-02-2025",
              rating: 4,
              text: "Beautiful artwork, but the frame was slightly scratched upon arrival. Still a great piece!",
            },
          ],
        },
      },
    },
  },
];

const artWorkId = mocks[0].result.data.findArtWork.id;

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useMatch: () => ({ params: { id: artWorkId } }),
    useNavigate: vi.fn(),
  };
});

const handleAddItemToCart = vi.fn();

const renderArtWorkComponent = () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <ArtWork handleAddItemToCart={handleAddItemToCart} />
      </MemoryRouter>
    </MockedProvider>
  );
};

describe("<ArtWork />", () => {
  test("displays art page loading state initially", () => {
    renderArtWorkComponent();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
