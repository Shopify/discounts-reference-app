/**
 * @typedef {import("../generated/api").CartInput} RunInput
 * @typedef {import("../generated/api").CartLinesDiscountsGenerateRunResult} CartLinesDiscountsGenerateRunResult
 */

/**
 * @param {RunInput} input
 * @returns {CartLinesDiscountsGenerateRunResult}
 */

export function cartLinesDiscountsGenerateRun(input) {
  // [START discount-rejections.run]
  const influencerCodes = input.enteredDiscountCodes.filter(({ code }) =>
    code.startsWith("INF-"),
  );

  if (influencerCodes.length <= 1) {
    return { operations: [] };
  }

  const codesToReject = influencerCodes.slice(0, -1);

  return {
    operations: [
      {
        enteredDiscountCodesReject: {
          codes: codesToReject,
          message: `Only one influencer code allowed. Rejected: ${codesToReject.join(", ")}`,
        },
      },
    ],
  };
  // [END discount-rejections.run]
}
