import { Card, Checkbox, Text, BlockStack, Box } from "@shopify/polaris";
import React, { useState, useCallback } from "react";

const DiscountClass = {
  Product: "PRODUCT",
  Order: "ORDER",
  Shipping: "SHIPPING",
};

const DISCOUNT_CLASS_LABELS = {
  [DiscountClass.Product]: "Product",
  [DiscountClass.Order]: "Order",
  [DiscountClass.Shipping]: "Shipping",
};

/**
 * DiscountClasses component displays a set of checkboxes for selecting discount classes.
 * It allows users to select one or more discount classes (Product, Order, or Shipping).
 * At least one discount class must be selected at all times - the component prevents
 * unchecking the last selected option.
 *
 * @param {Object} props - Component props
 * @param {Array} props.discountClasses - Initial selected discount classes
 * @param {Function} props.onChange - Optional callback triggered when selection changes
 * @returns A Polaris Card containing discount class selection checkboxes
 */
function DiscountClasses(props) {
  const { discountClasses = [DiscountClass.Product], onChange } = props;

  const [selectedClasses, setSelectedClasses] = useState(
    discountClasses.length > 0 ? discountClasses : [DiscountClass.Product],
  );

  const handleChange = useCallback(
    (checked, discountClass) => {
      const updatedClasses = checked
        ? [...selectedClasses, discountClass]
        : selectedClasses.filter((cls) => cls !== discountClass);

      if (updatedClasses.length === 0) {
        return;
      }

      setSelectedClasses(updatedClasses);
      // Add the updated classes to the automaticAppDiscountCreate or codeAppDiscountCreate mutations
      if (onChange) {
        onChange(updatedClasses);
      }
    },
    [selectedClasses, onChange],
  );

  return (
    <Card>
      <Text as="h2" variant="headingMd">
        Discount Classes
      </Text>
      <Text as="p" variant="bodyMd">
        Select which discount classes this discount can be applied to. At least
        one must be selected.
      </Text>

      <Box paddingBlockStart="400">
        <BlockStack gap="200">
          {Object.values(DiscountClass).map((discountClass) => {
            const isChecked = selectedClasses.includes(discountClass);
            const isDisabled = isChecked && selectedClasses.length === 1;
            return (
              <Checkbox
                key={discountClass}
                label={DISCOUNT_CLASS_LABELS[discountClass]}
                checked={isChecked}
                disabled={isDisabled}
                onChange={(checked) => handleChange(checked, discountClass)}
              />
            );
          })}
        </BlockStack>
      </Box>
    </Card>
  );
}

export default DiscountClasses;
