import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import {
  type DeliveryOperation,
  DeliveryDiscountSelectionStrategy,
} from "./types/generated";

const router = express.Router();
const SHIPPING_DISCOUNT_CODE = "FREESHIPPING";
const supportedCodes = [SHIPPING_DISCOUNT_CODE];

/**
 * @api {post} /delivery Apply Delivery Discount Codes
 * @apiDescription Applies delivery discount codes to an order
 * @apiBody {string[]} enteredDiscountCodes Array of discount codes to apply
 */
router.post("/", function (req: Request, res: Response, next: NextFunction) {
  try {
    const { enteredDiscountCodes } = req.body as {
      enteredDiscountCodes: string[];
    };
    const operations: DeliveryOperation[] = [];

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

      if (filteredCodes.includes(SHIPPING_DISCOUNT_CODE)) {
        operations.push({
          addDeliveryDiscounts: {
            selectionStrategy: DeliveryDiscountSelectionStrategy.All,
            candidates: [
              {
                associatedDiscountCode: { code: SHIPPING_DISCOUNT_CODE },
                message: "Free shipping on your order",
                value: {
                  percentage: {
                    value: 100,
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

    res.status(200).json({ operations });
  } catch (error) {
    next(error);
  }
});

export default router;
