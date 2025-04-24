import { HttpRequestMethod } from "../generated/api";

// [START discount-function.cart.fetch]
export function generateCartFetch(input) {
  const {
    enteredDiscountCodes,
    discount: { discountClasses },
  } = input;
  const jsonBody = { enteredDiscountCodes, discountClasses };
  const request = {
    headers: [
      {
        name: "accept",
        value: "application/json",
      },
      {
        name: "Content-Type",
        value: "application/json",
      },
    ],
    method: HttpRequestMethod.Post,
    policy: {
      readTimeoutMs: 2000,
    },
    // [START discount-function.cart.fetch.url]
    url: "<external server url>",
    // [END discount-function.cart.fetch.url]
    body: JSON.stringify(jsonBody),
    jsonBody,
  };

  return { request };
}
// [END discount-function.fetch.cart]
