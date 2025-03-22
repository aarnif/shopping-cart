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
//   {
//     request: {
//       query: ALL_ARTWORKS,
//       variables: { sortBy: "title", first: 20, after: null },
//     },
//     result: {
//       data: {
//         allArtWorks: {
//           totalCount: 31,
//           pageInfo: {
//             startCursor: "WzFd",
//             endCursor: "WzIwXQ==",
//             hasNextPage: true,
//           },
//           edges: [
//             {
//               cursor: "WzFd",
//               node: {
//                 id: "1",
//                 title: "A Vision in Color",
//                 artist: "Liora Senn",
//                 image: {
//                   type: "portrait",
//                   width: 1024,
//                   height: 1792,
//                   uri: "/images/a_vision_in_color.webp",
//                 },
//                 description:
//                   "Bold brushstrokes and rich hues of purple, blue, and red bring this abstract masterpiece to life. A striking blend of movement and emotion, this piece captures energy and depth in every layer.",
//                 averageRating: 4.5,
//                 startingPrice: 350,
//               },
//             },
//             {
//               cursor: "WzJd",
//               node: {
//                 id: "2",
//                 title: "The Spirit of Freedom",
//                 artist: "Elias Varnen",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/the_spirit_of_freedom.webp",
//                 },
//                 description:
//                   "Vivid colors and flowing forms embody the untamed essence of movement. This artwork captures the raw energy and boundless freedom of a soul unrestrained.",
//                 averageRating: 5,
//                 startingPrice: 300,
//               },
//             },
//             {
//               cursor: "WzNd",
//               node: {
//                 id: "3",
//                 title: "Whispers of the Bloom",
//                 artist: "Camille Verdain",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/whispers_of_the_bloom.webp",
//                 },
//                 description:
//                   "An impressionist vision of a sunlit poppy field, where vivid colors and dynamic brushstrokes capture the beauty of nature in motion.",
//                 averageRating: 5,
//                 startingPrice: 250,
//               },
//             },
//             {
//               cursor: "WzRd",
//               node: {
//                 id: "4",
//                 title: "Guardian of Healing",
//                 artist: "Lucien Moreau",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/guardian_of_healing.webp",
//                 },
//                 description:
//                   "A quiet devotion unfolds in flowing color, where light and movement intertwine with the weight of knowledge and the urgency of compassion. Each brushstroke lingers, a testament to hands that heal and time that passes.",
//                 averageRating: 4,
//                 startingPrice: 300,
//               },
//             },
//             {
//               cursor: "WzVd",
//               node: {
//                 id: "5",
//                 title: "Sunflowers at Dusk",
//                 artist: "Elias Varnen",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/sunflowers_at_dusk.webp",
//                 },
//                 description:
//                   "An impressionist vision of a sunflower field at dusk, where vibrant yellows and warm golden hues dance across the canvas, brought to life by dynamic brushstrokes that capture the fleeting beauty of twilight.",
//                 averageRating: 5,
//                 startingPrice: 200,
//               },
//             },
//             {
//               cursor: "WzZd",
//               node: {
//                 id: "6",
//                 title: "Whispering Canopy",
//                 artist: "Marc Monnet",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/whispering_canopy.webp",
//                 },
//                 description:
//                   "A mesmerizing woodland scene where sunlight filters through dense foliage, casting an ethereal glow on the forest path. Rich in greens and deep blues, this painting evokes serenity and mystery, drawing viewers into nature’s embrace.",
//                 averageRating: 0,
//                 startingPrice: 375,
//               },
//             },
//             {
//               cursor: "Wzdd",
//               node: {
//                 id: "7",
//                 title: "Golden Metropolis",
//                 artist: "Elijah Carter",
//                 image: {
//                   type: "portrait",
//                   width: 1024,
//                   height: 1792,
//                   uri: "/images/golden_metropolis.webp",
//                 },
//                 description:
//                   "A breathtaking cityscape bathed in golden hues as the sunlight reflects off towering skyscrapers. Thick, textured brushstrokes create a dynamic sense of movement in this bustling urban scene, capturing the energy and vibrancy of city life.",
//                 averageRating: 0,
//                 startingPrice: 400,
//               },
//             },
//             {
//               cursor: "Wzhd",
//               node: {
//                 id: "8",
//                 title: "Twilight Reflections",
//                 artist: "Nathaniel Harper",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/twilight_reflections.webp",
//                 },
//                 description:
//                   "An enchanting city skyline illuminated by the warm glow of twilight. The vibrant mix of purples, oranges, and blues brings depth and emotion to this mesmerizing urban scene, where reflections dance on the shimmering water below.",
//                 averageRating: 0,
//                 startingPrice: 420,
//               },
//             },
//             {
//               cursor: "Wzld",
//               node: {
//                 id: "9",
//                 title: "Tempest’s Dance",
//                 artist: "Isla Davenport",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/tempest_dance.webp",
//                 },
//                 description:
//                   "Powerful waves crash and swirl in this mesmerizing seascape, capturing the raw energy and movement of the ocean. The rich blues, greens, and whites blend seamlessly, creating a sense of both chaos and harmony in this breathtaking painting.",
//                 averageRating: 0,
//                 startingPrice: 430,
//               },
//             },
//             {
//               cursor: "WzEwXQ==",
//               node: {
//                 id: "10",
//                 title: "Meadow Serenity",
//                 artist: "Eleanor Marchand",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/meadow_serenity.webp",
//                 },
//                 description:
//                   "A tranquil river winds through a lush, colorful meadow, bathed in the golden glow of a serene afternoon. Soft brushstrokes and a rich palette of greens, yellows, and wildflower hues bring this peaceful landscape to life, evoking a sense of harmony and calm.",
//                 averageRating: 0,
//                 startingPrice: 410,
//               },
//             },
//             {
//               cursor: "WzExXQ==",
//               node: {
//                 id: "11",
//                 title: "Majestic Peaks",
//                 artist: "Julian Ashford",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/majestic_peaks.webp",
//                 },
//                 description:
//                   "A breathtaking mountain range bathed in the golden hues of dawn. Snow-capped peaks rise dramatically above a tranquil lake, as mist gently rolls over the valleys. This stunning landscape captures the grandeur and serenity of nature at its finest.",
//                 averageRating: 0,
//                 startingPrice: 450,
//               },
//             },
//             {
//               cursor: "WzEyXQ==",
//               node: {
//                 id: "12",
//                 title: "Whispering Falls",
//                 artist: "Elias Varnen",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/whispering_falls.webp",
//                 },
//                 description:
//                   "An impressionist masterpiece capturing the ethereal beauty of a cascading waterfall surrounded by lush greenery. The vibrant brushstrokes and dreamy colors bring the scene to life, evoking a sense of movement and tranquility.",
//                 averageRating: 4.5,
//                 startingPrice: 320,
//               },
//             },
//             {
//               cursor: "WzEzXQ==",
//               node: {
//                 id: "13",
//                 title: "Golden Horizon",
//                 artist: "Elias Varnen",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/golden_horizon.webp",
//                 },
//                 description:
//                   "Rolling green hills bathed in golden sunlight stretch into the horizon. The textured brushstrokes capture the wind dancing through the grass, while the soft pastel sky adds depth and warmth. A truly serene and timeless landscape.",
//                 averageRating: 4.5,
//                 startingPrice: 320,
//               },
//             },
//             {
//               cursor: "WzE0XQ==",
//               node: {
//                 id: "14",
//                 title: "The Cozy Haven",
//                 artist: "Livia Marceau",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/the_cozy_haven.webp",
//                 },
//                 description:
//                   "Nestled among vibrant wildflowers, this picturesque countryside cottage exudes warmth and tranquility. Golden sunlight bathes the stone walls, while a winding path leads to the inviting front door. The impressionist brushstrokes bring life to the trees and sky, making this an enchanting escape into nature.",
//                 averageRating: 4.7,
//                 startingPrice: 330,
//               },
//             },
//             {
//               cursor: "WzE1XQ==",
//               node: {
//                 id: "15",
//                 title: "Tempest Unleashed",
//                 artist: "Victor Ardent",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/tempest_unleashed.webp",
//                 },
//                 description:
//                   "Towering waves crash against jagged cliffs as storm clouds swirl overhead. A haunting glow filters through the darkness, illuminating the chaotic sea in this breathtaking impressionist masterpiece. The powerful brushstrokes and deep contrasts capture the raw energy and beauty of nature’s untamed force.",
//                 averageRating: 4.8,
//                 startingPrice: 340,
//               },
//             },
//             {
//               cursor: "WzE2XQ==",
//               node: {
//                 id: "16",
//                 title: "City Lights",
//                 artist: "Marcello Fontaine",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/city_lights.webp",
//                 },
//                 description:
//                   "A bustling city street at dusk comes alive with shimmering reflections of neon lights on the wet pavement. Silhouetted figures move through the glow of streetlamps, their forms captured in expressive, impressionist brushstrokes. The atmosphere is rich with movement, color, and the timeless beauty of urban life.",
//                 averageRating: 4.5,
//                 startingPrice: 350,
//               },
//             },
//             {
//               cursor: "WzE3XQ==",
//               node: {
//                 id: "17",
//                 title: "Autumn Serenity",
//                 artist: "Elara Duvall",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/autumn_serenity.webp",
//                 },
//                 description:
//                   "Golden leaves blanket the ground as a soft autumn breeze rustles through the trees. A winding path leads through the peaceful park, where warm lamplights glow softly near a reflective pond. Expressive brushstrokes bring a dreamy, nostalgic atmosphere to this stunning impressionist scene.",
//                 averageRating: 4.8,
//                 startingPrice: 340,
//               },
//             },
//             {
//               cursor: "WzE4XQ==",
//               node: {
//                 id: "18",
//                 title: "Urban Heights",
//                 artist: "Sebastian Moreau",
//                 image: {
//                   type: "portrait",
//                   width: 1024,
//                   height: 1792,
//                   uri: "/images/urban_heights.webp",
//                 },
//                 description:
//                   "Towering skyscrapers rise into the evening sky, their glass facades glowing with the warm hues of the setting sun. Expressive brushstrokes capture the shimmering reflections and the energy of the bustling city below. A breathtaking vertical composition that evokes the grandeur of modern architecture.",
//                 averageRating: 4.8,
//                 startingPrice: 360,
//               },
//             },
//             {
//               cursor: "WzE5XQ==",
//               node: {
//                 id: "19",
//                 title: "Reflections of Stillness",
//                 artist: "Isabelle Laurent",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/reflections_of_stillness.webp",
//                 },
//                 description:
//                   "A tranquil lake mirrors the soft hues of the sky as golden sunlight filters through the trees. Gentle ripples dance across the water, adding depth and movement to this serene scene. Expressive brushstrokes bring warmth and harmony, making this impressionist masterpiece a window into nature’s peaceful embrace.",
//                 averageRating: 4.8,
//                 startingPrice: 350,
//               },
//             },
//             {
//               cursor: "WzIwXQ==",
//               node: {
//                 id: "20",
//                 title: "Emerald Wilderness",
//                 artist: "Lucien Navarro",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/emerald_wilderness.webp",
//                 },
//                 description:
//                   "Dense and untamed, this vibrant jungle scene captures the raw beauty of nature. Sunlight pierces through the canopy, illuminating the rich greenery and bursts of exotic flowers. Expressive impressionist brushstrokes bring movement to the foliage, creating an immersive escape into the heart of the wild.",
//                 averageRating: 4.8,
//                 startingPrice: 340,
//               },
//             },
//           ],
//         },
//       },
//     },
//   },
//   {
//     request: {
//       query: ALL_ARTWORKS,
//       variables: { sortBy: "title", first: 20, after: "WzIwXQ==" },
//     },
//     result: {
//       data: {
//         allArtWorks: {
//           totalCount: 31,
//           pageInfo: {
//             startCursor: "WzIxXQ==",
//             endCursor: "WzMxXQ==",
//             hasNextPage: false,
//           },
//           edges: [
//             {
//               cursor: "WzIxXQ==",
//               node: {
//                 id: "21",
//                 title: "Crimson Sunset",
//                 artist: "Camille Dubois",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/crimson_sunset.webp",
//                 },
//                 description:
//                   "Fiery hues of red and orange paint the sky as the sun dips below the horizon. Expressive brushstrokes capture the fleeting beauty of twilight, casting a warm glow over the tranquil landscape. An evocative scene that celebrates the magic of nature’s daily spectacle.",
//                 averageRating: 4.9,
//                 startingPrice: 360,
//               },
//             },
//             {
//               cursor: "WzIyXQ==",
//               node: {
//                 id: "22",
//                 title: "Mystic River",
//                 artist: "Antoine Chevalier",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/mystic_river.webp",
//                 },
//                 description:
//                   "Mist hangs low over the still waters of a secluded river, as ancient trees line the banks. Soft, diffused light filters through the canopy, creating an ethereal atmosphere. Expressive brushstrokes capture the mystery and tranquility of this hidden sanctuary.",
//                 averageRating: 4.7,
//                 startingPrice: 350,
//               },
//             },
//             {
//               cursor: "WzIzXQ==",
//               node: {
//                 id: "23",
//                 title: "Azure Coast",
//                 artist: "Sophie Bernard",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/azure_coast.webp",
//                 },
//                 description:
//                   "Turquoise waters meet the rugged cliffs of a sun-drenched coastline. The vibrant blues and greens of the sea contrast with the warm earth tones of the rocks. Expressive brushstrokes capture the energy and beauty of this idyllic Mediterranean scene.",
//                 averageRating: 4.8,
//                 startingPrice: 370,
//               },
//             },
//             {
//               cursor: "WzI0XQ==",
//               node: {
//                 id: "24",
//                 title: "Enchanted Forest",
//                 artist: "Thierry Lambert",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/enchanted_forest.webp",
//                 },
//                 description:
//                   "Sunlight filters through the dense canopy of an ancient forest, casting dappled shadows on the mossy ground. Towering trees reach towards the sky, their branches intertwined to create a magical atmosphere. Expressive brushstrokes capture the mystery and wonder of this enchanted woodland.",
//                 averageRating: 4.9,
//                 startingPrice: 380,
//               },
//             },
//             {
//               cursor: "WzI1XQ==",
//               node: {
//                 id: "25",
//                 title: "Lavender Fields",
//                 artist: "Genevieve Dubois",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/lavender_fields.webp",
//                 },
//                 description:
//                   "Rolling hills of lavender stretch as far as the eye can see, their fragrant blooms swaying gently in the breeze. The soft purple hues of the flowers contrast with the golden sunlight, creating a scene of serene beauty. Expressive brushstrokes capture the essence of this idyllic Provençal landscape.",
//                 averageRating: 4.8,
//                 startingPrice: 390,
//               },
//             },
//             {
//               cursor: "WzI2XQ==",
//               node: {
//                 id: "26",
//                 title: "Snowy Peaks",
//                 artist: "Philippe Moreau",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/snowy_peaks.webp",
//                 },
//                 description:
//                   "Majestic snow-capped mountains rise above a pristine alpine valley. The crisp white peaks contrast with the deep blue sky, creating a scene of breathtaking beauty. Expressive brushstrokes capture the grandeur and serenity of this winter wonderland.",
//                 averageRating: 4.9,
//                 startingPrice: 400,
//               },
//             },
//             {
//               cursor: "WzI3XQ==",
//               node: {
//                 id: "27",
//                 title: "Sunflower Meadow",
//                 artist: "Celine Arnauld",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/sunflower_meadow.webp",
//                 },
//                 description:
//                   "A vibrant meadow filled with sunflowers stretches towards the horizon, their golden faces turned towards the sun. The warm hues of the flowers contrast with the deep blue sky, creating a scene of joyful abundance. Expressive brushstrokes capture the essence of this summer paradise.",
//                 averageRating: 4.7,
//                 startingPrice: 410,
//               },
//             },
//             {
//               cursor: "WzI4XQ==",
//               node: {
//                 id: "28",
//                 title: "Tropical Lagoon",
//                 artist: "Jean-Luc Picard",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/tropical_lagoon.webp",
//                 },
//                 description:
//                   "Turquoise waters lap against the white sandy beaches of a secluded tropical lagoon. Palm trees sway gently in the breeze, their fronds casting dappled shadows on the sand. Expressive brushstrokes capture the tranquility and beauty of this island paradise.",
//                 averageRating: 4.8,
//                 startingPrice: 420,
//               },
//             },
//             {
//               cursor: "WzI5XQ==",
//               node: {
//                 id: "29",
//                 title: "Autumn Orchard",
//                 artist: "Margot Dubois",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/autumn_orchard.webp",
//                 },
//                 description:
//                   "Apple trees laden with ripe fruit stand in neat rows in an autumn orchard. The warm hues of the leaves contrast with the deep blue sky, creating a scene of rustic charm. Expressive brushstrokes capture the essence of this bountiful harvest.",
//                 averageRating: 4.9,
//                 startingPrice: 430,
//               },
//             },
//             {
//               cursor: "WzMwXQ==",
//               node: {
//                 id: "30",
//                 title: "Starry Night",
//                 artist: "Gaspard Monet",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/starry_night.webp",
//                 },
//                 description:
//                   "A swirling night sky filled with stars illuminates a sleeping village below. The vibrant blues and yellows of the heavens contrast with the dark earth tones of the landscape. Expressive brushstrokes capture the mystery and wonder of this celestial scene.",
//                 averageRating: 4.7,
//                 startingPrice: 440,
//               },
//             },
//             {
//               cursor: "WzMxXQ==",
//               node: {
//                 id: "31",
//                 title: "Winter Cabin",
//                 artist: "Elise Martin",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/winter_cabin.webp",
//                 },
//                 description:
//                   "A cozy cabin nestled in a snowy forest glows with warm light from within. The crisp white snow contrasts with the deep green trees, creating a scene of peaceful solitude. Expressive brushstrokes capture the tranquility and beauty of this winter retreat.",
//                 averageRating: 4.8,
//                 startingPrice: 450,
//               },
//             },
//           ],
//         },
//       },
//     },
//   },
//   {
//     request: {
//       query: ALL_ARTWORKS,
//       variables: { sortBy: "artist", first: 20, after: null },
//     },
//     result: {
//       data: {
//         allArtWorks: {
//           totalCount: 31,
//           pageInfo: {
//             startCursor: "WyJBZHJpYW4gS292YWNzIiw0LjgsMjNd",
//             endCursor: "WyJMdWNpZW4gTmF2YXJybyIsNC44LDIwXQ==",
//             hasNextPage: true,
//           },
//           edges: [
//             {
//               cursor: "WyJBZHJpYW4gS292YWNzIiw0LjgsMjNd",
//               node: {
//                 id: "23",
//                 title: "Monolithic Silence",
//                 artist: "Adrian Kovacs",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/monolithic_silence.webp",
//                 },
//                 description:
//                   "Towering brutalist structures rise against a moody sky, their geometric forms casting deep shadows over the raw concrete landscape. Expressive brushstrokes soften the rigid geometry, blending light and shadow to create an atmospheric dreamlike effect. A powerful tribute to the beauty of brutalism through impressionist abstraction.",
//                 averageRating: 4.8,
//                 startingPrice: 360,
//               },
//             },
//             {
//               cursor: "WyJBbGVzc2FuZHJvIEZpb3JpbmkiLDQuOCwyNl0=",
//               node: {
//                 id: "26",
//                 title: "Eternal Venice",
//                 artist: "Alessandro Fiorini",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/eternal_venice.webp",
//                 },
//                 description:
//                   "The enchanting canals of Venice come to life in this impressionist masterpiece. Gondolas drift through shimmering waters, reflecting the warm glow of lanterns and historic architecture. Expressive brushstrokes capture the romance and timeless charm of this breathtaking city, evoking a dreamlike atmosphere.",
//                 averageRating: 4.8,
//                 startingPrice: 390,
//               },
//             },
//             {
//               cursor: "WyJDYW1pbGxlIFZlcmRhaW4iLDUsM10=",
//               node: {
//                 id: "3",
//                 title: "Whispers of the Bloom",
//                 artist: "Camille Verdain",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/whispers_of_the_bloom.webp",
//                 },
//                 description:
//                   "An impressionist vision of a sunlit poppy field, where vivid colors and dynamic brushstrokes capture the beauty of nature in motion.",
//                 averageRating: 5,
//                 startingPrice: 250,
//               },
//             },
//             {
//               cursor: "WyJFbGFyYSBEdXZhbGwiLDQuOCwxN10=",
//               node: {
//                 id: "17",
//                 title: "Autumn Serenity",
//                 artist: "Elara Duvall",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/autumn_serenity.webp",
//                 },
//                 description:
//                   "Golden leaves blanket the ground as a soft autumn breeze rustles through the trees. A winding path leads through the peaceful park, where warm lamplights glow softly near a reflective pond. Expressive brushstrokes bring a dreamy, nostalgic atmosphere to this stunning impressionist scene.",
//                 averageRating: 4.8,
//                 startingPrice: 340,
//               },
//             },
//             {
//               cursor: "WyJFbGVhbm9yIE1hcmNoYW5kIiwwLDEwXQ==",
//               node: {
//                 id: "10",
//                 title: "Meadow Serenity",
//                 artist: "Eleanor Marchand",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/meadow_serenity.webp",
//                 },
//                 description:
//                   "A tranquil river winds through a lush, colorful meadow, bathed in the golden glow of a serene afternoon. Soft brushstrokes and a rich palette of greens, yellows, and wildflower hues bring this peaceful landscape to life, evoking a sense of harmony and calm.",
//                 averageRating: 0,
//                 startingPrice: 410,
//               },
//             },
//             {
//               cursor: "WyJFbGlhcyBWYXJuZW4iLDUsMl0=",
//               node: {
//                 id: "2",
//                 title: "The Spirit of Freedom",
//                 artist: "Elias Varnen",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/the_spirit_of_freedom.webp",
//                 },
//                 description:
//                   "Vivid colors and flowing forms embody the untamed essence of movement. This artwork captures the raw energy and boundless freedom of a soul unrestrained.",
//                 averageRating: 5,
//                 startingPrice: 300,
//               },
//             },
//             {
//               cursor: "WyJFbGlhcyBWYXJuZW4iLDUsNV0=",
//               node: {
//                 id: "5",
//                 title: "Sunflowers at Dusk",
//                 artist: "Elias Varnen",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/sunflowers_at_dusk.webp",
//                 },
//                 description:
//                   "An impressionist vision of a sunflower field at dusk, where vibrant yellows and warm golden hues dance across the canvas, brought to life by dynamic brushstrokes that capture the fleeting beauty of twilight.",
//                 averageRating: 5,
//                 startingPrice: 200,
//               },
//             },
//             {
//               cursor: "WyJFbGlhcyBWYXJuZW4iLDQuOCwzMV0=",
//               node: {
//                 id: "31",
//                 title: "Tempest in the Sky",
//                 artist: "Elias Varnen",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/tempest_in_the_sky.webp",
//                 },
//                 description:
//                   "Dark storm clouds swirl in a dramatic dance of blues and grays, illuminated by brilliant flashes of lightning. Expressive impressionist brushstrokes bring the movement of the storm to life, blending power and beauty in a breathtaking composition. A stunning portrayal of nature’s raw energy.",
//                 averageRating: 4.8,
//                 startingPrice: 390,
//               },
//             },
//             {
//               cursor: "WyJFbGlhcyBWYXJuZW4iLDQuNSwxMl0=",
//               node: {
//                 id: "12",
//                 title: "Whispering Falls",
//                 artist: "Elias Varnen",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/whispering_falls.webp",
//                 },
//                 description:
//                   "An impressionist masterpiece capturing the ethereal beauty of a cascading waterfall surrounded by lush greenery. The vibrant brushstrokes and dreamy colors bring the scene to life, evoking a sense of movement and tranquility.",
//                 averageRating: 4.5,
//                 startingPrice: 320,
//               },
//             },
//             {
//               cursor: "WyJFbGlhcyBWYXJuZW4iLDQuNSwxM10=",
//               node: {
//                 id: "13",
//                 title: "Golden Horizon",
//                 artist: "Elias Varnen",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/golden_horizon.webp",
//                 },
//                 description:
//                   "Rolling green hills bathed in golden sunlight stretch into the horizon. The textured brushstrokes capture the wind dancing through the grass, while the soft pastel sky adds depth and warmth. A truly serene and timeless landscape.",
//                 averageRating: 4.5,
//                 startingPrice: 320,
//               },
//             },
//             {
//               cursor: "WyJFbGlqYWggQ2FydGVyIiwwLDdd",
//               node: {
//                 id: "7",
//                 title: "Golden Metropolis",
//                 artist: "Elijah Carter",
//                 image: {
//                   type: "portrait",
//                   width: 1024,
//                   height: 1792,
//                   uri: "/images/golden_metropolis.webp",
//                 },
//                 description:
//                   "A breathtaking cityscape bathed in golden hues as the sunlight reflects off towering skyscrapers. Thick, textured brushstrokes create a dynamic sense of movement in this bustling urban scene, capturing the energy and vibrancy of city life.",
//                 averageRating: 0,
//                 startingPrice: 400,
//               },
//             },
//             {
//               cursor: "WyJFbWlsaWEgTGF1cmVudCIsNC44LDMwXQ==",
//               node: {
//                 id: "30",
//                 title: "Tranquil Shoreline",
//                 artist: "Emilia Laurent",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/tranquil_shoreline.webp",
//                 },
//                 description:
//                   "Golden sands stretch along the shoreline as gentle turquoise waves roll onto the beach. Expressive impressionist brushstrokes bring movement to the water and sky, creating a soft, dreamy atmosphere. A peaceful and evocative tribute to the serenity of the sea.",
//                 averageRating: 4.8,
//                 startingPrice: 380,
//               },
//             },
//             {
//               cursor: "WyJJc2FiZWxsZSBMYXVyZW50Iiw0LjgsMTld",
//               node: {
//                 id: "19",
//                 title: "Reflections of Stillness",
//                 artist: "Isabelle Laurent",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/reflections_of_stillness.webp",
//                 },
//                 description:
//                   "A tranquil lake mirrors the soft hues of the sky as golden sunlight filters through the trees. Gentle ripples dance across the water, adding depth and movement to this serene scene. Expressive brushstrokes bring warmth and harmony, making this impressionist masterpiece a window into nature’s peaceful embrace.",
//                 averageRating: 4.8,
//                 startingPrice: 350,
//               },
//             },
//             {
//               cursor: "WyJJc2xhIERhdmVucG9ydCIsMCw5XQ==",
//               node: {
//                 id: "9",
//                 title: "Tempest’s Dance",
//                 artist: "Isla Davenport",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/tempest_dance.webp",
//                 },
//                 description:
//                   "Powerful waves crash and swirl in this mesmerizing seascape, capturing the raw energy and movement of the ocean. The rich blues, greens, and whites blend seamlessly, creating a sense of both chaos and harmony in this breathtaking painting.",
//                 averageRating: 0,
//                 startingPrice: 430,
//               },
//             },
//             {
//               cursor: "WyJKdWxpYW4gQXNoZm9yZCIsMCwxMV0=",
//               node: {
//                 id: "11",
//                 title: "Majestic Peaks",
//                 artist: "Julian Ashford",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/majestic_peaks.webp",
//                 },
//                 description:
//                   "A breathtaking mountain range bathed in the golden hues of dawn. Snow-capped peaks rise dramatically above a tranquil lake, as mist gently rolls over the valleys. This stunning landscape captures the grandeur and serenity of nature at its finest.",
//                 averageRating: 0,
//                 startingPrice: 450,
//               },
//             },
//             {
//               cursor: "WyJKdWxpZXR0ZSBNb3JlbCIsNC44LDI1XQ==",
//               node: {
//                 id: "25",
//                 title: "Parisian Elegance",
//                 artist: "Juliette Morel",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/parisian_elegance.webp",
//                 },
//                 description:
//                   "The Eiffel Tower rises gracefully above the Parisian skyline, bathed in soft sunlight. Expressive brushstrokes bring out the intricate latticework, while the dreamy hues of the city below evoke the romance and charm of Paris. A stunning impressionist masterpiece capturing the essence of the City of Light.",
//                 averageRating: 4.8,
//                 startingPrice: 380,
//               },
//             },
//             {
//               cursor: "WyJMaW9yYSBTZW5uIiw0LjUsMV0=",
//               node: {
//                 id: "1",
//                 title: "A Vision in Color",
//                 artist: "Liora Senn",
//                 image: {
//                   type: "portrait",
//                   width: 1024,
//                   height: 1792,
//                   uri: "/images/a_vision_in_color.webp",
//                 },
//                 description:
//                   "Bold brushstrokes and rich hues of purple, blue, and red bring this abstract masterpiece to life. A striking blend of movement and emotion, this piece captures energy and depth in every layer.",
//                 averageRating: 4.5,
//                 startingPrice: 350,
//               },
//             },
//             {
//               cursor: "WyJMaXZpYSBNYXJjZWF1Iiw0LjY2NjY2NjY2NjY2NjY2NywxNF0=",
//               node: {
//                 id: "14",
//                 title: "The Cozy Haven",
//                 artist: "Livia Marceau",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/the_cozy_haven.webp",
//                 },
//                 description:
//                   "Nestled among vibrant wildflowers, this picturesque countryside cottage exudes warmth and tranquility. Golden sunlight bathes the stone walls, while a winding path leads to the inviting front door. The impressionist brushstrokes bring life to the trees and sky, making this an enchanting escape into nature.",
//                 averageRating: 4.7,
//                 startingPrice: 330,
//               },
//             },
//             {
//               cursor: "WyJMdWNpZW4gTW9yZWF1Iiw0LDRd",
//               node: {
//                 id: "4",
//                 title: "Guardian of Healing",
//                 artist: "Lucien Moreau",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/guardian_of_healing.webp",
//                 },
//                 description:
//                   "A quiet devotion unfolds in flowing color, where light and movement intertwine with the weight of knowledge and the urgency of compassion. Each brushstroke lingers, a testament to hands that heal and time that passes.",
//                 averageRating: 4,
//                 startingPrice: 300,
//               },
//             },
//             {
//               cursor: "WyJMdWNpZW4gTmF2YXJybyIsNC44LDIwXQ==",
//               node: {
//                 id: "20",
//                 title: "Emerald Wilderness",
//                 artist: "Lucien Navarro",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/emerald_wilderness.webp",
//                 },
//                 description:
//                   "Dense and untamed, this vibrant jungle scene captures the raw beauty of nature. Sunlight pierces through the canopy, illuminating the rich greenery and bursts of exotic flowers. Expressive impressionist brushstrokes bring movement to the foliage, creating an immersive escape into the heart of the wild.",
//                 averageRating: 4.8,
//                 startingPrice: 340,
//               },
//             },
//           ],
//         },
//       },
//     },
//   },
//   {
//     request: {
//       query: ALL_ARTWORKS,
//       variables: {
//         sortBy: "artist",
//         first: 20,
//         after: "WyJMdWNpZW4gTmF2YXJybyIsNC44LDIwXQ==",
//       },
//     },
//     result: {
//       data: {
//         allArtWorks: {
//           totalCount: 31,
//           pageInfo: {
//             startCursor: "WyJNYXJjIE1vbm5ldCIsMCw2XQ==",
//             endCursor: "WyJXaWxsaWFtIEFzaGZvcmQiLDQuOCwyNF0=",
//             hasNextPage: false,
//           },
//           edges: [
//             {
//               cursor: "WyJNYXJjIE1vbm5ldCIsMCw2XQ==",
//               node: {
//                 id: "6",
//                 title: "Whispering Canopy",
//                 artist: "Marc Monnet",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/whispering_canopy.webp",
//                 },
//                 description:
//                   "A mesmerizing woodland scene where sunlight filters through dense foliage, casting an ethereal glow on the forest path. Rich in greens and deep blues, this painting evokes serenity and mystery, drawing viewers into nature’s embrace.",
//                 averageRating: 0,
//                 startingPrice: 375,
//               },
//             },
//             {
//               cursor: "WyJNYXJjZWxsbyBGb250YWluZSIsNC41LDE2XQ==",
//               node: {
//                 id: "16",
//                 title: "City Lights",
//                 artist: "Marcello Fontaine",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/city_lights.webp",
//                 },
//                 description:
//                   "A bustling city street at dusk comes alive with shimmering reflections of neon lights on the wet pavement. Silhouetted figures move through the glow of streetlamps, their forms captured in expressive, impressionist brushstrokes. The atmosphere is rich with movement, color, and the timeless beauty of urban life.",
//                 averageRating: 4.5,
//                 startingPrice: 350,
//               },
//             },
//             {
//               cursor: "WyJNYXR0ZW8gTGF2aWduZSIsNC44LDI3XQ==",
//               node: {
//                 id: "27",
//                 title: "Valley of Light",
//                 artist: "Matteo Lavigne",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/valley_of_light.webp",
//                 },
//                 description:
//                   "Rolling green hills and distant mountains frame a serene valley, where a river winds gracefully through golden fields. Expressive impressionist brushstrokes capture the warmth of sunlight and the gentle movement of nature, evoking a sense of peace and untouched beauty.",
//                 averageRating: 4.8,
//                 startingPrice: 380,
//               },
//             },
//             {
//               cursor: "WyJOYXRoYW5pZWwgSGFycGVyIiwwLDhd",
//               node: {
//                 id: "8",
//                 title: "Twilight Reflections",
//                 artist: "Nathaniel Harper",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/twilight_reflections.webp",
//                 },
//                 description:
//                   "An enchanting city skyline illuminated by the warm glow of twilight. The vibrant mix of purples, oranges, and blues brings depth and emotion to this mesmerizing urban scene, where reflections dance on the shimmering water below.",
//                 averageRating: 0,
//                 startingPrice: 420,
//               },
//             },
//             {
//               cursor: "WyJOaWNvIFZhcmdhcyIsNC44LDIxXQ==",
//               node: {
//                 id: "21",
//                 title: "Fragmented Identity",
//                 artist: "Nico Vargas",
//                 image: {
//                   type: "portrait",
//                   width: 1024,
//                   height: 1792,
//                   uri: "/images/fragmented_identity.webp",
//                 },
//                 description:
//                   "A bold and expressive cubist portrait, deconstructing the human form into dynamic geometric shapes and overlapping perspectives. Vivid contrasts of color and fragmented planes create a striking sense of depth and emotion, inviting the viewer to interpret multiple facets of identity.",
//                 averageRating: 4.8,
//                 startingPrice: 370,
//               },
//             },
//             {
//               cursor: "WyJTZWJhc3RpYW4gTW9yZWF1Iiw0LjgsMThd",
//               node: {
//                 id: "18",
//                 title: "Urban Heights",
//                 artist: "Sebastian Moreau",
//                 image: {
//                   type: "portrait",
//                   width: 1024,
//                   height: 1792,
//                   uri: "/images/urban_heights.webp",
//                 },
//                 description:
//                   "Towering skyscrapers rise into the evening sky, their glass facades glowing with the warm hues of the setting sun. Expressive brushstrokes capture the shimmering reflections and the energy of the bustling city below. A breathtaking vertical composition that evokes the grandeur of modern architecture.",
//                 averageRating: 4.8,
//                 startingPrice: 360,
//               },
//             },
//             {
//               cursor: "WyJTdXJ5YSBQYXRlbCIsNC44LDI5XQ==",
//               node: {
//                 id: "29",
//                 title: "Eternal Peaks of the Himalayas",
//                 artist: "Surya Patel",
//                 image: {
//                   type: "square",
//                   width: 1024,
//                   height: 1024,
//                   uri: "/images/eternal_peaks_of_the_himalayas.webp",
//                 },
//                 description:
//                   "The majestic Himalayas rise into the sky, their snow-capped peaks bathed in golden light. Expressive impressionist brushstrokes bring the movement of clouds and icy slopes to life, evoking a breathtaking sense of tranquility and power. A timeless tribute to one of Earth’s most awe-inspiring landscapes.",
//                 averageRating: 4.8,
//                 startingPrice: 410,
//               },
//             },
//             {
//               cursor: "WyJUZW56aW5nIE5vcmJ1Iiw0LjgsMjhd",
//               node: {
//                 id: "28",
//                 title: "Sacred Heights of Tibet",
//                 artist: "Tenzing Norbu",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/sacred_heights_of_tibet.webp",
//                 },
//                 description:
//                   "Snow-capped mountains tower over the vast Tibetan valleys, where a winding river reflects the golden hues of the sky. Vibrant monasteries and prayer flags bring a spiritual energy to the landscape, captured through expressive impressionist brushstrokes. A breathtaking tribute to Tibet’s serene and majestic beauty.",
//                 averageRating: 4.8,
//                 startingPrice: 400,
//               },
//             },
//             {
//               cursor: "WyJWaWN0b3IgQXJkZW50Iiw0Ljc1LDE1XQ==",
//               node: {
//                 id: "15",
//                 title: "Tempest Unleashed",
//                 artist: "Victor Ardent",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/tempest_unleashed.webp",
//                 },
//                 description:
//                   "Towering waves crash against jagged cliffs as storm clouds swirl overhead. A haunting glow filters through the darkness, illuminating the chaotic sea in this breathtaking impressionist masterpiece. The powerful brushstrokes and deep contrasts capture the raw energy and beauty of nature’s untamed force.",
//                 averageRating: 4.8,
//                 startingPrice: 340,
//               },
//             },
//             {
//               cursor: "WyJWaWt0b3IgU29rb2xvdiIsNC44LDIyXQ==",
//               node: {
//                 id: "22",
//                 title: "Defender of the Nation",
//                 artist: "Viktor Sokolov",
//                 image: {
//                   type: "portrait",
//                   width: 1024,
//                   height: 1792,
//                   uri: "/images/defender_of_the_nation.webp",
//                 },
//                 description:
//                   "A striking impressionist-style propaganda poster featuring a heroic soldier standing with unwavering resolve. Expressive brushstrokes bring life to the determined gaze and strong posture, while the patriotic background evokes unity and strength. A bold and inspiring piece that merges history with artistic expression.",
//                 averageRating: 4.8,
//                 startingPrice: 380,
//               },
//             },
//             {
//               cursor: "WyJXaWxsaWFtIEFzaGZvcmQiLDQuOCwyNF0=",
//               node: {
//                 id: "24",
//                 title: "Majestic Cliffs",
//                 artist: "William Ashford",
//                 image: {
//                   type: "landscape",
//                   width: 1792,
//                   height: 1024,
//                   uri: "/images/majestic_cliffs.webp",
//                 },
//                 description:
//                   "The towering white chalk cliffs of Dover stand proudly against the deep blue sea, their rugged textures brought to life with expressive impressionist brushstrokes. Sunlight filters through a soft, cloudy sky, casting a warm glow over the breathtaking coastline. A tribute to the awe-inspiring beauty of this natural wonder.",
//                 averageRating: 4.8,
//                 startingPrice: 370,
//               },
//             },
//           ],
//         },
//       },
//     },
//   },
// ];

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
