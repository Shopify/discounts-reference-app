import { DeliveryDiscountSelectionStrategy } from "../generated/api";

// [START discount-function.run.delivery]
export function generateDeliveryRun(input) {
  const firstDeliveryGroup = input.cart.deliveryGroups[0];
  if (!firstDeliveryGroup) {
    throw new Error("No delivery groups found");
  }

  const { deliveryPercentage } = parseMetafield(input.discount.metafield);

  const operations = [];
  // [START discount-function.run.delivery.add-operations]
  if (deliveryPercentage > 0) {
    operations.push({
      deliveryDiscountsAdd: {
        candidates: [
          {
            message: `${deliveryPercentage}% OFF DELIVERY`,
            targets: [
              {
                deliveryGroup: {
                  id: firstDeliveryGroup.id,
                },
              },
            ],
            value: {
              percentage: {
                value: deliveryPercentage,
              },
            },
          },
        ],
        selectionStrategy: DeliveryDiscountSelectionStrategy.All,
      },
    });
  }
  // [END discount-function.run.delivery.add-operations]
  return { operations };
}

// [START discount-function.run.delivery.parse-metafield]
function parseMetafield(metafield) {
  try {
    const value = JSON.parse(metafield.value);
    return { deliveryPercentage: value.deliveryPercentage || 0 };
  } catch (error) {
    console.error("Error parsing metafield", error);
    return { deliveryPercentage: 0 };
  }
}
// [END discount-function.run.delivery.parse-metafield]
// [END discount-function.run.delivery]
