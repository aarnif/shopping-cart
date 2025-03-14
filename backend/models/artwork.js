import { Model, DataTypes } from "sequelize";
import pkg from "sequelize-cursor-pagination";
const { makePaginate } = pkg;

import Review from "./review.js";
import Size from "./size.js";
import { sequelize } from "../db.js";

class Artwork extends Model {
  async getReviewCount() {
    return await Review.count({
      where: {
        artworkId: this.id,
      },
    });
  }
  async getStartingPrice() {
    return await Size.min("price", {
      where: {
        artworkId: this.id,
      },
    });
  }
  async getAverageRating() {
    const result = await Review.findOne({
      attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "average"]],
      where: {
        artworkId: this.id,
      },
      raw: true,
    });
    return result && result.average ? parseFloat(result.average).toFixed(1) : 0;
  }
}
Artwork.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    averageRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    startingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "artwork",
  }
);

Artwork.paginate = makePaginate(Artwork);

export default Artwork;
