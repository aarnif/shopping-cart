const artData = [
  {
    __typename: "ArtWork",
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
        name: "John D.",
        date: "05-02-2025",
        rating: 4,
        text: "Beautiful artwork, but the frame was slightly scratched upon arrival. Still a great piece!",
      },
      {
        name: "Sarah M.",
        date: "10-01-2025",
        rating: 5,
        text: "Absolutely stunning! The colors are vibrant, and the details are even more breathtaking in person.",
      },
    ],
  },
  {
    __typename: "ArtWork",
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
    sizes: [
      {
        width: 55,
        height: 40,
        price: 300,
      },
      {
        width: 70,
        height: 50,
        price: 400,
      },
      {
        width: 85,
        height: 60,
        price: 500,
      },
      {
        width: 100,
        height: 70,
        price: 600,
      },
      {
        width: 120,
        height: 85,
        price: 700,
      },
      {
        width: 140,
        height: 100,
        price: 800,
      },
    ],
    reviews: [
      {
        name: "Liam K.",
        date: "01-04-2025",
        rating: 5,
        text: "Even more beautiful in person than online. Great quality!",
      },
      {
        name: "Emily R.",
        date: "08-03-2025",
        rating: 5,
        text: "This piece brought so much life into my living room. Highly recommended!",
      },
    ],
  },
  {
    __typename: "ArtWork",
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
    sizes: [
      {
        width: 60,
        height: 45,
        price: 250,
      },
      {
        width: 75,
        height: 55,
        price: 350,
      },
      {
        width: 90,
        height: 65,
        price: 450,
      },
      {
        width: 110,
        height: 80,
        price: 550,
      },
      {
        width: 130,
        height: 95,
        price: 650,
      },
      {
        width: 150,
        height: 110,
        price: 750,
      },
    ],
    reviews: [
      {
        name: "Olivia P.",
        date: "22-06-2025",
        rating: 5,
        text: "Absolutely love this piece! It fits perfectly in my dining room.",
      },
    ],
  },
  {
    __typename: "ArtWork",
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
    sizes: [
      {
        width: 55,
        height: 40,
        price: 300,
      },
      {
        width: 70,
        height: 50,
        price: 400,
      },
      {
        width: 85,
        height: 60,
        price: 500,
      },
      {
        width: 100,
        height: 70,
        price: 600,
      },
      {
        width: 120,
        height: 85,
        price: 700,
      },
      {
        width: 140,
        height: 100,
        price: 800,
      },
    ],
    reviews: [
      {
        name: "Noah W.",
        date: "15-05-2025",
        rating: 4,
        text: "A great addition to my office, but shipping took longer than expected.",
      },
    ],
  },
];

export default artData;
