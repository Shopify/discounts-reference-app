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
  // Parse configuration from metafield with fallback defaults
  const config = parseMetafieldConfig(input.discount?.metafield?.value);
  const { codePrefix, rejectionMessage } = config;

  const matchingCodes = input.enteredDiscountCodes.filter(
    ({ code, rejectable }) => code.startsWith(codePrefix) && rejectable,
  );

  if (matchingCodes.length <= 1) {
    return { operations: [] };
  }

  const codesToReject = matchingCodes.slice(0, -1);

  return {
    operations: [
      {
        enteredDiscountCodesReject: {
          codes: codesToReject.map(({ code }) => ({ code })),
          message: `${rejectionMessage}. Rejected: ${codesToReject.map((c) => c.code).join(", ")}`,
        },
      },
    ],
  };
  // [END discount-rejections.run]
}

/**
 * Parse metafield configuration with fallback defaults
 * @param {string | null | undefined} metafieldValue
 * @returns {{codePrefix: string, rejectionMessage: string}}
 */
function parseMetafieldConfig(metafieldValue) {
  try {
    const parsed = JSON.parse(metafieldValue || "{}");
    return {
      codePrefix: parsed.codePrefix || "INF-",
      rejectionMessage:
        parsed.rejectionMessage || "Only one influencer code allowed",
    };
  } catch {
    return {
      codePrefix: "INF-",
      rejectionMessage: "Only one influencer code allowed",
    };
  }
}
