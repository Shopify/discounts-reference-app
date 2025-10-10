export function returnToDiscounts() {
  if (typeof window !== "undefined") {
    window.open("shopify://admin/discounts", "_top");
  }
}
