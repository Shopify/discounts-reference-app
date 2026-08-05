import {returnToDiscounts} from "app/utils/navigation";
import {useCallback, useMemo, useState} from "react";
import {Form} from "react-router";

import {useDiscountForm} from "../../hooks/useDiscountForm";
import {DiscountClass} from "../../types/admin.types.d";
import {DiscountMethod} from "../../types/types";
import {CollectionPicker} from "../CollectionPicker/CollectionPicker";
import {DatePickerField} from "../DatePickerField/DatePickerField";

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
  collections: {id: string; title: string}[];
  isEditing?: boolean;
  submitErrors?: SubmitError[];
  isLoading?: boolean;
  success?: boolean;
}

const methodOptions = [
  {label: "Discount code", value: DiscountMethod.Code},
  {label: "Automatic discount", value: DiscountMethod.Automatic},
];

export function DiscountForm({
  initialData,
  collections: initialCollections,
  isEditing = false,
  submitErrors = [],
  success = false,
}: DiscountFormProps) {
  const {formState, setField, setConfigField, setCombinesWith, submit} =
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

  const errorBanner = useMemo(
    () =>
      submitErrors.length > 0 ? (
        <s-banner tone="critical">
          <p>There were some issues with your form submission:</p>
          <ul>
            {submitErrors.map(({message, field}, index) => (
              <li key={index}>
                {field.join(".")} {message}
              </li>
            ))}
          </ul>
        </s-banner>
      ) : null,
    [submitErrors],
  );

  const successBanner = useMemo(
    () =>
      success ? (
        <s-banner tone="success">
          <p>Discount saved successfully</p>
        </s-banner>
      ) : null,
    [success],
  );

  const handleCollectionSelect = useCallback(
    async (selectedCollections: {id: string; title: string}[]) => {
      setConfigField(
        "collectionIds",
        selectedCollections.map(collection => collection.id),
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
              discountClass => discountClass !== discountClassValue,
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

  const handleDateChange = useCallback(
    (date: Date | [Date, Date]) => {
      if (Array.isArray(date)) {
        // Range mode
        setField("startDate", date[0]);
        setField("endDate", date[1]);
      } else {
        // Single mode
        setField("startDate", date);
        if (formState.endDate) {
          setField("endDate", null);
        }
      }
    },
    [setField, formState.endDate],
  );

  const getDatePickerValue = useCallback(():
    | Date
    | string
    | null
    | [Date | string | null, Date | string | null] => {
    if (formState.endDate) {
      return [formState.startDate, formState.endDate];
    }
    return formState.startDate;
  }, [formState.startDate, formState.endDate]);

  const handleReset = useCallback(() => {
    returnToDiscounts();
  }, []);

  return (
    <Form
      method="post"
      id="discount-form"
      data-save-bar
      onSubmit={submit}
      onReset={handleReset}
    >
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
              ? {metafieldId: formState.configuration.metafieldId}
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
      <s-stack gap="base">
        {errorBanner}
        {successBanner}

        <s-stack gap="base">
          {/* Method section */}
          <s-section heading={isEditing ? "Edit discount" : "Create discount"}>
            <s-select
              label="Discount type"
              value={formState.method}
              onChange={(e: any) =>
                setField("method", e.target.value as DiscountMethod)
              }
              disabled={isEditing}
            >
              {methodOptions.map(option => (
                <s-option key={option.value} value={option.value}>
                  {option.label}
                </s-option>
              ))}
            </s-select>

            {formState.method === DiscountMethod.Automatic ? (
              <s-text-field
                label="Discount title"
                autocomplete="off"
                value={formState.title}
                onChange={(e: any) => setField("title", e.target.value)}
              />
            ) : (
              <s-text-field
                label="Discount code"
                autocomplete="off"
                value={formState.code}
                onChange={(e: any) => setField("code", e.target.value)}
              />
            )}
          </s-section>

          {/* Discount classes section */}

          {/* [START build-the-ui.add-discount-classes] */}
          <s-section heading="Discount Classes">
            <s-text>Select which types of discounts to apply</s-text>

            <s-stack gap="base">
              <s-checkbox
                label="Product discount"
                checked={formState.discountClasses.includes(
                  DiscountClass.Product,
                )}
                onChange={(e: any) =>
                  handleDiscountClassChange(
                    DiscountClass.Product,
                    e.target.checked,
                  )
                }
              />
              <s-checkbox
                label="Order discount"
                checked={formState.discountClasses.includes(
                  DiscountClass.Order,
                )}
                onChange={(e: any) =>
                  handleDiscountClassChange(
                    DiscountClass.Order,
                    e.target.checked,
                  )
                }
              />
              <s-checkbox
                label="Shipping discount"
                checked={formState.discountClasses.includes(
                  DiscountClass.Shipping,
                )}
                onChange={(e: any) =>
                  handleDiscountClassChange(
                    DiscountClass.Shipping,
                    e.target.checked,
                  )
                }
              />
            </s-stack>
          </s-section>
          {/* [END build-the-ui.add-discount-classes] */}

          {/* [START build-the-ui.add-discount-configuration] */}
          <s-section heading="Discount Configuration">
            <s-stack gap="base">
              {formState.discountClasses?.includes(DiscountClass.Product) ? (
                <>
                  <s-number-field
                    label="Product discount percentage"
                    autocomplete="on"
                    min={0}
                    max={100}
                    suffix="%"
                    value={formState.configuration.cartLinePercentage}
                    onChange={(e: any) =>
                      setConfigField("cartLinePercentage", e.target.value)
                    }
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

              {formState.discountClasses?.includes(DiscountClass.Order) ? (
                <s-number-field
                  label="Order discount percentage"
                  autocomplete="on"
                  min={0}
                  max={100}
                  suffix="%"
                  value={formState.configuration.orderPercentage}
                  onChange={(e: any) =>
                    setConfigField("orderPercentage", e.target.value)
                  }
                />
              ) : null}

              {formState.discountClasses?.includes(DiscountClass.Shipping) ? (
                <s-number-field
                  label="Shipping discount percentage"
                  autocomplete="on"
                  min={0}
                  max={100}
                  suffix="%"
                  value={formState.configuration.deliveryPercentage}
                  onChange={(e: any) =>
                    setConfigField("deliveryPercentage", e.target.value)
                  }
                />
              ) : null}
            </s-stack>
          </s-section>
          {/* [END build-the-ui.add-discount-configuration] */}

          {/* Usage limits section */}
          {formState.method === DiscountMethod.Code ? (
            <s-section heading="Usage limits">
              <s-number-field
                label="Usage limit"
                autocomplete="on"
                min={0}
                placeholder="No limit"
                value={formState.usageLimit}
                onChange={(e: any) => setField("usageLimit", e.target.value)}
              />
              <s-checkbox
                label="Limit to one use per customer"
                checked={formState.appliesOncePerCustomer}
                onChange={(e: any) =>
                  setField("appliesOncePerCustomer", e.target.checked)
                }
              />
            </s-section>
          ) : null}

          {/* Combination section */}
          <s-section heading="Combination">
            <s-text>
              Select which discounts can be combined with this discount
            </s-text>

            <s-checkbox
              label="Order discounts"
              checked={formState.combinesWith.orderDiscounts}
              onChange={(e: any) =>
                setCombinesWith("orderDiscounts", e.target.checked)
              }
            />

            <s-checkbox
              label="Product discounts"
              checked={formState.combinesWith.productDiscounts}
              onChange={(e: any) =>
                setCombinesWith("productDiscounts", e.target.checked)
              }
            />

            <s-checkbox
              label="Shipping discounts"
              checked={formState.combinesWith.shippingDiscounts}
              onChange={(e: any) =>
                setCombinesWith("shippingDiscounts", e.target.checked)
              }
            />
          </s-section>

          {/* Active dates section */}
          <s-section heading="Active dates">
            <s-stack gap="base">
              <DatePickerField
                label={formState.endDate ? "Date range" : "Start date"}
                type={formState.endDate ? "range" : "single"}
                value={getDatePickerValue()}
                onChange={handleDateChange}
                minDate={today}
              />

              <s-checkbox
                label="Set end date"
                checked={!!formState.endDate}
                onChange={(e: any) =>
                  handleEndDateCheckboxChange(e.target.checked)
                }
              />
            </s-stack>
          </s-section>
        </s-stack>
      </s-stack>
    </Form>
  );
}
