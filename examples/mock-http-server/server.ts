import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

const app = express();
const port = 3000;

interface DiscountResponse {
  operations: {
    addDiscountCodeValidations: {
      codes: Array<{ code: string }>;
    };
    addProductDiscounts?: {
      selectionStrategy: "ALL" | "FIRST" | "MAXIMUM";
      candidates: Array<{
        associatedDiscountCode?: { code: string };
        message: string;
        targets: {
          cartLineIds: string[];
          quantity?: number;
        };
        value: {
          fixedAmount?: {
            amount: number;
            appliesToEachItem: boolean;
          };
          percentage?: {
            value: number;
          };
        };
      }>;
    };
    addOrderDiscounts?: {
      selectionStrategy: "FIRST" | "MAXIMUM";
      candidates: Array<{
        associatedDiscountCode?: { code: string };
        message: string;
        value: {
          fixedAmount?: { amount: number };
          percentage?: { value: number };
        };
        targets: {
          orderSubtotal: {
            excludedCartLineIds?: string[];
          };
        };
        conditions?: {
          orderMinimumSubtotal?: {
            excludedCartLineIds?: string[];
            minimumAmount: number;
          };
          cartLineMinimumQuantity?: {
            cartLineIds: string[];
            minimumQuantity: number;
          };
          cartLineMinimumSubtotal?: {
            cartLineIds: string[];
            minimumAmount: number;
          };
        };
      }>;
    };
    addDeliveryDiscounts?: {
      selectionStrategy: "ALL";
      candidates: Array<{
        associatedDiscountCode?: { code: string };
        message: string;
        value: {
          fixedAmount?: { amount: number };
          percentage?: { value: number };
        };
        targets: {
          deliveryGroup?: { id: string };
          deliveryOption?: { handle: string };
        };
      }>;
    };
  };
}

interface DiscountRequest {
  enteredDiscountCodes: string[];
}

const PRODUCT_DISCOUNT_CODE = "10OFFPRODUCT";
const ORDER_DISCOUNT_CODE = "20OFFORDER";
const SHIPPING_DISCOUNT_CODE = "FREESHIPPING";

// Error handling middleware
function errorHandler(err: Error, req: Request, res: Response) {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}

// To parse the request body as JSON
app.use(express.json());

// To log the request method and url
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

/**
 * @api {get} / Home
 * @apiDescription Returns a welcome page
 * @apiSuccess (200) {HTML} response HTML welcome page
 */
app.get("/", function (req: Request, res: Response) {
  res
    .status(200)
    .send(
      "<h1>Mock HTTP Server</h1><p>This is a test page</p><p>The server is running at http://localhost:3000</p>",
    );
});

/**
 * @api {post} / Apply Discount Codes
 * @apiDescription Applies discount codes to an order
 * @apiBody {string[]} enteredDiscountCodes Array of discount codes to apply
 */
// [START mock-http-server.post]
app.post("/", function (req: Request, res: Response, next: NextFunction) {
  try {
    const { enteredDiscountCodes } = req.body as DiscountRequest;
    const response: DiscountResponse = {
      operations: {
        addDiscountCodeValidations: {
          codes: [],
        },
      },
    };

    if (enteredDiscountCodes && enteredDiscountCodes.length > 0) {
      if (enteredDiscountCodes.includes(PRODUCT_DISCOUNT_CODE)) {
        response.operations.addDiscountCodeValidations.codes.push({
          code: PRODUCT_DISCOUNT_CODE,
        });

        response.operations.addProductDiscounts = {
          selectionStrategy: "FIRST",
          candidates: [
            {
              associatedDiscountCode: { code: PRODUCT_DISCOUNT_CODE },
              message: "10% off selected products",
              targets: {
                cartLineIds: ["gid://shopify/CartLine/0"],
              },
              value: {
                percentage: {
                  value: 10,
                },
              },
            },
          ],
        };
      }

      if (enteredDiscountCodes.includes(ORDER_DISCOUNT_CODE)) {
        response.operations.addDiscountCodeValidations.codes.push({
          code: ORDER_DISCOUNT_CODE,
        });

        response.operations.addOrderDiscounts = {
          selectionStrategy: "FIRST",
          candidates: [
            {
              associatedDiscountCode: { code: ORDER_DISCOUNT_CODE },
              message: "20% off your order",
              targets: {
                orderSubtotal: {
                  excludedCartLineIds: [],
                },
              },
              value: {
                percentage: {
                  value: 20,
                },
              },
            },
          ],
        };
      }

      if (enteredDiscountCodes.includes(SHIPPING_DISCOUNT_CODE)) {
        response.operations.addDiscountCodeValidations.codes.push({
          code: SHIPPING_DISCOUNT_CODE,
        });

        response.operations.addDeliveryDiscounts = {
          selectionStrategy: "ALL",
          candidates: [
            {
              associatedDiscountCode: { code: SHIPPING_DISCOUNT_CODE },
              message: "Free shipping on your order",
              value: {
                percentage: {
                  value: 100,
                },
              },
              targets: {
                deliveryGroup: {
                  id: "gid://shopify/DeliveryGroup/0",
                },
              },
            },
          ],
        };
      }
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
// [END mock-http-server.post]

// Register error handler
app.use(errorHandler);

// Start the server
app.listen(port, function () {
  console.log(`Server is running at http://localhost:${port}`);
});
