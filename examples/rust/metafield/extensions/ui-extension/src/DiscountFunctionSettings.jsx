// [START discount-ui-extension.ui-extension]
// [START discount-ui-extension.ui-components]
import "@shopify/ui-extensions/preact";
import { render } from "preact";
import { useState, useEffect, useMemo, useReducer } from "preact/hooks";
// [END discount-ui-extension.ui-components]

// [START discount-ui-extension.target]
export default async () => {
  render(<App />, document.body);
};
// [END discount-ui-extension.target]

function PercentageField({ label, defaultValue, value, onChange, name }) {
  return (
    <s-box>
      <s-stack gap="base">
        <s-number-field
          label={label}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={(event) => onChange(event.currentTarget.value)}
          suffix="%"
        />
      </s-stack>
    </s-box>
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
    <s-section>
      {/* [START discount-ui-extension.hidden-box] */}
      <s-box display="none">
        <s-text-field
          value={value.map(({ id }) => id).join(",")}
          label=""
          name="collectionsIds"
          defaultValue={defaultValue.map(({ id }) => id).join(",")}
        />
      </s-box>
      {/* [END discount-ui-extension.hidden-box] */}
      <s-stack gap="base">
        <s-stack direction="inline" alignItems="end" gap="base">
          <s-select
            label={i18n.translate("collections.appliesTo")}
            name="appliesTo"
            value={appliesTo}
            onChange={(event) => onAppliesToChange(event.currentTarget.value)}
          >
            <s-option value="all">
              {i18n.translate("collections.allProducts")}
            </s-option>
            <s-option value="collections">
              {i18n.translate("collections.collections")}
            </s-option>
          </s-select>

          {appliesTo === "all" ? null : (
            <s-box inlineSize="180px">
              <s-button onClick={onClickAdd}>
                {i18n.translate("collections.buttonLabel")}
              </s-button>
            </s-box>
          )}
        </s-stack>
        <CollectionsSection collections={value} onClickRemove={onClickRemove} />
      </s-stack>
    </s-section>
  );
}
// [END discount-ui-extension.collections-section]

function CollectionsSection({ collections, onClickRemove }) {
  if (collections.length === 0) {
    return null;
  }

  return collections.map((collection) => (
    <s-stack gap="base" key={collection.id}>
      <s-stack
        direction="inline"
        alignItems="center"
        justifyContent="space-between"
      >
        <s-link
          href={`shopify://admin/collections/${collection.id.split("/").pop()}`}
          target="_blank"
        >
          {collection.title}
        </s-link>
        <s-button
          variant="tertiary"
          onClick={() => onClickRemove(collection.id)}
        >
          <s-icon type="x-circle" />
        </s-button>
      </s-stack>
      <s-divider />
    </s-stack>
  ));
}

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

  // [START discount-ui-extension.app-component-with-subscribable]
  const {discount} = shopify;

  const {
    classes,
    loading: classesLoading,
    updateClasses,
  } = useDiscountClasses(discount);

  const handleToggleDiscountClass = (className) => {
    const nextClasses = classes.includes(className)
      ? classes.filter(c => c !== className)
      : [...classes, className];

    updateClasses(nextClasses);
  };
  // [END discount-ui-extension.app-component-with-subscribable]

  if (loading || classesLoading) {
    return <s-text>{i18n.translate("loading")}</s-text>;
  }

  return (
    <s-function-settings
      onSubmit={(event) => {
        event.waitUntil?.(applyExtensionMetafieldChange());
      }}
      onReset={resetForm}
    >
      <s-heading>{i18n.translate("title")}</s-heading>
      <s-section>
        <s-stack gap="base">
          <s-stack gap="base">
            <s-checkbox
              checked={classes.includes("product")}
              onChange={() => handleToggleDiscountClass("product")}
              label={i18n.translate("discountClasses.product")}
            />

            <PercentageField
              value={String(percentages.product)}
              defaultValue={String(initialPercentages.product)}
              onChange={(value) => onPercentageValueChange("product", value)}
              label={i18n.translate("percentage.Product")}
              name="product"
              disabled={!classes.includes("product")}
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
          </s-stack>
          {collections.length === 0 ? <s-divider /> : null}
          <s-checkbox
            checked={classes.includes("order")}
            onChange={() => handleToggleDiscountClass("order")}
            label={i18n.translate("discountClasses.order")}
          />

          <PercentageField
            value={String(percentages.order)}
            defaultValue={String(initialPercentages.order)}
            onChange={(value) => onPercentageValueChange("order", value)}
            label={i18n.translate("percentage.Order")}
            name="order"
            disabled={!classes.includes("order")}
          />

          <s-divider />

          <s-checkbox
            checked={classes.includes("shipping")}
            onChange={() => handleToggleDiscountClass("shipping")}
            label={i18n.translate("discountClasses.shipping")}
          />

          <PercentageField
            value={String(percentages.shipping)}
            defaultValue={String(initialPercentages.shipping)}
            onChange={(value) => onPercentageValueChange("shipping", value)}
            label={i18n.translate("percentage.Shipping")}
            name="shipping"
            disabled={!classes.includes("shipping")}
          />
        </s-stack>
      </s-section>
    </s-function-settings>
  );
}
// [END discount-ui-extension.app-component]

// [START discount-ui-extension.use-extension-data]
function useExtensionData() {
  const { applyMetafieldChange, i18n, data, resourcePicker, query } = shopify;

  const metafieldConfig = useMemo(
    () =>
      parseMetafield(
        data?.metafields?.find(
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
      namespace: "$app",
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

// [START discount-ui-extension.use-discount-classes]
export function useDiscountClasses(api) {
  const {value: classes, loading} = useSubscribable(
    api?.discountClasses,
  );
  const [error, setError] = useState(null);

  const updateClasses = async (newClasses) => {
    if (!api?.discountClasses) {
      return false;
    }

    try {
      const result = await api.updateDiscountClasses(newClasses);

      if (!result.success) {
        setError(extractValidationErrors(result));
        return false;
      }

      setError(null);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : ERROR_MESSAGES.UPDATE_FAILED;
      setError(errorMessage);
      return false;
    }
  };

  return {classes: classes ?? [], loading, error, updateClasses};
}

export function useSubscribable(subscribable) {
  const [loading, setLoading] = useState(true);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    if (!subscribable) {
      setLoading(false);
      return;
    }

    setLoading(false);

    let cancelled = false;

    const unsubscribe = subscribable.subscribe(() => {
      if (!cancelled) {
        forceUpdate();
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [subscribable]);

  // Always read directly from the subscribable - no local copy
  return {
    value: subscribable?.value,
    loading,
  };
}
// [END discount-ui-extension.use-discount-classes]

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
