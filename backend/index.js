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
    findArtWork(id: ID!): ArtWork
  }
`;

const encodeCursor = (id) => Buffer.from(id.toString()).toString("base64");
const decodeCursor = (cursor) =>
  Buffer.from(cursor, "base64").toString("ascii");

const sortComparators = {
  title: (a, b) => a.title.localeCompare(b.title),
  artist: (a, b) => a.artist.localeCompare(b.artist),
  price: (a, b) => a.sizes[0].price - b.sizes[0].price,
  rating: (a, b) => b.averageRating - a.averageRating,
};

const resolvers = {
  Query: {
    artWorksCount: () => artworks.length,
    allArtWorks: (root, { sortBy = "title", first = 3, after }) => {
      const sortedArtworks = [...artworks].sort(
        sortComparators[sortBy] || sortComparators.title
      );

      const startIndex = after
        ? sortedArtworks.findIndex(
            (artwork) => artwork.id.toString() === decodeCursor(after)
          ) + 1
        : 0;

      const paginatedArtworks = sortedArtworks.slice(
        startIndex,
        startIndex + first
      );

      const edges = paginatedArtworks.map((artwork) => ({
        cursor: encodeCursor(artwork.id.toString()),
        node: artwork,
      }));

      const startCursor = edges.length ? edges[0].cursor : null;
      const endCursor = edges.length ? edges[edges.length - 1].cursor : null;
      const hasNextPage = startIndex + first < sortedArtworks.length;

      return {
        totalCount: sortedArtworks.length,
        edges,
        pageInfo: {
          startCursor,
          endCursor,
          hasNextPage,
        },
      };
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
