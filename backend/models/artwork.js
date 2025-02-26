import { Model, DataTypes } from "sequelize";
import pkg from "sequelize-cursor-pagination";
const { makePaginate } = pkg;

import { sequelize } from "../db.js";

class Artwork extends Model {}
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
