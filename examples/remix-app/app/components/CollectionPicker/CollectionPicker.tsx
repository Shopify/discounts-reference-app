import {
  Button,
  BlockStack,
  InlineStack,
  Link,
  Divider,
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import { useCallback } from "react";
interface Collection {
  id: string;
  title: string;
}

interface ResourcePickerResponse {
  id: string;
  title: string;
}

interface CollectionPickerProps {
  onSelect: (selectedCollections: { id: string; title: string }[]) => void;
  selectedCollectionIds: string[];
  collections: Collection[];
  buttonText?: string;
}

export function CollectionPicker({
  onSelect,
  selectedCollectionIds = [],
  collections = [],
  buttonText = "Select collections",
}: CollectionPickerProps) {
  const handleSelect = useCallback(async () => {
    const selected = await window.shopify.resourcePicker({
      type: "collection",
      action: "select",
      multiple: true,
      selectionIds: selectedCollectionIds.map((id) => ({
        id: id,
        type: "collection",
      })),
    });

    if (selected) {
      const selectedCollections = selected.map(
        (collection: ResourcePickerResponse) => ({
          id: collection.id,
          title: collection.title,
        }),
      );
      onSelect(selectedCollections);
    }
  }, [selectedCollectionIds, onSelect]);

  const handleRemove = useCallback(
    (collectionId: string) => {
      onSelect(
        collections.filter((collection) => collection.id !== collectionId),
      );
    },
    [onSelect, collections],
  );

  const selectedCollectionsText = collections?.length
    ? `(${collections.length} selected)`
    : "";

  return (
    <BlockStack gap="400">
      <Button onClick={handleSelect}>
        {buttonText}
        {selectedCollectionsText}
      </Button>
      {collections?.length > 0 ? (
        <BlockStack gap="200">
          {collections.map((collection) => (
            <BlockStack gap="200" key={collection.id}>
              <InlineStack blockAlign="center" align="space-between">
                <Link
                  url={`shopify://admin/collections/${collection.id.split("/").pop()}`}
                  monochrome
                  removeUnderline
                >
                  {collection.title}
                </Link>
                <Button
                  variant="tertiary"
                  onClick={() => handleRemove(collection.id)}
                  icon={DeleteIcon}
                />
              </InlineStack>
              <Divider />
            </BlockStack>
          ))}
        </BlockStack>
      ) : null}
    </BlockStack>
  );
}
