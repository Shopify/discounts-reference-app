import {
  DeliveryDiscountSelectionStrategy,
  DeliveryMethod,
  DiscountClass,
} from "../generated/api";

// [START discount-function.run.delivery]
export function cartDeliveryOptionsDiscountsGenerateRun(input) {
  const hasShippingDiscountClass = input.discount.discountClasses.includes(
    DiscountClass.Shipping,
  );

  if (!hasShippingDiscountClass) {
    return {operations: []};
  }

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

  if (targets.length === 0) {
    return {operations: []};
  }

  return {
    operations: [
      {
        deliveryDiscountsAdd: {
          candidates: [
            {
              message: "FREE DELIVERY",
              targets,
              value: {
                percentage: {
                  value: 100,
                },
              },
            },
          ],
          selectionStrategy: DeliveryDiscountSelectionStrategy.All,
        },
      },
    ],
  };
}
// [END discount-function.run.delivery]
