import { gql } from "@apollo/client";

export const ART_DETAILS = gql`
  fragment ArtDetails on ArtWork {
    id
    title
    artist
    averageRating
    description
    image
    reviews {
      date
      name
      rating
      text
    }
    type
    sizes {
      price
      dimensions
    }
  }
`;

export const ALL_ARTWORKS = gql`
  query AllArtWorks($sortBy: String, $first: Int, $after: ID) {
    allArtWorks(sortBy: $sortBy, first: $first, after: $after) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      totalCount
      edges {
        cursor
        node {
          ...ArtDetails
        }
      }
    }
  }

  ${ART_DETAILS}
`;

export const FIND_ARTWORK = gql`
  query FindArtWork($id: ID!) {
    findArtWork(id: $id) {
      ...ArtDetails
    }
  }

  ${ART_DETAILS}
`;
