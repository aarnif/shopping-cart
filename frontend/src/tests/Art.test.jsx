import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter, useNavigate } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import Art from "../components/Art.jsx";
import { ALL_ARTWORKS } from "../graphql/queries.js";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mocks = [
  {
    request: {
      query: ALL_ARTWORKS,
      variables: { sortBy: "title", first: 20, after: null },
    },
    result: {
      data: {
        allArtWorks: {
          totalCount: 31,
          pageInfo: {
            startCursor: "WzFd",
            endCursor: "WzIwXQ==",
            hasNextPage: true,
          },
          edges: [
            {
              cursor: "WzFd",
              node: {
                id: "1",
                title: "A Vision in Color",
                artist: "Liora Senn",
                image: {
                  type: "portrait",
                  width: 1024,
                  height: 1792,
                  uri: "/images/a_vision_in_color.webp",
                },
                description:
                  "Bold brushstrokes and rich hues of purple, blue, and red bring this abstract masterpiece to life. A striking blend of movement and emotion, this piece captures energy and depth in every layer.",
                averageRating: 4.5,
                startingPrice: 350,
              },
            },
            {
              cursor: "WzJd",
              node: {
                id: "2",
                title: "The Spirit of Freedom",
                artist: "Elias Varnen",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/the_spirit_of_freedom.webp",
                },
                description:
                  "Vivid colors and flowing forms embody the untamed essence of movement. This artwork captures the raw energy and boundless freedom of a soul unrestrained.",
                averageRating: 5,
                startingPrice: 300,
              },
            },
            {
              cursor: "WzNd",
              node: {
                id: "3",
                title: "Whispers of the Bloom",
                artist: "Camille Verdain",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/whispers_of_the_bloom.webp",
                },
                description:
                  "An impressionist vision of a sunlit poppy field, where vivid colors and dynamic brushstrokes capture the beauty of nature in motion.",
                averageRating: 5,
                startingPrice: 250,
              },
            },
            {
              cursor: "WzRd",
              node: {
                id: "4",
                title: "Guardian of Healing",
                artist: "Lucien Moreau",
                image: {
                  type: "square",
                  width: 1024,
                  height: 1024,
                  uri: "/images/guardian_of_healing.webp",
                },
                description:
                  "A quiet devotion unfolds in flowing color, where light and movement intertwine with the weight of knowledge and the urgency of compassion. Each brushstroke lingers, a testament to hands that heal and time that passes.",
                averageRating: 4,
                startingPrice: 300,
              },
            },
            {
              cursor: "WzVd",
              node: {
                id: "5",
                title: "Sunflowers at Dusk",
                artist: "Elias Varnen",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/sunflowers_at_dusk.webp",
                },
                description:
                  "An impressionist vision of a sunflower field at dusk, where vibrant yellows and warm golden hues dance across the canvas, brought to life by dynamic brushstrokes that capture the fleeting beauty of twilight.",
                averageRating: 5,
                startingPrice: 200,
              },
            },
            {
              cursor: "WzZd",
              node: {
                id: "6",
                title: "Whispering Canopy",
                artist: "Marc Monnet",
                image: {
                  type: "square",
                  width: 1024,
                  height: 1024,
                  uri: "/images/whispering_canopy.webp",
                },
                description:
                  "A mesmerizing woodland scene where sunlight filters through dense foliage, casting an ethereal glow on the forest path. Rich in greens and deep blues, this painting evokes serenity and mystery, drawing viewers into nature’s embrace.",
                averageRating: 0,
                startingPrice: 375,
              },
            },
            {
              cursor: "Wzdd",
              node: {
                id: "7",
                title: "Golden Metropolis",
                artist: "Elijah Carter",
                image: {
                  type: "portrait",
                  width: 1024,
                  height: 1792,
                  uri: "/images/golden_metropolis.webp",
                },
                description:
                  "A breathtaking cityscape bathed in golden hues as the sunlight reflects off towering skyscrapers. Thick, textured brushstrokes create a dynamic sense of movement in this bustling urban scene, capturing the energy and vibrancy of city life.",
                averageRating: 0,
                startingPrice: 400,
              },
            },
            {
              cursor: "Wzhd",
              node: {
                id: "8",
                title: "Twilight Reflections",
                artist: "Nathaniel Harper",
                image: {
                  type: "square",
                  width: 1024,
                  height: 1024,
                  uri: "/images/twilight_reflections.webp",
                },
                description:
                  "An enchanting city skyline illuminated by the warm glow of twilight. The vibrant mix of purples, oranges, and blues brings depth and emotion to this mesmerizing urban scene, where reflections dance on the shimmering water below.",
                averageRating: 0,
                startingPrice: 420,
              },
            },
            {
              cursor: "Wzld",
              node: {
                id: "9",
                title: "Tempest’s Dance",
                artist: "Isla Davenport",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/tempest_dance.webp",
                },
                description:
                  "Powerful waves crash and swirl in this mesmerizing seascape, capturing the raw energy and movement of the ocean. The rich blues, greens, and whites blend seamlessly, creating a sense of both chaos and harmony in this breathtaking painting.",
                averageRating: 0,
                startingPrice: 430,
              },
            },
            {
              cursor: "WzEwXQ==",
              node: {
                id: "10",
                title: "Meadow Serenity",
                artist: "Eleanor Marchand",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/meadow_serenity.webp",
                },
                description:
                  "A tranquil river winds through a lush, colorful meadow, bathed in the golden glow of a serene afternoon. Soft brushstrokes and a rich palette of greens, yellows, and wildflower hues bring this peaceful landscape to life, evoking a sense of harmony and calm.",
                averageRating: 0,
                startingPrice: 410,
              },
            },
            {
              cursor: "WzExXQ==",
              node: {
                id: "11",
                title: "Majestic Peaks",
                artist: "Julian Ashford",
                image: {
                  type: "square",
                  width: 1024,
                  height: 1024,
                  uri: "/images/majestic_peaks.webp",
                },
                description:
                  "A breathtaking mountain range bathed in the golden hues of dawn. Snow-capped peaks rise dramatically above a tranquil lake, as mist gently rolls over the valleys. This stunning landscape captures the grandeur and serenity of nature at its finest.",
                averageRating: 0,
                startingPrice: 450,
              },
            },
            {
              cursor: "WzEyXQ==",
              node: {
                id: "12",
                title: "Whispering Falls",
                artist: "Elias Varnen",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/whispering_falls.webp",
                },
                description:
                  "An impressionist masterpiece capturing the ethereal beauty of a cascading waterfall surrounded by lush greenery. The vibrant brushstrokes and dreamy colors bring the scene to life, evoking a sense of movement and tranquility.",
                averageRating: 4.5,
                startingPrice: 320,
              },
            },
            {
              cursor: "WzEzXQ==",
              node: {
                id: "13",
                title: "Golden Horizon",
                artist: "Elias Varnen",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/golden_horizon.webp",
                },
                description:
                  "Rolling green hills bathed in golden sunlight stretch into the horizon. The textured brushstrokes capture the wind dancing through the grass, while the soft pastel sky adds depth and warmth. A truly serene and timeless landscape.",
                averageRating: 4.5,
                startingPrice: 320,
              },
            },
            {
              cursor: "WzE0XQ==",
              node: {
                id: "14",
                title: "The Cozy Haven",
                artist: "Livia Marceau",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/the_cozy_haven.webp",
                },
                description:
                  "Nestled among vibrant wildflowers, this picturesque countryside cottage exudes warmth and tranquility. Golden sunlight bathes the stone walls, while a winding path leads to the inviting front door. The impressionist brushstrokes bring life to the trees and sky, making this an enchanting escape into nature.",
                averageRating: 4.7,
                startingPrice: 330,
              },
            },
            {
              cursor: "WzE1XQ==",
              node: {
                id: "15",
                title: "Tempest Unleashed",
                artist: "Victor Ardent",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/tempest_unleashed.webp",
                },
                description:
                  "Towering waves crash against jagged cliffs as storm clouds swirl overhead. A haunting glow filters through the darkness, illuminating the chaotic sea in this breathtaking impressionist masterpiece. The powerful brushstrokes and deep contrasts capture the raw energy and beauty of nature’s untamed force.",
                averageRating: 4.8,
                startingPrice: 340,
              },
            },
            {
              cursor: "WzE2XQ==",
              node: {
                id: "16",
                title: "City Lights",
                artist: "Marcello Fontaine",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/city_lights.webp",
                },
                description:
                  "A bustling city street at dusk comes alive with shimmering reflections of neon lights on the wet pavement. Silhouetted figures move through the glow of streetlamps, their forms captured in expressive, impressionist brushstrokes. The atmosphere is rich with movement, color, and the timeless beauty of urban life.",
                averageRating: 4.5,
                startingPrice: 350,
              },
            },
            {
              cursor: "WzE3XQ==",
              node: {
                id: "17",
                title: "Autumn Serenity",
                artist: "Elara Duvall",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/autumn_serenity.webp",
                },
                description:
                  "Golden leaves blanket the ground as a soft autumn breeze rustles through the trees. A winding path leads through the peaceful park, where warm lamplights glow softly near a reflective pond. Expressive brushstrokes bring a dreamy, nostalgic atmosphere to this stunning impressionist scene.",
                averageRating: 4.8,
                startingPrice: 340,
              },
            },
            {
              cursor: "WzE4XQ==",
              node: {
                id: "18",
                title: "Urban Heights",
                artist: "Sebastian Moreau",
                image: {
                  type: "portrait",
                  width: 1024,
                  height: 1792,
                  uri: "/images/urban_heights.webp",
                },
                description:
                  "Towering skyscrapers rise into the evening sky, their glass facades glowing with the warm hues of the setting sun. Expressive brushstrokes capture the shimmering reflections and the energy of the bustling city below. A breathtaking vertical composition that evokes the grandeur of modern architecture.",
                averageRating: 4.8,
                startingPrice: 360,
              },
            },
            {
              cursor: "WzE5XQ==",
              node: {
                id: "19",
                title: "Reflections of Stillness",
                artist: "Isabelle Laurent",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/reflections_of_stillness.webp",
                },
                description:
                  "A tranquil lake mirrors the soft hues of the sky as golden sunlight filters through the trees. Gentle ripples dance across the water, adding depth and movement to this serene scene. Expressive brushstrokes bring warmth and harmony, making this impressionist masterpiece a window into nature’s peaceful embrace.",
                averageRating: 4.8,
                startingPrice: 350,
              },
            },
            {
              cursor: "WzIwXQ==",
              node: {
                id: "20",
                title: "Emerald Wilderness",
                artist: "Lucien Navarro",
                image: {
                  type: "square",
                  width: 1024,
                  height: 1024,
                  uri: "/images/emerald_wilderness.webp",
                },
                description:
                  "Dense and untamed, this vibrant jungle scene captures the raw beauty of nature. Sunlight pierces through the canopy, illuminating the rich greenery and bursts of exotic flowers. Expressive impressionist brushstrokes bring movement to the foliage, creating an immersive escape into the heart of the wild.",
                averageRating: 4.8,
                startingPrice: 340,
              },
            },
          ],
        },
      },
    },
  },
];

const renderArtComponent = () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Art />
      </MemoryRouter>
    </MockedProvider>
  );
};

describe("<Art />", () => {
  test("displays art page loading state initially", () => {
    renderArtComponent();
    const mobileContainer = screen.getByTestId("art-page");
    expect(within(mobileContainer).getByTestId("loading")).toBeInTheDocument();
  });
});
