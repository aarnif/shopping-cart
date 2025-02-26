import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db.js";

class Size extends Model {}
Size.init(
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
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "size",
  }
);

export default Size;
