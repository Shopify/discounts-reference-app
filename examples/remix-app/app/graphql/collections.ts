export const GET_COLLECTIONS = `
  query GetCollections($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Collection {
        id
        title
      }
    }
  }
`;
