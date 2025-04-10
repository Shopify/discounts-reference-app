// [START discount-function.delivery.run]
export function generateDeliveryRun(input) {
  // [START discount-function.delivery.run.body]
  const { fetchResult } = input;
  const body = fetchResult?.jsonBody;

  if (!body) {
    throw new Error("Missing response body");
  }

  const operations = JSON.parse(body);

  // Filter operations to only include enteredDiscountCodesAccept and delivery operations
  const filteredOperations = operations.filter((operation) => {
    return (
      operation.enteredDiscountCodesAccept || operation.deliveryDiscountsAdd
    );
  });

  return { operations: filteredOperations };
  // [END discount-function.delivery.run.body]
}
// [END discount-function.delivery.run]
