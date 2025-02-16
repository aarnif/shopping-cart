import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import artworks from "../frontend/src/data.js";

const typeDefs = `
  type Size {
    dimensions: String!
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
    image: String!
    description: String!
    averageRating: Float!
    type: String!
    sizes: [Size!]!
    reviews: [Review!]!
  }

  type Query {
    artWorksCount: Int!
    allArtWorks: [ArtWork!]!
    findArtWork(id: ID!): ArtWork
  }
`;

const resolvers = {
  Query: {
    artWorksCount: () => artworks.length,
    allArtWorks: () => artworks,
    findArtWork: (root, args) =>
      artworks.find((artwork) => artwork.id === args.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
