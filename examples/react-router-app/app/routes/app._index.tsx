import { type LoaderFunctionArgs, useLoaderData } from "react-router";

import { getFunctions } from "../models/functions.server";
import { returnToDiscounts } from "../utils/navigation";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const functions = await getFunctions(request);
  return { functions };
};

export async function action() {}

export default function Index() {
  const { functions } = useLoaderData<typeof loader>();

  return (
    <s-page>
      <ui-title-bar title="Discount Functions">
        <button onClick={returnToDiscounts}>View all discounts</button>
      </ui-title-bar>

      {functions.length === 0 ? (
        <s-section accessibilityLabel="Empty state section">
          <s-grid gap="base" justifyItems="center" paddingBlock="large-400">
            <s-grid
              justifyItems="center"
              maxBlockSize="450px"
              maxInlineSize="450px"
            >
              <s-heading>Start creating discount functions</s-heading>
              <s-paragraph>
                No functions found. Deploy your app to see available discount
                functions.
              </s-paragraph>
            </s-grid>
          </s-grid>
        </s-section>
      ) : (
        <>
          <s-section>
            <s-grid gap="base">
              <s-heading>Available Functions</s-heading>
              <s-paragraph>
                Create and manage custom discount functions for your store. Use
                these functions to implement complex discount logic and pricing
                rules.
              </s-paragraph>
            </s-grid>
          </s-section>

          <s-section>
            <s-grid gap="small-200">
              {functions.map((item) => (
                <s-box key={item.id} padding="base" borderRadius="base">
                  <s-grid
                    gridTemplateColumns="1fr auto"
                    alignItems="center"
                    gap="base"
                  >
                    <s-text>{item.title}</s-text>
                    <s-button href={`/app/discount/${item.id}/new`}>
                      Create discount
                    </s-button>
                  </s-grid>
                </s-box>
              ))}
            </s-grid>
          </s-section>
        </>
      )}
    </s-page>
  );
}
