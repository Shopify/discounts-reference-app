// [START discount-ui-extension.ui-extension]
// [START discount-ui-extension.ui-components]
import {
  reactExtension,
  useApi,
  BlockStack,
  FunctionSettings,
  Section,
  Text,
  Form,
  NumberField,
  Box,
  InlineStack,
  Heading,
} from "@shopify/ui-extensions-react/admin";
// [END discount-ui-extension.ui-components]
import { useState, useEffect, useMemo } from "react";
// [START discount-ui-extension.target]
const TARGET = "admin.discount-details.function-settings.render";
export default reactExtension(TARGET, async (api) => {
  const existingDefinition = await getMetafieldDefinition(api.query);
  if (!existingDefinition) {
    // Create a metafield definition for persistence if no pre-existing definition exists
    const metafieldDefinition = await createMetafieldDefinition(api.query);
    if (!metafieldDefinition) {
      throw new Error("Failed to create metafield definition");
    }
  }
  return <App />;
});
function PercentageField({ label, defaultValue, value, onChange, name }) {
  return (
    <Box>
      <BlockStack gap="base">
        <NumberField
          label={label}
          name={name}
          value={Number(value)}
          defaultValue={String(defaultValue)}
          onChange={(value) => onChange(String(value))}
          suffix="%"
        />
      </BlockStack>
    </Box>
  );
}
// [START discount-ui-extension.app-component]
function App() {
  const {
    loading,
    applyExtensionMetafieldChange,
    i18n,
    initialPercentages,
    onPercentageValueChange,
    percentages,
    resetForm,
  } = useExtensionData();
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FunctionSettings onSave={applyExtensionMetafieldChange}>
          <Heading size={6}>{i18n.translate("title")}</Heading>
          <Form onReset={resetForm} onSubmit={applyExtensionMetafieldChange}>
            <Section>
              <BlockStack gap="base">
                <InlineStack blockAlignment="center">
                  <Box maxInlineSize="66%">
                    <Text>
                      {i18n.translate("percentage.descriptionProduct")}
                    </Text>
                  </Box>
                  <PercentageField
                    value={String(percentages.product)}
                    defaultValue={String(initialPercentages.product)}
                    onChange={(value) =>
                      onPercentageValueChange("product", value)
                    }
                    label={i18n.translate("percentage.Product")}
                    name="product"
                  />
                </InlineStack>
                <InlineStack blockAlignment="center">
                  <Box maxInlineSize="66%">
                    <Text>{i18n.translate("percentage.descriptionOrder")}</Text>
                  </Box>
                  <PercentageField
                    value={String(percentages.order)}
                    defaultValue={String(initialPercentages.order)}
                    onChange={(value) =>
                      onPercentageValueChange("order", value)
                    }
                    label={i18n.translate("percentage.Order")}
                    name="order"
                  />
                </InlineStack>
                <InlineStack blockAlignment="center">
                  <Box maxInlineSize="75%">
                    <Text>
                      {i18n.translate("percentage.descriptionShipping")}
                    </Text>
                  </Box>
                  <PercentageField
                    value={String(percentages.shipping)}
                    defaultValue={String(initialPercentages.shipping)}
                    onChange={(value) =>
                      onPercentageValueChange("shipping", value)
                    }
                    label={i18n.translate("percentage.Shipping")}
                    name="shipping"
                  />
                </InlineStack>
              </BlockStack>
            </Section>
          </Form>
        </FunctionSettings>
      )}
    </>
  );
}
// [END discount-ui-extension.app-component]
// [START discount-ui-extension.use-extension-data]
function useExtensionData() {
  const { applyMetafieldChange, i18n, data } = useApi(TARGET);
  const initialMetafields = useMemo(
    () => data?.metafields || [],
    [data?.metafields],
  );
  const [loading, setLoading] = useState(false);
  const [percentages, setPercentages] = useState({
    product: 0,
    order: 0,
    shipping: 0,
  });
  const [savedMetafields] = useState(initialMetafields);
  const [initialPercentages, setInitialPercentages] = useState({
    product: 0,
    order: 0,
    shipping: 0,
  });
  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      const config = parsePercentageMetafield(
        savedMetafields.find(
          (metafield) => metafield.key === "function-configuration",
        )?.value,
      );
      setInitialPercentages(config);
      setPercentages(config);
      setLoading(false);
    }
    fetchInitialData();
  }, [initialMetafields, savedMetafields]);
  const onPercentageValueChange = async (type, value) => {
    setPercentages((prev) => ({
      ...prev,
      [type]: Number(value),
    }));
  };
  // [START discount-ui-extension.apply-extension-metafield-change]
  async function applyExtensionMetafieldChange() {
    await applyMetafieldChange({
      type: "updateMetafield",
      namespace: "$app:example-discounts--ui-extension",
      key: "function-configuration",
      value: JSON.stringify(percentages),
      valueType: "json",
    });
  }
  // [END discount-ui-extension.apply-extension-metafield-change]
  const resetForm = () => {
    setPercentages(initialPercentages);
  };
  return {
    loading,
    applyExtensionMetafieldChange,
    i18n,
    initialPercentages,
    onPercentageValueChange,
    percentages,
    resetForm,
  };
}
// [END discount-ui-extension.use-extension-data]
// [START discount-ui-extension.metafields]
const METAFIELD_NAMESPACE = "$app:example-discounts--ui-extension";
const METAFIELD_KEY = "function-configuration";
async function getMetafieldDefinition(adminApiQuery) {
  const query = `#graphql
    query GetMetafieldDefinition {
      metafieldDefinitions(first: 1, ownerType: DISCOUNT, namespace: "${METAFIELD_NAMESPACE}", key: "${METAFIELD_KEY}") {
        nodes {
          id
        }
      }
    }
  `;
  const result = await adminApiQuery(query);
  return result?.data?.metafieldDefinitions?.nodes[0];
}
async function createMetafieldDefinition(adminApiQuery) {
  const definition = {
    access: {
      admin: "MERCHANT_READ_WRITE",
    },
    key: METAFIELD_KEY,
    name: "Discount Configuration",
    namespace: METAFIELD_NAMESPACE,
    ownerType: "DISCOUNT",
    type: "json",
  };
  const query = `#graphql
    mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
      metafieldDefinitionCreate(definition: $definition) {
        createdDefinition {
            id
          }
        }
      }
  `;
  const variables = { definition };
  const result = await adminApiQuery(query, { variables });
  return result?.data?.metafieldDefinitionCreate?.createdDefinition;
}
// [END discount-ui-extension.metafields]
function parsePercentageMetafield(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return {
      product: Number(parsed.product ?? 0),
      order: Number(parsed.order ?? 0),
      shipping: Number(parsed.shipping ?? 0),
    };
  } catch {
    return { product: 0, order: 0, shipping: 0 };
  }
}
// [END discount-ui-extension.ui-extension]
