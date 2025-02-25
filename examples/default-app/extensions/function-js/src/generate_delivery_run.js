// @ts-check
import { DeliveryDiscountSelectionStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").DeliveryInput} RunInput
 * @typedef {import("../generated/api").FunctionDeliveryRunResult} FunctionDeliveryRunResult
 */

// [START discount-function.run.delivery]
/**
 * @param {RunInput} input
 * @returns {FunctionDeliveryRunResult}
 */
export function generateDeliveryRun(input) {
  return {
    operations: [
      {
        addDeliveryDiscounts: {
          candidates: input.cart.deliveryGroups.map((group) => ({
            message: "30% OFF SHIPPING",
            targets: [
              {
                deliveryGroup: {
                  id: group.id,
                },
              },
            ],
            value: {
              percentage: {
                value: 10,
              },
            },
          })),
          selectionStrategy: DeliveryDiscountSelectionStrategy.All,
        },
      },
    ],
  };
}
// [END discount-function.run.delivery]
