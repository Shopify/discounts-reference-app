import { GET_FUNCTIONS } from "../graphql/functions";
import { authenticate } from "../shopify.server";

export interface ShopifyFunction {
  id: string;
  title: string;
  functionType: string;
}

export async function getFunctions(request: Request) {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(GET_FUNCTIONS);
  const json = await response.json();
  return json.data.shopifyFunctions.nodes as ShopifyFunction[];
}
