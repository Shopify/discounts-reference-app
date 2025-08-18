import { GET_COLLECTIONS } from "../graphql/collections";
import { authenticate } from "../shopify.server";

interface Collection {
  id: string;
  title: string;
}

export async function getCollectionsByIds(
  request: Request,
  collectionIds: string[],
) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(GET_COLLECTIONS, {
    variables: {
      ids: collectionIds.map((id: string) =>
        id.includes("gid://") ? id : `gid://shopify/Collection/${id}`,
      ),
    },
  });

  const { data } = await response.json();
  return data.nodes.filter(Boolean) as Collection[];
}
