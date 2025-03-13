import { gql } from "@apollo/client";

export const ART_DETAILS = gql`
  fragment ArtDetails on ArtWork {
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

export const FEATURED_ARTWORKS = gql`
  query FeaturedArtWorks {
    featuredArtWorks {
      id
      title
      artist
      image {
        type
        uri
      }
      description
      averageRating
      startingPrice
      reviewsCount
    }
  }
`;

export const FIND_ARTWORK = gql`
  query FindArtWork($id: ID!) {
    findArtWork(id: $id) {
      ...ArtDetails
    }
  }

  ${ART_DETAILS}
`;
