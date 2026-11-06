import {
  DeliveryDiscountSelectionStrategy,
  DeliveryMethod,
  DiscountClass,
} from "../generated/api";

// [START discount-function.run.delivery]
export function cartDeliveryOptionsDiscountsGenerateRun(input) {
  const {deliveryPercentage} = parseMetafield(input.discount.metafield);
  const hasShippingDiscountClass = input.discount.discountClasses.includes(
    DiscountClass.Shipping,
  );
  if (!hasShippingDiscountClass) {
    return {operations: []};
  }

  const operations = [];
  // [START discount-function.run.delivery.add-operations]
  // Discount only the groups with shipping options.
  const targets = input.cart.deliveryGroups
    // If you also want to apply a discount for other delivery methods (e.g. LOCAL), ensure to account for that here.
    .filter(({deliveryOptions}) =>
      deliveryOptions.some(
        ({deliveryMethodType}) =>
          deliveryMethodType === DeliveryMethod.Shipping,
      ),
    )
    .map(({id}) => ({deliveryGroup: {id}}));

  if (
    hasShippingDiscountClass &&
    deliveryPercentage > 0 &&
    targets.length > 0
  ) {
    operations.push({
      deliveryDiscountsAdd: {
        candidates: [
          {
            message: `${deliveryPercentage}% OFF DELIVERY`,
            targets,
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
  return {operations};
}

// [START discount-function.run.delivery.parse-metafield]
function parseMetafield(metafield) {
  try {
    const value = JSON.parse(metafield.value);
    return {deliveryPercentage: value.deliveryPercentage || 0};
  } catch (error) {
    console.error("Error parsing metafield", error);
    return {deliveryPercentage: 0};
  }
}
// [END discount-function.run.delivery.parse-metafield]
// [END discount-function.run.delivery]
