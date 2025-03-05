// [START discount-function.cart.run]
export function generateCartRun(input) {
  // [START discount-function.cart.run.body]
  const { fetchResult } = input;
  const body = fetchResult?.body;

  if (!body) {
    throw new Error("Missing response body");
  }

  // Parse the response body and extract the operations
  const { operations } = JSON.parse(body);
  return { operations };
  // [END discount-function.cart.run.body]
}
// [END discount-function.cart.run]
