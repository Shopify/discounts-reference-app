import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import {
  type CartOperation,
  ProductDiscountSelectionStrategy,
  OrderDiscountSelectionStrategy,
} from "./types/generated";

const router = express.Router();

const PRODUCT_DISCOUNT_CODE = "10OFFPRODUCT";
const ORDER_DISCOUNT_CODE = "20OFFORDER";

const supportedCodes = [PRODUCT_DISCOUNT_CODE, ORDER_DISCOUNT_CODE];

/**
 * @api {post} /cart Apply Cart Discount Codes
 * @apiDescription Applies discount codes to a cart
 * @apiBody {string[]} enteredDiscountCodes Array of discount codes to apply
 */
router.post("/", function (req: Request, res: Response, next: NextFunction) {
  try {
    const { enteredDiscountCodes } = req.body as {
      enteredDiscountCodes: string[];
    };
    const operations: CartOperation[] = [];

    const filteredCodes = enteredDiscountCodes.filter((code) =>
      supportedCodes.includes(code),
    );

    if (filteredCodes && filteredCodes.length > 0) {
      // Add valid discount codes
      operations.push({
        addDiscountCodeValidations: {
          codes: filteredCodes.map((code) => ({ code })),
        },
      });

      if (filteredCodes.includes(PRODUCT_DISCOUNT_CODE)) {
        operations.push({
          addProductDiscounts: {
            selectionStrategy: ProductDiscountSelectionStrategy.First,
            candidates: [
              {
                associatedDiscountCode: { code: PRODUCT_DISCOUNT_CODE },
                message: "10% off selected products",
                targets: [
                  {
                    cartLine: {
                      id: "gid://shopify/CartLine/0",
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
          },
        });
      }

      if (filteredCodes.includes(ORDER_DISCOUNT_CODE)) {
        operations.push({
          addOrderDiscounts: {
            selectionStrategy: OrderDiscountSelectionStrategy.First,
            candidates: [
              {
                associatedDiscountCode: { code: ORDER_DISCOUNT_CODE },
                message: "20% off your order",
                targets: [
                  {
                    orderSubtotal: {
                      excludedCartLineIds: [],
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
          },
        });
      }
    }

    res.status(200).json({ operations });
  } catch (error) {
    next(error);
  }
});

export default router;
