import { GraphQLScalarType } from "graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import cors from "cors";
import http from "http";
import { format } from "date-fns";

import { Artwork, Image, Size, Review } from "./models/index.js";
import { connectToDatabase } from "./db.js";
import config from "../config.js";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return format(value, "dd-MM-yyyy");
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
});

const typeDefs = `
    scalar Date
  
    type Image {
      type: String!
      width: Int!
      height: Int!
      uri: String!
    }
  
    type Size {
      width: Int!
      height: Int!
      price: Int!
    }
      
    type Review {
      name: String!
      date: Date!
      rating: Int!
      text: String!
    }
  
    type ArtWork {
      id: ID!
      title: String!
      artist: String!
      image: Image!
      description: String!
      averageRating: Float!
      startingPrice: Float!
      type: String!
      sizes: [Size!]!
      reviews: [Review!]!
    }
  
    type ArtWorksConnection {
      totalCount: Int
      edges: [ArtWorkEdge]
      pageInfo: PageInfo!
    }
   
    type ArtWorkEdge {
      cursor: ID!
      node: ArtWork!
    }
  
    type PageInfo {
      startCursor: ID
      endCursor: ID
      hasNextPage: Boolean!
    }
  
    type Query {
      artWorksCount: Int!
      allArtWorks(sortBy: String, first: Int, after: ID): ArtWorksConnection!
      featuredArtWorks: [ArtWork!]!
      findArtWork(id: ID!): ArtWork
    }
  `;

const resolvers = {
  Date: dateScalar,
  Query: {
    artWorksCount: () => Artwork.count(),
    allArtWorks: (root, { sortBy = "", first = 3, after = null }) => {
      let order;

      switch (sortBy) {
        case "title":
          order = [
            ["title", "ASC"],
            ["averageRating", "DESC"],
          ];
          break;
        case "artist":
          order = [
            ["artist", "ASC"],
            ["averageRating", "DESC"],
          ];
          break;
        case "rating":
          order = [
            ["averageRating", "DESC"],
            ["title", "ASC"],
          ];
          break;
        case "price":
          order = [
            ["startingPrice", "ASC"],
            ["title", "ASC"],
          ];
          break;
        default:
          order = [["id", "ASC"]];
      }

      return Artwork.paginate({
        order,
        limit: first,
        after,
        include: [Image, Size, Review],
      });
    },
    // Currently featured artworks are just the first 4 artworks based on the id
    featuredArtWorks: async () =>
      Artwork.findAll({
        limit: 4,
        include: [Image, Size, Review],
      }),
    findArtWork: (root, args) =>
      Artwork.findByPk(args.id, { include: [Image, Size, Review] }),
  },
};

const start = async () => {
  await connectToDatabase();
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use("/", cors(), express.json(), expressMiddleware(server));
  const PORT = config.PORT;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on port ${PORT}`)
  );

  return server;
};

export { start };
