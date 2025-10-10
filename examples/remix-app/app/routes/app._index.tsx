import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Button,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Box,
} from "@shopify/polaris";

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
    <Page title="Discount Functions">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Welcome to Discount Functions
              </Text>
              <Text as="p" variant="bodyMd">
                Create and manage custom discount functions for your store. Use
                these functions to implement complex discount logic and pricing
                rules.
              </Text>
              <Box paddingBlockStart="400">
                <InlineStack gap="300">
                  <Button onClick={returnToDiscounts}>
                    View all discounts
                  </Button>
                </InlineStack>
              </Box>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          {functions.length > 0 ? (
            <BlockStack gap="400">
              {functions.map((item) => (
                <Card key={item.id}>
                  <InlineStack align="space-between">
                    <Text as="span" variant="bodyMd" fontWeight="bold">
                      {item.title}
                    </Text>
                    <Button
                      variant="primary"
                      url={`/app/discount/${item.id}/new`}
                    >
                      Create discount
                    </Button>
                  </InlineStack>
                </Card>
              ))}
            </BlockStack>
          ) : (
            <Text as="p" variant="bodyMd">
              No functions found, you might need to deploy your app.
            </Text>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
