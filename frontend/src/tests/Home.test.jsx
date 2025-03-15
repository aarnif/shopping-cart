import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import Home from "../components/Home.jsx";
import { FEATURED_ARTWORKS } from "../graphql/queries";

const mocks = [
  {
    request: {
      query: FEATURED_ARTWORKS,
    },
    result: {
      data: {
        featuredArtWorks: [
          {
            id: "1",
            title: "A Vision in Color",
            artist: "Liora Senn",
            description:
              "Bold brushstrokes and rich hues of purple, blue, and red bring this abstract masterpiece to life. A striking blend of movement and emotion, this piece captures energy and depth in every layer.",
            image: {
              type: "portrait",
              uri: "/images/a_vision_in_color.webp",
            },
            startingPrice: 350,
            averageRating: 4.5,
            reviewsCount: 2,
          },
          {
            id: "2",
            title: "The Spirit of Freedom",
            artist: "Elias Varnen",
            description:
              "Vivid colors and flowing forms embody the untamed essence of movement. This artwork captures the raw energy and boundless freedom of a soul unrestrained.",
            image: {
              type: "landscape",
              uri: "/images/the_spirit_of_freedom.webp",
            },
            startingPrice: 300,
            averageRating: 5,
            reviewsCount: 2,
          },
          {
            id: "3",
            title: "Whispers of the Bloom",
            artist: "Camille Verdain",
            description:
              "An impressionist vision of a sunlit poppy field, where vivid colors and dynamic brushstrokes capture the beauty of nature in motion.",
            image: {
              type: "landscape",
              uri: "/images/whispers_of_the_bloom.webp",
            },
            startingPrice: 250,
            averageRating: 5,
            reviewsCount: 1,
          },
          {
            id: "4",
            title: "Guardian of Healing",
            artist: "Lucien Moreau",
            description:
              "A quiet devotion unfolds in flowing color, where light and movement intertwine with the weight of knowledge and the urgency of compassion. Each brushstroke lingers, a testament to hands that heal and time that passes.",
            image: {
              type: "square",
              uri: "/images/guardian_of_healing.webp",
            },
            startingPrice: 300,
            averageRating: 4,
            reviewsCount: 1,
          },
        ],
      },
    },
  },
];

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
});
