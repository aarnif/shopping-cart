import { Artwork, Image, Size, Review } from "./models/index.js";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { connectToDatabase } from "./db.js";

const typeDefs = `
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
    date: String!
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
  Query: {
    artWorksCount: () => Artwork.count(),
    allArtWorks: (root, { sortBy = "title", first = 3, after = null }) => {
      sortBy = sortBy === "" ? "title" : sortBy;
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
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

start();
