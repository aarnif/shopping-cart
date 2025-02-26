import { DataTypes } from "sequelize";

export default {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("artworks", "starting_price", {
      type: DataTypes.FLOAT,
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("artworks", "starting_price");
  },
};
