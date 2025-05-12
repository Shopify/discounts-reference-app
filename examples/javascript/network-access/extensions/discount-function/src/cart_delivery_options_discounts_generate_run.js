// [START discount-function.delivery.run]
export function cartDeliveryOptionsDiscountsGenerateRun(input) {
  // [START discount-function.delivery.run.body]
  const {
    fetchResult,
    discount: { discountClasses },
  } = input;
  const body = fetchResult?.jsonBody;

  if (!body) {
    throw new Error("Missing response body");
  }

  const operations = body;

  const hasShippingDiscountClass = discountClasses.includes(
    DiscountClass.Shipping,
  );

  // If shipping discount class is not set, return an empty operations array
  if (!hasShippingDiscountClass) {
    return { operations: [] };
  }

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
