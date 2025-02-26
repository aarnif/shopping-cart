import { DataTypes } from "sequelize";

export default {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("artworks", {
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
    });
    await queryInterface.createTable("images", {
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
    });
    await queryInterface.createTable("sizes", {
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
    });
    await queryInterface.createTable("reviews", {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("reviews");
    await queryInterface.dropTable("sizes");
    await queryInterface.dropTable("images");
    await queryInterface.dropTable("artworks");
  },
};
