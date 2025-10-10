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
    ? ` (${collections.length} selected)`
    : "";

  return (
    <s-stack direction="block" gap="base">
      <s-button type="button" onClick={handleSelect}>
        {buttonText}
        {selectedCollectionsText}
      </s-button>
      {collections?.length > 0 ? (
        <s-stack direction="block" gap="small">
          {collections.map((collection) => (
            <s-stack direction="block" gap="small" key={collection.id}>
              <s-stack direction="inline" justifyContent="space-between">
                <s-link
                  href={`shopify://admin/collections/${collection.id.split("/").pop()}`}
                  target="_self"
                >
                  {collection.title}
                </s-link>
                <s-button
                  variant="tertiary"
                  type="button"
                  onClick={() => handleRemove(collection.id)}
                  aria-label={`Remove ${collection.title}`}
                >
                  <svg viewBox="0 0 20 20" width="20" height="20">
                    <path
                      d="M11.5 8.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-1.5 0v-4.25a.75.75 0 0 1 .75-.75Z"
                      fill="currentColor"
                    />
                    <path
                      d="M9.25 9a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 1.5 0v-4.25Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.25 5.25a2.75 2.75 0 0 1 5.5 0h3a.75.75 0 0 1 0 1.5h-.75v5.45c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162v-5.45h-.75a.75.75 0 0 1 0-1.5h3Zm1.5 0a1.25 1.25 0 1 1 2.5 0h-2.5Zm-2.25 1.5h7v5.45c0 .865-.001 1.423-.036 1.848-.033.408-.09.559-.128.633a1.5 1.5 0 0 1-.655.655c-.074.038-.225.095-.633.128-.425.035-.983.036-1.848.036h-.4c-.865 0-1.423-.001-1.848-.036-.408-.033-.559-.09-.633-.128a1.5 1.5 0 0 1-.656-.655c-.037-.074-.094-.225-.127-.633-.035-.425-.036-.983-.036-1.848v-5.45Z"
                      fill="currentColor"
                    />
                  </svg>
                </s-button>
              </s-stack>
              <s-divider />
            </s-stack>
          ))}
        </s-stack>
      ) : null}
    </s-stack>
  );
}
