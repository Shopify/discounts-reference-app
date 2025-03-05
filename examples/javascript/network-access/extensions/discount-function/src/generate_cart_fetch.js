import { HttpRequestMethod } from "../generated/api";


// [START discount-function.cart.fetch]
export function generateCartFetch(input) {
  const { enteredDiscountCodes } = input;
  const jsonBody = { body: { enteredDiscountCodes } };
  const request = {
    headers: [
      {
        name: "accept",
        value: "application/json",
      },
    ],
    method: HttpRequestMethod.Get,
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
