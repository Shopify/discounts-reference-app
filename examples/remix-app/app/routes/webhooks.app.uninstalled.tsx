import type { ActionFunctionArgs } from "@remix-run/node";

import db from "../db.server";
import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { shop, session } = await authenticate.webhook(request);

  try {
    // If this webhook already ran, the session may have been deleted previously.
    if (session) {
      await db.session.deleteMany({ where: { shop } });
    }

    return new Response();
  } catch (error) {
    return { error: `Error processing webhook: ${error}`, status: 500 };
  }
};
