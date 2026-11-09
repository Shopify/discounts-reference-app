import {describe, it, expect} from "vitest";

import {
  DeliveryDiscountSelectionStrategy,
  DeliveryMethod,
  DiscountClass,
} from "../generated/api";

import {cartDeliveryOptionsDiscountsGenerateRun} from "./cart_delivery_options_discounts_generate_run";

/**
 * @typedef {import("../generated/api").CartDeliveryOptionsDiscountsGenerateRunResult} CartDeliveryOptionsDiscountsGenerateRunResult
 * @typedef {import("../generated/api").DeliveryInput} DeliveryInput
 */

describe("cartDeliveryOptionsDiscountsGenerateRun", () => {
  const pickupGroup = {
    id: "gid://shopify/CartDeliveryGroup/0",
    deliveryOptions: [{deliveryMethodType: DeliveryMethod.PickUp}],
  };
  const shippingGroup = {
    id: "gid://shopify/CartDeliveryGroup/1",
    deliveryOptions: [{deliveryMethodType: DeliveryMethod.Shipping}],
  };
  const localDeliveryGroup = {
    id: "gid://shopify/CartDeliveryGroup/2",
    deliveryOptions: [{deliveryMethodType: DeliveryMethod.Local}],
  };
  const pickupPointGroup = {
    id: "gid://shopify/CartDeliveryGroup/3",
    deliveryOptions: [{deliveryMethodType: DeliveryMethod.PickupPoint}],
  };

  /**
   * @param {DeliveryInput["cart"]["deliveryGroups"]} deliveryGroups
   * @param {DiscountClass[]} discountClasses
   * @returns {DeliveryInput}
   */
  function inputWith(
    deliveryGroups,
    discountClasses = [DiscountClass.Shipping],
  ) {
    return {
      cart: {
        deliveryGroups,
      },
      discount: {
        discountClasses,
      },
    };
  }

  /**
   * @param {string[]} groupIds
   */
  function freeDeliveryOperation(groupIds) {
    return {
      deliveryDiscountsAdd: {
        candidates: [
          {
            message: "FREE DELIVERY",
            targets: groupIds.map(id => ({deliveryGroup: {id}})),
            value: {
              percentage: {
                value: 100,
              },
            },
          },
        ],
        selectionStrategy: DeliveryDiscountSelectionStrategy.All,
      },
    };
  }

  it("returns empty operations when no discount classes are present", () => {
    const result = cartDeliveryOptionsDiscountsGenerateRun(
      inputWith([shippingGroup], []),
    );
    expect(result.operations).toEqual([]);
  });

  it("returns delivery discount when shipping discount class is present", () => {
    const result = cartDeliveryOptionsDiscountsGenerateRun(
      inputWith([shippingGroup]),
    );
    expect(result.operations).toEqual([
      freeDeliveryOperation(["gid://shopify/CartDeliveryGroup/1"]),
    ]);
  });

  it("discounts only the shipping group when the pickup group is first in a split", () => {
    const result = cartDeliveryOptionsDiscountsGenerateRun(
      inputWith([pickupGroup, shippingGroup]),
    );
    expect(result.operations).toEqual([
      freeDeliveryOperation(["gid://shopify/CartDeliveryGroup/1"]),
    ]);
  });

  it("discounts only the shipping group when the shipping group is first in a split", () => {
    const result = cartDeliveryOptionsDiscountsGenerateRun(
      inputWith([shippingGroup, pickupGroup]),
    );
    expect(result.operations).toEqual([
      freeDeliveryOperation(["gid://shopify/CartDeliveryGroup/1"]),
    ]);
  });

  it("returns empty operations when the cart only has a pickup group", () => {
    const result = cartDeliveryOptionsDiscountsGenerateRun(
      inputWith([pickupGroup]),
    );
    expect(result.operations).toEqual([]);
  });

  it("returns empty operations for local delivery and pickup point groups", () => {
    const result = cartDeliveryOptionsDiscountsGenerateRun(
      inputWith([localDeliveryGroup, pickupPointGroup]),
    );
    expect(result.operations).toEqual([]);
  });

  it("returns empty operations when no delivery groups are present", () => {
    const result = cartDeliveryOptionsDiscountsGenerateRun(inputWith([]));
    expect(result.operations).toEqual([]);
  });
});
