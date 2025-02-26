import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db.js";

class Image extends Model {}
Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    artworkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "artworks",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("portrait", "landscape", "square"),
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "image",
  }
);

export default Image;
