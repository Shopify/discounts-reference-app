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
  TextField,
  Button,
  Icon,
  Link,
  Divider,
  Select,
} from "@shopify/ui-extensions-react/admin";
// [END discount-ui-extension.ui-components]
import { useState, useMemo, useEffect } from "react";
// [START discount-ui-extension.target]
const TARGET = "admin.discount-details.function-settings.render";
// [END discount-ui-extension.target]
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
// [START discount-ui-extension.collections-section]
function AppliesToCollections({
  onClickAdd,
  onClickRemove,
  value,
  defaultValue,
  i18n,
  appliesTo,
  onAppliesToChange,
}) {
  return (
    <Section>
      {/* [START discount-ui-extension.hidden-box] */}
      <Box display="none">
        <TextField
          value={value.map(({ id }) => id).join(",")}
          label=""
          name="collectionsIds"
          defaultValue={defaultValue.map(({ id }) => id).join(",")}
        />
      </Box>
      {/* [END discount-ui-extension.hidden-box] */}
      <BlockStack gap="base">
        <InlineStack blockAlignment="end" gap="base">
          <Select
            label={i18n.translate("collections.appliesTo")}
            name="appliesTo"
            value={appliesTo}
            onChange={onAppliesToChange}
            options={[
              {
                label: i18n.translate("collections.allProducts"),
                value: "all",
              },
              {
                label: i18n.translate("collections.collections"),
                value: "collections",
              },
            ]}
          />
          {appliesTo === "all" ? null : (
            <Box inlineSize={180}>
              <Button onClick={onClickAdd}>
                {i18n.translate("collections.buttonLabel")}
              </Button>
            </Box>
          )}
        </InlineStack>
        <CollectionsSection collections={value} onClickRemove={onClickRemove} />
      </BlockStack>
    </Section>
  );
}
function CollectionsSection({ collections, onClickRemove }) {
  if (collections.length === 0) {
    return null;
  }
  return collections.map((collection) => (
    <BlockStack gap="base" key={collection.id}>
      <InlineStack blockAlignment="center" inlineAlignment="space-between">
        <Link
          href={`shopify://admin/collections/${collection.id.split("/").pop()}`}
          tone="inherit"
          target="_blank"
        >
          {collection.title}
        </Link>
        <Button variant="tertiary" onClick={() => onClickRemove(collection.id)}>
          <Icon name="CircleCancelMajor" />
        </Button>
      </InlineStack>
      <Divider />
    </BlockStack>
  ));
}
// [END discount-ui-extension.collections-section]
// [START discount-ui-extension.app-component]
function App() {
  const {
    applyExtensionMetafieldChange,
    i18n,
    initialPercentages,
    onPercentageValueChange,
    percentages,
    resetForm,
    initialCollections,
    collections,
    appliesTo,
    onAppliesToChange,
    removeCollection,
    onSelectedCollections,
    loading,
  } = useExtensionData();
  if (loading) {
    return <Text>{i18n.translate("loading")}</Text>;
  }
  return (
    <FunctionSettings onSave={applyExtensionMetafieldChange}>
      <Heading size={6}>{i18n.translate("title")}</Heading>
      <Form onReset={resetForm} onSubmit={applyExtensionMetafieldChange}>
        <Section>
          <BlockStack gap="base">
            <BlockStack gap="base">
              <PercentageField
                value={String(percentages.product)}
                defaultValue={String(initialPercentages.product)}
                onChange={(value) => onPercentageValueChange("product", value)}
                label={i18n.translate("percentage.Product")}
                name="product"
              />
              <AppliesToCollections
                onClickAdd={onSelectedCollections}
                onClickRemove={removeCollection}
                value={collections}
                defaultValue={initialCollections}
                i18n={i18n}
                appliesTo={appliesTo}
                onAppliesToChange={onAppliesToChange}
              />
            </BlockStack>
            {collections.length === 0 ? <Divider /> : null}
            <PercentageField
              value={String(percentages.order)}
              defaultValue={String(initialPercentages.order)}
              onChange={(value) => onPercentageValueChange("order", value)}
              label={i18n.translate("percentage.Order")}
              name="order"
            />
            <PercentageField
              value={String(percentages.shipping)}
              defaultValue={String(initialPercentages.shipping)}
              onChange={(value) => onPercentageValueChange("shipping", value)}
              label={i18n.translate("percentage.Shipping")}
              name="shipping"
            />
          </BlockStack>
        </Section>
      </Form>
    </FunctionSettings>
  );
}
// [END discount-ui-extension.app-component]
// [START discount-ui-extension.use-extension-data]
function useExtensionData() {
  const { applyMetafieldChange, i18n, data, resourcePicker, query } =
    useApi(TARGET);
  const metafieldConfig = useMemo(
    () =>
      parseMetafield(
        data?.metafields.find(
          (metafield) => metafield.key === "function-configuration",
        )?.value,
      ),
    [data?.metafields],
  );
  const [percentages, setPercentages] = useState(metafieldConfig.percentages);
  const [initialCollections, setInitialCollections] = useState([]);
  const [collections, setCollections] = useState([]);
  const [appliesTo, setAppliesTo] = useState("all");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      const selectedCollections = await getCollections(
        metafieldConfig.collectionIds,
        query,
      );
      setInitialCollections(selectedCollections);
      setCollections(selectedCollections);
      setLoading(false);
      setAppliesTo(selectedCollections.length > 0 ? "collections" : "all");
    };
    fetchCollections();
  }, [metafieldConfig.collectionIds, query]);
  const onPercentageValueChange = async (type, value) => {
    setPercentages((prev) => ({
      ...prev,
      [type]: Number(value),
    }));
  };
  const onAppliesToChange = (value) => {
    setAppliesTo(value);
    if (value === "all") {
      setCollections([]);
    }
  };
  // [START discount-ui-extension.apply-extension-metafield-change]
  async function applyExtensionMetafieldChange() {
    await applyMetafieldChange({
      type: "updateMetafield",
      namespace: "$app:example-discounts--ui-extension",
      key: "function-configuration",
      value: JSON.stringify({
        cartLinePercentage: percentages.product,
        orderPercentage: percentages.order,
        deliveryPercentage: percentages.shipping,
        collectionIds: collections.map(({ id }) => id),
      }),
      valueType: "json",
    });
    setInitialCollections(collections);
  }
  // [END discount-ui-extension.apply-extension-metafield-change]
  const resetForm = () => {
    setPercentages(metafieldConfig.percentages);
    setCollections(initialCollections);
    setAppliesTo(initialCollections.length > 0 ? "collections" : "all");
  };
  const onSelectedCollections = async () => {
    const selection = await resourcePicker({
      type: "collection",
      selectionIds: collections.map(({ id }) => ({ id })),
      action: "select",
      filter: {
        archived: true,
        variants: true,
      },
    });
    setCollections(selection ?? []);
  };
  const removeCollection = (id) => {
    setCollections((prev) => prev.filter((collection) => collection.id !== id));
  };
  return {
    applyExtensionMetafieldChange,
    i18n,
    initialPercentages: metafieldConfig.percentages,
    onPercentageValueChange,
    percentages,
    resetForm,
    collections,
    initialCollections,
    removeCollection,
    onSelectedCollections,
    loading,
    appliesTo,
    onAppliesToChange,
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
function parseMetafield(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return {
      percentages: {
        product: Number(parsed.cartLinePercentage ?? 0),
        order: Number(parsed.orderPercentage ?? 0),
        shipping: Number(parsed.deliveryPercentage ?? 0),
      },
      collectionIds: parsed.collectionIds ?? [],
    };
  } catch {
    return {
      percentages: { product: 0, order: 0, shipping: 0 },
      collectionIds: [],
    };
  }
}
async function getCollections(collectionGids, adminApiQuery) {
  const query = `#graphql
    query GetCollections($ids: [ID!]!) {
      collections: nodes(ids: $ids) {
        ... on Collection {
          id
          title
        }
      }
    }
  `;
  const result = await adminApiQuery(query, {
    variables: { ids: collectionGids },
  });
  return result?.data?.collections ?? [];
}
// [END discount-ui-extension.ui-extension]
