import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useMatch, useNavigate } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import ArtWork from "../components/ArtWork.jsx";
import mockData from "./mocks/data.js";

//   {
//     request: {
//       query: FIND_ARTWORK,
//       variables: { id: "1" },
//     },
//     result: {
//       data: {
//         findArtWork: {
//           id: "1",
//           title: "A Vision in Color",
//           artist: "Liora Senn",
//           description:
//             "Bold brushstrokes and rich hues of purple, blue, and red bring this abstract masterpiece to life. A striking blend of movement and emotion, this piece captures energy and depth in every layer.",
//           image: {
//             type: "portrait",
//             width: 1024,
//             height: 1792,
//             uri: "/images/a_vision_in_color.webp",
//           },
//           sizes: [
//             {
//               width: 40,
//               height: 55,
//               price: 350,
//             },
//             {
//               width: 50,
//               height: 70,
//               price: 450,
//             },
//             {
//               width: 60,
//               height: 85,
//               price: 550,
//             },
//             {
//               width: 70,
//               height: 100,
//               price: 650,
//             },
//             {
//               width: 85,
//               height: 120,
//               price: 750,
//             },
//             {
//               width: 100,
//               height: 140,
//               price: 850,
//             },
//           ],
//           reviews: [
//             {
//               name: "Sarah M.",
//               date: "10-01-2025",
//               rating: 5,
//               text: "Absolutely stunning! The colors are vibrant, and the details are even more breathtaking in person.",
//             },
//             {
//               name: "John D.",
//               date: "05-02-2025",
//               rating: 4,
//               text: "Beautiful artwork, but the frame was slightly scratched upon arrival. Still a great piece!",
//             },
//           ],
//         },
//       },
//     },
//   },
// ];
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
