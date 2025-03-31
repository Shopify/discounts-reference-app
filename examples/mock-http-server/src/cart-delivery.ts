import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import {
  type CartOperation,
  type DeliveryOperation,
  ProductDiscountSelectionStrategy,
  OrderDiscountSelectionStrategy,
  DeliveryDiscountSelectionStrategy,
} from "./types/generated";

interface DiscountRequest {
  enteredDiscountCodes: string[];
}

const router = express.Router();

const PRODUCT_DISCOUNT_CODE = "10OFFPRODUCT";
const ORDER_DISCOUNT_CODE = "20OFFORDER";
const SHIPPING_DISCOUNT_CODE = "FREESHIPPING";
/**
 * @api {post} /cart-delivery Apply Cart and Delivery Discount Codes
 * @apiDescription Applies discount codes to an order
 * @apiBody {string[]} enteredDiscountCodes Array of discount codes to apply
 */
router.post(
  "/",
  function (
    req: Request<{}, {}, DiscountRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { enteredDiscountCodes } = req.body;
      const validDiscountCodes = enteredDiscountCodes.filter((code: string) =>
        [
          PRODUCT_DISCOUNT_CODE,
          ORDER_DISCOUNT_CODE,
          SHIPPING_DISCOUNT_CODE,
        ].includes(code),
      );

      const cartOperations: CartOperation[] = [];
      const deliveryOperations: DeliveryOperation[] = [];
      const validationOperations: DeliveryOperation[] = [];

      if (validDiscountCodes && validDiscountCodes.length > 0) {
        // Add valid discount codes to cart operations
        validationOperations.push({
          enteredDiscountCodesAccept: {
            codes: validDiscountCodes.map((code: string) => ({ code })),
          },
        });

        if (validDiscountCodes.includes(PRODUCT_DISCOUNT_CODE)) {
          cartOperations.push({
            productDiscountsAdd: {
              selectionStrategy: ProductDiscountSelectionStrategy.First,
              candidates: [
                {
                  associatedDiscountCode: { code: PRODUCT_DISCOUNT_CODE },
                  targets: [
                    {
                      cartLine: {
                        id: "gid://shopify/CartLine/0",
                      },
                    },
                  ],
                  value: {
                    percentage: {
                      value: "10",
                    },
                  },
                },
              ],
            },
          });
        }

        if (validDiscountCodes.includes(ORDER_DISCOUNT_CODE)) {
          cartOperations.push({
            orderDiscountsAdd: {
              selectionStrategy: OrderDiscountSelectionStrategy.First,
              candidates: [
                {
                  associatedDiscountCode: { code: ORDER_DISCOUNT_CODE },
                  targets: [
                    {
                      orderSubtotal: {
                        excludedCartLineIds: [],
                      },
                    },
                  ],
                  value: {
                    percentage: {
                      value: "20",
                    },
                  },
                },
              ],
            },
          });
        }

        if (validDiscountCodes.includes(SHIPPING_DISCOUNT_CODE)) {
          deliveryOperations.push({
            deliveryDiscountsAdd: {
              selectionStrategy: DeliveryDiscountSelectionStrategy.All,
              candidates: [
                {
                  associatedDiscountCode: { code: SHIPPING_DISCOUNT_CODE },
                  value: {
                    percentage: {
                      value: "100",
                    },
                  },
                  targets: [
                    {
                      deliveryGroup: {
                        id: "gid://shopify/DeliveryGroup/0",
                      },
                    },
                  ],
                },
              ],
            },
          });
        }
      }
      res
        .status(200)
        .json([
          ...validationOperations,
          ...cartOperations,
          ...deliveryOperations,
        ]);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
