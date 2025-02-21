// @ts-check
import {
  OrderDiscountSelectionStrategy,
  ProductDiscountSelectionStrategy,
} from '../generated/api';

/**
 * @typedef {import("../generated/api").CartInput} RunInput
 * @typedef {import("../generated/api").FunctionCartRunResult} FunctionCartRunResult
 */

// [START discount-function.run.cart]
/**
 * @param {RunInput} input
 * @returns {FunctionCartRunResult}
 */
export function generateCartRun(input) {
  return {
    operations: [
      {
        addOrderDiscounts: {
          candidates: [
            {
              message: '10% OFF ORDER',
              targets: [
                {
                  orderSubtotal: {
                    excludedCartLineIds: [],
                  },
                },
              ],
              value: {
                percentage: {
                  value: 10,
                },
              },
            },
          ],
          selectionStrategy: OrderDiscountSelectionStrategy.First,
        },
      },
      {
        addProductDiscounts: {
          candidates: input.cart.lines.map(line => ({
            message: '20% OFF PRODUCT',
            targets: [
              {
                cartLine: {
                  id: line.id,
                },
              },
            ],
            value: {
              percentage: {
                value: 20,
              },
            },
          })),
          selectionStrategy: ProductDiscountSelectionStrategy.First,
        },
      },
    ],
  };
}
// [END discount-function.run.cart]
