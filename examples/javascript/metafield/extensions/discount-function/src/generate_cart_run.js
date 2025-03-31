import {
  OrderDiscountSelectionStrategy,
  ProductDiscountSelectionStrategy,
} from "../generated/api";

// [START discount-function.run.cart]
export function generateCartRun(input) {
  if (!input.cart.lines.length) {
    throw new Error("No cart lines found");
  }

  const { cartLinePercentage, orderPercentage, collectionIds } = parseMetafield(
    input.discount.metafield,
  );

  const operations = [];
  // [START discount-function.run.cart.add-operations]
  if (orderPercentage > 0) {
    operations.push({
      orderDiscountsAdd: {
        candidates: [
          {
            message: `${orderPercentage}% OFF ORDER`,
            targets: [
              {
                orderSubtotal: {
                  excludedCartLineIds: [],
                },
              },
            ],
            value: {
              percentage: {
                value: orderPercentage,
              },
            },
          },
        ],
        selectionStrategy: OrderDiscountSelectionStrategy.First,
      },
    });
  }

  if (cartLinePercentage > 0) {
    const cartLineTargets = input.cart.lines.reduce((targets, line) => {
      // [START discount-function.run.cart.product.in_any_collection]
      if (
        "product" in line.merchandise &&
        (line.merchandise.product.inAnyCollection || collectionIds.length === 0)
      ) {
        targets.push({
          cartLine: {
            id: line.id,
          },
        });
      }
      // [END discount-function.run.cart.product.in_any_collection]
      return targets;
    }, []);

    if (cartLineTargets.length > 0) {
      operations.push({
        productDiscountsAdd: {
          candidates: [
            {
              message: `${cartLinePercentage}% OFF PRODUCT`,
              targets: cartLineTargets,
              value: {
                percentage: {
                  value: cartLinePercentage,
                },
              },
            },
          ],
          selectionStrategy: ProductDiscountSelectionStrategy.First,
        },
      });
    }
    // [END discount-function.run.cart.add-operations]
  }

  return { operations };
}

// [START discount-function.run.cart.parse-metafield]
function parseMetafield(metafield) {
  try {
    const value = JSON.parse(metafield.value);
    return {
      cartLinePercentage: value.cartLinePercentage || 0,
      orderPercentage: value.orderPercentage || 0,
      collectionIds: value.collectionIds || [],
    };
  } catch (error) {
    console.error("Error parsing metafield", error);
    return {
      cartLinePercentage: 0,
      orderPercentage: 0,
      collectionIds: [],
    };
  }
}
// [END discount-function.run.cart.parse-metafield]
// [END discount-function.run.cart]
