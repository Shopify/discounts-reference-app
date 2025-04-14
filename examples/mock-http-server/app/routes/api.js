import jwt from "jsonwebtoken";
import { TextEncoder } from "util";
import { subtle } from "crypto";
import { json } from "@remix-run/node";

const selectionStrategy = {
  All: "ALL",
  First: "FIRST",
  Maximum: "MAXIMUM",
};

const PRODUCT_DISCOUNT_CODE = "10OFFPRODUCT";
const ORDER_DISCOUNT_CODE = "20OFFORDER";
const SHIPPING_DISCOUNT_CODE = "FREESHIPPING";

export const action = async ({ request }) => {
  if (request.method.toUpperCase() !== "POST") {
    return json({
      error: "Invalid request method. Only POST requests are allowed.",
    });
  }

  let body;

  try {
    body = await authenticate(request);
  } catch (err) {
    return json({ error: err.message });
  }
  return handle(body);
};

const authenticate = async (request) => {
  const requestJwtHeader = request.headers.get("x-shopify-request-jwt");
  const requestIdHeader = request.headers.get("x-shopify-request-id");

  const secretKey = process.env.APP_CLIENT_SECRET;
  // Include the headers explicitly specified in the HttpRequest of the fetch target.
  const includedVerificationHeaders = process.env.JWT_HEADERS.split(",");
  const shopId = parseInt(process.env.JWT_SHOP_ID);

  // Validate the JWT signature and ensure it hasn't expired.
  const decoded = jwt.verify(requestJwtHeader, secretKey);

  // Validate the JWT claims. The following checks are optional, but they enhance the authenticity of the request.

  // Validate the method
  const method = request.method;
  if (decoded.method !== method) {
    throw new Error("JWT invalid method.");
  }

  // Validate the URL
  const fullUrl = request.url;
  const url_sha256 = await hashWithSHA256(fullUrl);
  if (
    process.env.NODE_ENV !== "development" &&
    decoded.url_sha256 !== url_sha256
  ) {
    throw new Error("JWT invalid url.");
  }

  // Validate the headers
  const headers = Array.from(request.headers);
  const canonicalHeaders = headers
    .filter(([k]) => includedVerificationHeaders.includes(k.toLowerCase()))
    .map(([k, v]) => `${k.toLowerCase()}:${v}`)
    .sort()
    .join(",");
  const headersSha256 = await hashWithSHA256(canonicalHeaders);
  if (decoded.headers_sha256 !== headersSha256) {
    throw new Error("JWT invalid headers.");
  }

  // Validate the body
  const body = await request.text();
  if (body) {
    const body_sha256 = await hashWithSHA256(body);
    if (decoded.body_sha256 !== body_sha256) {
      throw new Error("JWT invalid body.");
    }
  }

  // Validate the issuer Shop
  if (decoded.iss !== shopId) {
    throw new Error("JWT invalid issuer shop.");
  }

  // Validate the request ID. Each request ID is unique and can be used as a measure to prevent replay attacks.
  if (decoded.x_shopify_request_id !== requestIdHeader) {
    throw new Error("JWT invalid x_shopify_request_id.");
  }

  return body;
};

const hashWithSHA256 = async (input) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

const handle = (body) => {
  try {
    const {
      body: { enteredDiscountCodes },
    } = JSON.parse(body);
    // [START mock-http-server.results]
    const validDiscountCodes = enteredDiscountCodes.filter((code) =>
      [
        PRODUCT_DISCOUNT_CODE,
        ORDER_DISCOUNT_CODE,
        SHIPPING_DISCOUNT_CODE,
      ].includes(code),
    );

    const cartOperations = [];
    const deliveryOperations = [];
    const validationOperations = [];

    if (validDiscountCodes && validDiscountCodes.length > 0) {
      // Add valid discount codes to cart operations
      validationOperations.push({
        enteredDiscountCodesAccept: {
          codes: validDiscountCodes.map((code) => ({ code })),
        },
      });

      if (validDiscountCodes.includes(PRODUCT_DISCOUNT_CODE)) {
        cartOperations.push({
          productDiscountsAdd: {
            selectionStrategy: selectionStrategy.First,
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
            selectionStrategy: selectionStrategy.First,
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
            selectionStrategy: selectionStrategy.All,
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
    return json([
      ...validationOperations,
      ...cartOperations,
      ...deliveryOperations,
    ]);
    // [END mock-http-server.results]
  } catch (error) {
    throw error;
  }
};
