import type { ActionFunctionArgs } from "@remix-run/node";

import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { payload } = await authenticate.webhook(request);

  try {
    // Add your webhook processing logic here using payload if needed
    return new Response(JSON.stringify(payload));
  } catch (e) {
    return { error: `Error processing webhook: ${e}`, status: 500 };
  }
};
