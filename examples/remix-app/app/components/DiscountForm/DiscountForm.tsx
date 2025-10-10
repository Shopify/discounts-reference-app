import { Form } from "@remix-run/react";
import {
  Banner,
  Card,
  Text,
  Layout,
  PageActions,
  TextField,
  BlockStack,
  Box,
  Checkbox,
  Select,
  InlineStack,
} from "@shopify/polaris";
import { returnToDiscounts } from "app/utils/navigation";
import { useCallback, useMemo, useState } from "react";

import { useDiscountForm } from "../../hooks/useDiscountForm";
import { DiscountClass } from "../../types/admin.types.d";
import { DiscountMethod } from "../../types/types";
import { CollectionPicker } from "../CollectionPicker/CollectionPicker";
import { DatePickerField } from "../DatePickerField/DatePickerField";

interface SubmitError {
  message: string;
  field: string[];
}

interface DiscountFormProps {
  initialData?: {
    title: string;
    method: DiscountMethod;
    code: string;
    combinesWith: {
      orderDiscounts: boolean;
      productDiscounts: boolean;
      shippingDiscounts: boolean;
    };
    discountClasses: DiscountClass[];
    usageLimit: number | null;
    appliesOncePerCustomer: boolean;
    startsAt: string | Date;
    endsAt: string | Date | null;
    configuration: {
      cartLinePercentage: string;
      orderPercentage: string;
      deliveryPercentage: string;
      metafieldId?: string;
      collectionIds?: string[];
    };
  };
  collections: { id: string; title: string }[];
  isEditing?: boolean;
  submitErrors?: SubmitError[];
  isLoading?: boolean;
  success?: boolean;
}

const methodOptions = [
  { label: "Discount code", value: DiscountMethod.Code },
  { label: "Automatic discount", value: DiscountMethod.Automatic },
];

export function DiscountForm({
  initialData,
  collections: initialCollections,
  isEditing = false,
  submitErrors = [],
  isLoading = false,
  success = false,
}: DiscountFormProps) {
  const { formState, setField, setConfigField, setCombinesWith, submit } =
    useDiscountForm({
      initialData,
    });

  const [collections, setCollections] =
    useState<DiscountFormProps["collections"]>(initialCollections);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const validateEndDate = useCallback(
    (endDate: Date) => {
      if (!formState.startDate) return undefined;
      const startDate = new Date(formState.startDate);
      return endDate < startDate
        ? "End date must be after start date"
        : undefined;
    },
    [formState.startDate],
  );

  const handleEndDateChange = useCallback(
    (date: Date) => {
      const error = validateEndDate(date);
      if (!error) {
        setField("endDate", date);
      }
    },
    [validateEndDate, setField],
  );

  const errorBanner = useMemo(
    () =>
      submitErrors.length > 0 ? (
        <Layout.Section>
          <Banner tone="critical">
            <p>There were some issues with your form submission:</p>
            <ul>
              {submitErrors.map(({ message, field }, index) => (
                <li key={index}>
                  {field.join(".")} {message}
                </li>
              ))}
            </ul>
          </Banner>
        </Layout.Section>
      ) : null,
    [submitErrors],
  );

  const successBanner = useMemo(
    () =>
      success ? (
        <Layout.Section>
          <Banner tone="success">
            <p>Discount saved successfully</p>
          </Banner>
        </Layout.Section>
      ) : null,
    [success],
  );

  const handleCollectionSelect = useCallback(
    async (selectedCollections: { id: string; title: string }[]) => {
      setConfigField(
        "collectionIds",
        selectedCollections.map((collection) => collection.id),
      );
      setCollections(selectedCollections);
    },
    [setConfigField],
  );

  const handleDiscountClassChange = useCallback(
    (discountClassValue: DiscountClass, checked: boolean) => {
      setField(
        "discountClasses",
        checked
          ? [...formState.discountClasses, discountClassValue]
          : formState.discountClasses.filter(
              (discountClass) => discountClass !== discountClassValue,
            ),
      );
    },
    [formState.discountClasses, setField],
  );

  const handleEndDateCheckboxChange = useCallback(
    (checked: boolean) => {
      if (!checked) {
        setField("endDate", null);
      } else if (!formState.endDate) {
        const tomorrow = new Date(formState.startDate || today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setField("endDate", tomorrow);
      }
    },
    [formState.startDate, formState.endDate, today, setField],
  );

  return (
    <Layout>
      {errorBanner}
      {successBanner}
      <Layout.Section>
        <Form method="post" id="discount-form">
          <input
            type="hidden"
            name="discount"
            value={JSON.stringify({
              title: formState.title,
              method: formState.method,
              code: formState.code,
              combinesWith: formState.combinesWith,
              discountClasses: formState.discountClasses,
              usageLimit:
                formState.usageLimit === ""
                  ? null
                  : parseInt(formState.usageLimit, 10),
              appliesOncePerCustomer: formState.appliesOncePerCustomer,
              startsAt: formState.startDate,
              endsAt: formState.endDate,
              configuration: {
                ...(formState.configuration.metafieldId
                  ? { metafieldId: formState.configuration.metafieldId }
                  : {}),
                cartLinePercentage: parseFloat(
                  formState.configuration.cartLinePercentage,
                ),
                orderPercentage: parseFloat(
                  formState.configuration.orderPercentage,
                ),
                deliveryPercentage: parseFloat(
                  formState.configuration.deliveryPercentage,
                ),
                collectionIds: formState.configuration.collectionIds || [],
              },
            })}
          />
          <BlockStack gap="400">
            {/* Method section */}
            <Card>
              <Box>
                <BlockStack gap="100">
                  <Text variant="headingMd" as="h2">
                    {isEditing ? "Edit discount" : "Create discount"}
                  </Text>

                  <Select
                    label="Discount type"
                    options={methodOptions}
                    value={formState.method}
                    onChange={(value: DiscountMethod) =>
                      setField("method", value)
                    }
                    disabled={isEditing}
                  />

                  {formState.method === DiscountMethod.Automatic ? (
                    <TextField
                      label="Discount title"
                      autoComplete="off"
                      value={formState.title}
                      onChange={(value) => setField("title", value)}
                    />
                  ) : (
                    <TextField
                      label="Discount code"
                      autoComplete="off"
                      value={formState.code}
                      onChange={(value) => setField("code", value)}
                      helpText="Customers will enter this discount code at checkout."
                    />
                  )}
                </BlockStack>
              </Box>
            </Card>

            {/* Discount classes section */}

            {/* [START build-the-ui.add-discount-classes] */}
            <Card>
              <Box>
                <BlockStack gap="100">
                  <Text variant="headingMd" as="h2">
                    Discount Classes
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Select which types of discounts to apply
                  </Text>

                  <BlockStack gap="200">
                    <Checkbox
                      label="Product discount"
                      checked={formState.discountClasses.includes(
                        DiscountClass.Product,
                      )}
                      onChange={(checked) =>
                        handleDiscountClassChange(
                          DiscountClass.Product,
                          checked,
                        )
                      }
                    />
                    <Checkbox
                      label="Order discount"
                      checked={formState.discountClasses.includes(
                        DiscountClass.Order,
                      )}
                      onChange={(checked) =>
                        handleDiscountClassChange(DiscountClass.Order, checked)
                      }
                    />
                    <Checkbox
                      label="Shipping discount"
                      checked={formState.discountClasses.includes(
                        DiscountClass.Shipping,
                      )}
                      onChange={(checked) =>
                        handleDiscountClassChange(
                          DiscountClass.Shipping,
                          checked,
                        )
                      }
                    />
                  </BlockStack>
                </BlockStack>
              </Box>
            </Card>
            {/* [END build-the-ui.add-discount-classes] */}
            {/* [START build-the-ui.add-discount-configuration] */}
            <Card>
              <Box>
                <BlockStack gap="100">
                  <Text variant="headingMd" as="h2">
                    Discount Configuration
                  </Text>

                  <BlockStack gap="400">
                    {formState.discountClasses?.includes(
                      DiscountClass.Product,
                    ) ? (
                      <>
                        <TextField
                          label="Product discount percentage"
                          autoComplete="on"
                          type="number"
                          min="0"
                          max="100"
                          suffix="%"
                          value={formState.configuration.cartLinePercentage}
                          onChange={(value) =>
                            setConfigField("cartLinePercentage", value)
                          }
                          helpText="Percentage discount for products"
                        />
                        <CollectionPicker
                          onSelect={handleCollectionSelect}
                          selectedCollectionIds={
                            formState.configuration.collectionIds || []
                          }
                          collections={
                            formState.configuration.collections || collections
                          }
                          buttonText="Select collections for discount"
                        />
                      </>
                    ) : null}

                    {formState.discountClasses?.includes(
                      DiscountClass.Order,
                    ) ? (
                      <TextField
                        label="Order discount percentage"
                        autoComplete="on"
                        type="number"
                        min="0"
                        max="100"
                        suffix="%"
                        value={formState.configuration.orderPercentage}
                        onChange={(value) =>
                          setConfigField("orderPercentage", value)
                        }
                        helpText="Percentage discount for orders"
                      />
                    ) : null}

                    {formState.discountClasses?.includes(
                      DiscountClass.Shipping,
                    ) ? (
                      <TextField
                        label="Shipping discount percentage"
                        autoComplete="on"
                        type="number"
                        min="0"
                        max="100"
                        suffix="%"
                        value={formState.configuration.deliveryPercentage}
                        onChange={(value) =>
                          setConfigField("deliveryPercentage", value)
                        }
                        helpText="Percentage discount for shipping"
                      />
                    ) : null}
                  </BlockStack>
                </BlockStack>
              </Box>
            </Card>
            {/* [END build-the-ui.add-discount-configuration] */}
            {/* Usage limits section */}
            {formState.method === DiscountMethod.Code ? (
              <Card>
                <Box>
                  <BlockStack gap="100">
                    <Text variant="headingMd" as="h2">
                      Usage limits
                    </Text>
                    <TextField
                      label="Usage limit"
                      autoComplete="on"
                      type="number"
                      min="0"
                      placeholder="No limit"
                      value={formState.usageLimit}
                      onChange={(value) => setField("usageLimit", value)}
                      helpText="Limit the number of times this discount can be used"
                    />
                    <Checkbox
                      label="Limit to one use per customer"
                      checked={formState.appliesOncePerCustomer}
                      onChange={(checked) =>
                        setField("appliesOncePerCustomer", checked)
                      }
                    />
                  </BlockStack>
                </Box>
              </Card>
            ) : null}

            {/* Combination section */}
            <Card>
              <Box>
                <BlockStack gap="100">
                  <Text variant="headingMd" as="h2">
                    Combination
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Select which discounts can be combined with this discount
                  </Text>

                  <Checkbox
                    label="Order discounts"
                    checked={formState.combinesWith.orderDiscounts}
                    onChange={(checked) =>
                      setCombinesWith("orderDiscounts", checked)
                    }
                  />

                  <Checkbox
                    label="Product discounts"
                    checked={formState.combinesWith.productDiscounts}
                    onChange={(checked) =>
                      setCombinesWith("productDiscounts", checked)
                    }
                  />

                  <Checkbox
                    label="Shipping discounts"
                    checked={formState.combinesWith.shippingDiscounts}
                    onChange={(checked) =>
                      setCombinesWith("shippingDiscounts", checked)
                    }
                  />
                </BlockStack>
              </Box>
            </Card>

            {/* Active dates section */}
            <Card>
              <Box>
                <BlockStack gap="100">
                  <Text variant="headingMd" as="h2">
                    Active dates
                  </Text>

                  <BlockStack gap="400">
                    <InlineStack
                      gap="400"
                      align="start"
                      blockAlign="center"
                      wrap={false}
                    >
                      <Box width="50%">
                        <DatePickerField
                          label="Start date"
                          value={formState.startDate}
                          onChange={(date) => setField("startDate", date)}
                          minDate={today}
                        />
                      </Box>

                      <Box width="50%">
                        {formState.endDate ? (
                          <DatePickerField
                            label="End date"
                            value={formState.endDate}
                            onChange={handleEndDateChange}
                            minDate={
                              formState.startDate
                                ? new Date(formState.startDate)
                                : today
                            }
                            error={validateEndDate(new Date(formState.endDate))}
                          />
                        ) : null}
                      </Box>
                    </InlineStack>

                    <Checkbox
                      label="Set end date"
                      checked={!!formState.endDate}
                      onChange={handleEndDateCheckboxChange}
                    />
                  </BlockStack>
                </BlockStack>
              </Box>
            </Card>
          </BlockStack>
          <Layout.Section>
            <PageActions
              primaryAction={{
                content: "Save discount",
                loading: isLoading,
                onAction: submit,
              }}
              secondaryActions={[
                {
                  content: "Discard",
                  onAction: returnToDiscounts,
                },
              ]}
            />
          </Layout.Section>
        </Form>
      </Layout.Section>
    </Layout>
  );
}
