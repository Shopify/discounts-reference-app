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
  const influencerCodes = input.enteredDiscountCodes.filter(
    ({ code, rejectable }) => code.startsWith("INF-") && rejectable,
  );

  if (influencerCodes.length <= 1) {
    return { operations: [] };
  }

  const codesToReject = influencerCodes.slice(0, -1);

  return {
    operations: [
      {
        enteredDiscountCodesReject: {
          codes: codesToReject.map(({ code }) => ({ code })),
          message: `Only one influencer code allowed. Rejected: ${codesToReject.map((c) => c.code).join(", ")}`,
        },
      },
    ],
  };
  // [END discount-rejections.run]
}
