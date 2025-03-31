// [START discount-function.delivery.run]
export function generateDeliveryRun(input) {
  // [START discount-function.delivery.run.body]
  const { fetchResult } = input;
  const body = fetchResult?.body;

  if (!body) {
    throw new Error("Missing response body");
  }

  // Parse the response body and extract the operations
  const { operations } = JSON.parse(body);
  return { operations };
  // [END discount-function.delivery.run.body]
}
// [END discount-function.delivery.run]
