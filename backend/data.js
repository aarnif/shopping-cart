const artworks = [
  {
    id: "1",
    title: "A Vision in Color",
    artist: "Liora Senn",
    image: "/images/emotion.webp",
    description:
      "Bold brushstrokes and rich hues of purple, blue, and red bring this abstract masterpiece to life. A striking blend of movement and emotion, this piece captures energy and depth in every layer.",
    averageRating: 4,
    type: "portrait",
    sizes: [
      { dimensions: "40 x 55 cm", price: 350 },
      { dimensions: "50 x 70 cm", price: 450 },
      { dimensions: "60 x 85 cm", price: 550 },
      { dimensions: "70 x 100 cm", price: 650 },
      { dimensions: "85 x 120 cm", price: 750 },
      { dimensions: "100 x 140 cm", price: 850 },
    ],
    reviews: [
      {
        name: "Sarah M.",
        date: "January 10, 2025",
        rating: 5,
        text: "Absolutely stunning! The colors are vibrant, and the details are even more breathtaking in person.",
      },
      {
        name: "John D.",
        date: "February 5, 2025",
        rating: 4,
        text: "Beautiful artwork, but the frame was slightly scratched upon arrival. Still a great piece!",
      },
    ],
  },
  {
    id: "2",
    title: "The Spirit of Freedom",
    artist: "Elias Varnen",
    image: "/images/spirit.webp",
    description:
      "Vivid colors and flowing forms embody the untamed essence of movement. This artwork captures the raw energy and boundless freedom of a soul unrestrained.",
    averageRating: 5,
    type: "landscape",
    sizes: [
      { dimensions: "55 x 40 cm", price: 300 },
      { dimensions: "70 x 50 cm", price: 400 },
      { dimensions: "85 x 60 cm", price: 500 },
      { dimensions: "100 x 70 cm", price: 600 },
      { dimensions: "120 x 85 cm", price: 700 },
      { dimensions: "140 x 100 cm", price: 800 },
    ],
    reviews: [
      {
        name: "Emily R.",
        date: "March 8, 2025",
        rating: 5,
        text: "This piece brought so much life into my living room. Highly recommended!",
      },
      {
        name: "Liam K.",
        date: "April 1, 2025",
        rating: 5,
        text: "Even more beautiful in person than online. Great quality!",
      },
    ],
  },
  {
    id: "3",
    title: "Guardian of Healing",
    artist: "Lucien Moreau",
    image: "/images/doctor.webp",
    description:
      "A quiet devotion unfolds in flowing color, where light and movement intertwine with the weight of knowledge and the urgency of compassion. Each brushstroke lingers, a testament to hands that heal and time that passes.",
    averageRating: 4,
    type: "portrait",
    sizes: [
      { dimensions: "55 x 40 cm", price: 300 },
      { dimensions: "70 x 50 cm", price: 400 },
      { dimensions: "85 x 60 cm", price: 500 },
      { dimensions: "100 x 70 cm", price: 600 },
      { dimensions: "120 x 85 cm", price: 700 },
      { dimensions: "140 x 100 cm", price: 800 },
    ],
    reviews: [
      {
        name: "Noah W.",
        date: "May 15, 2025",
        rating: 4,
        text: "A great addition to my office, but shipping took longer than expected.",
      },
    ],
  },
  {
    id: "4",
    title: "Whispers of the Bloom",
    artist: "Camille Verdain",
    image: "/images/poppies.webp",
    description:
      "An impressionist vision of a sunlit poppy field, where vivid colors and dynamic brushstrokes capture the beauty of nature in motion.",
    averageRating: 5,
    type: "landscape",
    sizes: [
      { dimensions: "60 x 45 cm", price: 250 },
      { dimensions: "75 x 55 cm", price: 350 },
      { dimensions: "90 x 65 cm", price: 450 },
      { dimensions: "110 x 80 cm", price: 550 },
      { dimensions: "130 x 95 cm", price: 650 },
      { dimensions: "150 x 110 cm", price: 750 },
    ],
    reviews: [
      {
        name: "Olivia P.",
        date: "June 22, 2025",
        rating: 5,
        text: "Absolutely love this piece! It fits perfectly in my dining room.",
      },
    ],
  },
  {
    id: "5",
    title: "Sunflowers at Dusk",
    artist: "Elias Varnen",
    image: "/images/sunflowers.webp",
    description:
      "An impressionist vision of a sunflower field at dusk, where vibrant yellows and warm golden hues dance across the canvas, brought to life by dynamic brushstrokes that capture the fleeting beauty of twilight.",
    averageRating: 5,
    type: "landscape",
    sizes: [
      { dimensions: "58 x 42 cm", price: 200 },
      { dimensions: "72 x 52 cm", price: 300 },
      { dimensions: "88 x 65 cm", price: 400 },
      { dimensions: "105 x 75 cm", price: 500 },
      { dimensions: "125 x 90 cm", price: 600 },
      { dimensions: "145 x 105 cm", price: 700 },
    ],
    reviews: [
      {
        name: "James C.",
        date: "July 30, 2025",
        rating: 5,
        text: "The details in this painting are incredible. Looks even better in natural light!",
      },
      {
        name: "Sophia L.",
        date: "August 12, 2025",
        rating: 5,
        text: "The colors are so rich and deep. Perfect for my bedroom!",
      },
    ],
  },
];

export default artworks;
