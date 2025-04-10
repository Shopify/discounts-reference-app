import {
  OrderDiscountSelectionStrategy,
  ProductDiscountSelectionStrategy,
} from "../generated/api";

// [START discount-function.run.cart]
export function generateCartRun(input) {
  if (!input.cart.lines.length) {
    throw new Error("No cart lines found");
  }

  const maxCartLine = input.cart.lines.reduce((maxLine, line) => {
    if (line.cost.subtotalAmount > maxLine.cost.subtotalAmount) {
      return line;
    }
    return maxLine;
  }, input.cart.lines[0]);

  return {
    operations: [
      {
        orderDiscountsAdd: {
          candidates: [
            {
              message: "10% OFF ORDER",
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
        productDiscountsAdd: {
          candidates: [
            {
              message: "20% OFF PRODUCT",
              targets: [
                {
                  cartLine: {
                    id: maxCartLine.id,
                  },
                },
              ],
              value: {
                percentage: {
                  value: 20,
                },
              },
            },
          ],
          selectionStrategy: ProductDiscountSelectionStrategy.First,
        },
      },
    ],
  };
}
// [END discount-function.run.cart]
