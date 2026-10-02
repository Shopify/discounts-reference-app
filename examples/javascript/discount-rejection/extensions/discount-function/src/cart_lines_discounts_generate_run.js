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
  const allInfluencerCodes = input.enteredDiscountCodes.filter(({code}) =>
    code.toLowerCase().startsWith("inf-"),
  );

  const rejectableInfluencerCodes = allInfluencerCodes.filter(
    ({rejectable}) => rejectable,
  );

  const hasNonRejectable = allInfluencerCodes.some(
    ({rejectable}) => !rejectable,
  );

  const codesToReject = hasNonRejectable
    ? rejectableInfluencerCodes
    : rejectableInfluencerCodes.slice(0, -1);

  if (codesToReject.length === 0) {
    return {operations: []};
  }

  return {
    operations: [
      {
        enteredDiscountCodesReject: {
          codes: codesToReject.map(({code}) => ({code})),
          message: `Only one influencer code allowed. Rejected: ${codesToReject.map(c => c.code).join(", ")}`,
        },
      },
    ],
  };
  // [END discount-rejections.run]
}
