const artworks = [
  {
    id: "1",
    title: "Art Work",
    artist: "Artist Name",
    image: "/images/emotion.webp",
    description: "Card Description",
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
    title: "Art Work",
    artist: "Artist Name",
    image: "/images/spirit.webp",
    description: "Card Description",
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
    title: "Art Work",
    artist: "Artist Name",
    image: "/images/doctor.webp",
    description: "Card Description",
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
    title: "Art Work",
    artist: "Artist Name",
    image: "/images/poppies.webp",
    description: "Card Description",
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
    title: "Art Work",
    artist: "Artist Name",
    image: "/images/sunflowers.webp",
    description: "Card Description",
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
