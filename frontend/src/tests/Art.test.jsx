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
  {
    request: {
      query: ALL_ARTWORKS,
      variables: { sortBy: "title", first: 20, after: "WzIwXQ==" },
    },
    result: {
      data: {
        allArtWorks: {
          totalCount: 31,
          pageInfo: {
            startCursor: "WzIxXQ==",
            endCursor: "WzMxXQ==",
            hasNextPage: false,
          },
          edges: [
            {
              cursor: "WzIxXQ==",
              node: {
                id: "21",
                title: "Crimson Sunset",
                artist: "Camille Dubois",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/crimson_sunset.webp",
                },
                description:
                  "Fiery hues of red and orange paint the sky as the sun dips below the horizon. Expressive brushstrokes capture the fleeting beauty of twilight, casting a warm glow over the tranquil landscape. An evocative scene that celebrates the magic of nature’s daily spectacle.",
                averageRating: 4.9,
                startingPrice: 360,
              },
            },
            {
              cursor: "WzIyXQ==",
              node: {
                id: "22",
                title: "Mystic River",
                artist: "Antoine Chevalier",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/mystic_river.webp",
                },
                description:
                  "Mist hangs low over the still waters of a secluded river, as ancient trees line the banks. Soft, diffused light filters through the canopy, creating an ethereal atmosphere. Expressive brushstrokes capture the mystery and tranquility of this hidden sanctuary.",
                averageRating: 4.7,
                startingPrice: 350,
              },
            },
            {
              cursor: "WzIzXQ==",
              node: {
                id: "23",
                title: "Azure Coast",
                artist: "Sophie Bernard",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/azure_coast.webp",
                },
                description:
                  "Turquoise waters meet the rugged cliffs of a sun-drenched coastline. The vibrant blues and greens of the sea contrast with the warm earth tones of the rocks. Expressive brushstrokes capture the energy and beauty of this idyllic Mediterranean scene.",
                averageRating: 4.8,
                startingPrice: 370,
              },
            },
            {
              cursor: "WzI0XQ==",
              node: {
                id: "24",
                title: "Enchanted Forest",
                artist: "Thierry Lambert",
                image: {
                  type: "square",
                  width: 1024,
                  height: 1024,
                  uri: "/images/enchanted_forest.webp",
                },
                description:
                  "Sunlight filters through the dense canopy of an ancient forest, casting dappled shadows on the mossy ground. Towering trees reach towards the sky, their branches intertwined to create a magical atmosphere. Expressive brushstrokes capture the mystery and wonder of this enchanted woodland.",
                averageRating: 4.9,
                startingPrice: 380,
              },
            },
            {
              cursor: "WzI1XQ==",
              node: {
                id: "25",
                title: "Lavender Fields",
                artist: "Genevieve Dubois",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/lavender_fields.webp",
                },
                description:
                  "Rolling hills of lavender stretch as far as the eye can see, their fragrant blooms swaying gently in the breeze. The soft purple hues of the flowers contrast with the golden sunlight, creating a scene of serene beauty. Expressive brushstrokes capture the essence of this idyllic Provençal landscape.",
                averageRating: 4.8,
                startingPrice: 390,
              },
            },
            {
              cursor: "WzI2XQ==",
              node: {
                id: "26",
                title: "Snowy Peaks",
                artist: "Philippe Moreau",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/snowy_peaks.webp",
                },
                description:
                  "Majestic snow-capped mountains rise above a pristine alpine valley. The crisp white peaks contrast with the deep blue sky, creating a scene of breathtaking beauty. Expressive brushstrokes capture the grandeur and serenity of this winter wonderland.",
                averageRating: 4.9,
                startingPrice: 400,
              },
            },
            {
              cursor: "WzI3XQ==",
              node: {
                id: "27",
                title: "Sunflower Meadow",
                artist: "Celine Arnauld",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/sunflower_meadow.webp",
                },
                description:
                  "A vibrant meadow filled with sunflowers stretches towards the horizon, their golden faces turned towards the sun. The warm hues of the flowers contrast with the deep blue sky, creating a scene of joyful abundance. Expressive brushstrokes capture the essence of this summer paradise.",
                averageRating: 4.7,
                startingPrice: 410,
              },
            },
            {
              cursor: "WzI4XQ==",
              node: {
                id: "28",
                title: "Tropical Lagoon",
                artist: "Jean-Luc Picard",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/tropical_lagoon.webp",
                },
                description:
                  "Turquoise waters lap against the white sandy beaches of a secluded tropical lagoon. Palm trees sway gently in the breeze, their fronds casting dappled shadows on the sand. Expressive brushstrokes capture the tranquility and beauty of this island paradise.",
                averageRating: 4.8,
                startingPrice: 420,
              },
            },
            {
              cursor: "WzI5XQ==",
              node: {
                id: "29",
                title: "Autumn Orchard",
                artist: "Margot Dubois",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/autumn_orchard.webp",
                },
                description:
                  "Apple trees laden with ripe fruit stand in neat rows in an autumn orchard. The warm hues of the leaves contrast with the deep blue sky, creating a scene of rustic charm. Expressive brushstrokes capture the essence of this bountiful harvest.",
                averageRating: 4.9,
                startingPrice: 430,
              },
            },
            {
              cursor: "WzMwXQ==",
              node: {
                id: "30",
                title: "Starry Night",
                artist: "Gaspard Monet",
                image: {
                  type: "landscape",
                  width: 1792,
                  height: 1024,
                  uri: "/images/starry_night.webp",
                },
                description:
                  "A swirling night sky filled with stars illuminates a sleeping village below. The vibrant blues and yellows of the heavens contrast with the dark earth tones of the landscape. Expressive brushstrokes capture the mystery and wonder of this celestial scene.",
                averageRating: 4.7,
                startingPrice: 440,
              },
            },
            {
              cursor: "WzMxXQ==",
              node: {
                id: "31",
                title: "Winter Cabin",
                artist: "Elise Martin",
                image: {
                  type: "square",
                  width: 1024,
                  height: 1024,
                  uri: "/images/winter_cabin.webp",
                },
                description:
                  "A cozy cabin nestled in a snowy forest glows with warm light from within. The crisp white snow contrasts with the deep green trees, creating a scene of peaceful solitude. Expressive brushstrokes capture the tranquility and beauty of this winter retreat.",
                averageRating: 4.8,
                startingPrice: 450,
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

  test("more artworks are fetched when scrolling down", async () => {
    const timeOut = 3000;
    renderArtComponent();

    scrollDown();

    await waitFor(
      () => {
        expect(screen.getByTestId("art-item-21")).toBeInTheDocument();
      },
      { timeout: timeOut }
    );

    scrollDown();

    await waitFor(
      () => {
        expect(screen.getByTestId("art-item-31")).toBeInTheDocument();
      },
      { timeout: timeOut }
    );
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
