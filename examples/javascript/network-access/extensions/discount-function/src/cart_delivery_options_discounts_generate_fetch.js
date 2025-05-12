import { HttpRequestMethod } from "../generated/api";

// [START discount-function.delivery.fetch]
export function cartDeliveryOptionsDiscountsGenerateFetch(input) {
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
    // [START discount-function.delivery.fetch.url]
    url: "<external server url>/api",
    // [END discount-function.delivery.fetch.url]
    body: JSON.stringify(jsonBody),
    jsonBody,
  };

  return { request };
}
// [END discount-function.delivery.fetch]
