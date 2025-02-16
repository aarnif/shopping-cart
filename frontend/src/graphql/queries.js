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
  query allArtWorks {
    allArtWorks {
      ...ArtDetails
    }
  }

  ${ART_DETAILS}
`;

export const FIND_ARTWORK = gql`
  query findArtWork($id: ID!) {
    findArtWork(id: $id) {
      ...ArtDetails
    }
  }

  ${ART_DETAILS}
`;
