// [START discount-function.cart.run]
export function generateCartRun(input) {
  // [START discount-function.cart.run.body]
  const {
    fetchResult,
    discount: { discountClasses },
  } = input;
  const body = fetchResult?.jsonBody;

  if (!body) {
    throw new Error("Missing response body");
  }

  const operations = body;

  const hasOrderDiscountClass = discountClasses.includes(DiscountClass.Order);
  const hasProductDiscountClass = discountClasses.includes(
    DiscountClass.Product
  );

  // If no relevant discount classes are set, return an empty operations array
  if (!hasOrderDiscountClass && !hasProductDiscountClass) {
    return { operations: [] };
  }

  // Filter operations to include appropriate discounts based on set discount classes
  const filteredOperations = operations.filter((operation) => {
    // Always include discount code operations
    if (operation.enteredDiscountCodesAccept) {
      return true;
    }

    // Include order discounts only if that class is set
    if (operation.orderDiscountsAdd) {
      return hasOrderDiscountClass;
    }

    // Include product discounts only if that class is set
    if (operation.productDiscountsAdd) {
      return hasProductDiscountClass;
    }

    return false;
  });

  return { operations: filteredOperations };
  // [END discount-function.cart.run.body]
}
// [END discount-function.cart.run]
