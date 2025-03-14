import { gql } from "@apollo/client";

export const ALL_ARTWORKS = gql`
  query AllArtWorks($sortBy: String, $first: Int, $after: ID) {
    allArtWorks(sortBy: $sortBy, first: $first, after: $after) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          artist
          image {
            type
            width
            height
            uri
          }
          description
          averageRating
          startingPrice
        }
      }
    }
  }
`;

export const FEATURED_ARTWORKS = gql`
  query FeaturedArtWorks {
    featuredArtWorks {
      id
      title
      artist
      description
      image {
        type
        uri
      }
      startingPrice
      averageRating
      reviewsCount
    }
  }
`;

export const FIND_ARTWORK = gql`
  query FindArtWork($id: ID!) {
    findArtWork(id: $id) {
      id
      title
      artist
      description
      image {
        type
        width
        height
        uri
      }
      sizes {
        width
        height
        price
      }
      reviews {
        name
        date
        rating
        text
      }
    }
  }
`;
