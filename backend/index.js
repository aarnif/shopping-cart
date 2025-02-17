import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import artworks from "./data.js";

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
    allArtWorks(sortBy: String): [ArtWork!]!
    findArtWork(id: ID!): ArtWork
  }
`;

const resolvers = {
  Query: {
    artWorksCount: () => artworks.length,
    allArtWorks: (root, args) => {
      if (args.sortBy === "artist") {
        return artworks.sort((a, b) => a.artist.localeCompare(b.artist));
      } else if (args.sortBy === "price") {
        return artworks.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
      } else if (args.sortBy === "rating") {
        return artworks.sort((a, b) => b.averageRating - a.averageRating);
      } else {
        return artworks.sort((a, b) => a.title.localeCompare(b.title));
      }
    },
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
