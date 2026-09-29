// [START build-the-ui.resolve-intent]
export async function completeDiscountWorkflow(discountId: string) {
  if (shopify.intents.request.value) {
    await getIntentResponse().ok({ id: discountId });
    return;
  }

  openDiscountsPage();
}

export async function returnToDiscounts() {
  if (shopify.intents.request.value) {
    await getIntentResponse().closed();
    return;
  }

  openDiscountsPage();
}
// [END build-the-ui.resolve-intent]

function getIntentResponse() {
  const response = shopify.intents.response;
  if (!response) throw new Error("Intent response API unavailable");
  return response;
}

function openDiscountsPage() {
  window.open("shopify://admin/discounts", "_top");
}
