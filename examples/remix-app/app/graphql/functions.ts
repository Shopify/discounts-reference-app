export const GET_FUNCTIONS = `
  query GetFunctions {
    shopifyFunctions(first: 10) {
      nodes {
        id
        title
      }
    }
  }
`;
