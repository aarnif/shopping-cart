import Artwork from "./models/artwork.js";
import Image from "./models/image.js";
import Size from "./models/size.js";
import Review from "./models/review.js";

import { sequelize, connectToDatabase } from "./db.js";

import artworks from "./data.js";

export const emptyDatabase = async () => {
  console.log("Emptying database...");
  await sequelize.drop({ force: true });
  console.log("Database emptied!");
};

export const addArtworks = async () => {
  console.log("Creating tables...");
  await sequelize.sync();
  console.log("Tables created!");

  for (const artwork of artworks) {
    const { id, image, sizes, reviews, ...artworkData } = artwork;

    const newArtwork = await Artwork.create(artworkData);

    await Image.create({
      ...image,
      artworkId: newArtwork.id,
    });

    for (const size of sizes) {
      await Size.create({
        ...size,
        artworkId: newArtwork.id,
      });
    }

    for (const review of reviews) {
      await Review.create({
        ...review,
        artworkId: newArtwork.id,
      });
    }
  }

  console.log("Artworks added!");
};

const main = async () => {
  await connectToDatabase();
  await emptyDatabase();
  await addArtworks();

  await sequelize.close();
  console.log("Connection closed!");
};

if (process.env.NODE_ENV !== "test") {
  main();
}
