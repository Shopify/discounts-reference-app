import { HttpRequestMethod } from "../generated/api";

// [START discount-function.cart.fetch]
export function cartLinesDiscountsGenerateFetch(input) {
  const { enteredDiscountCodes } = input;
  const jsonBody = { enteredDiscountCodes };
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
    url: "<external server url>/api",
    // [END discount-function.cart.fetch.url]
    body: JSON.stringify(jsonBody),
    jsonBody,
  };

  return { request };
}
// [END discount-function.fetch.cart]
