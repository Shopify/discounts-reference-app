// [START discount-function.cart.run]
export function generateCartRun(input) {
  // [START discount-function.cart.run.body]
  const { fetchResult } = input;
  const body = fetchResult?.jsonBody;

  if (!body) {
    throw new Error("Missing response body");
  }

  const operations = JSON.parse(body);

  // Filter operations to only include enteredDiscountCodesAccept and product and order operations
  const filteredOperations = operations.filter((operation) => {
    return (
      operation.enteredDiscountCodesAccept ||
      operation.orderDiscountsAdd ||
      operation.productDiscountsAdd
    );
  });
  return { operations: filteredOperations };
  // [END discount-function.cart.run.body]
}
// [END discount-function.cart.run]
