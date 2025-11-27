use super::schema;
use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function]
fn cart_lines_discounts_generate_run(
    input: schema::cart_lines_discounts_generate_run::Input,
) -> Result<schema::CartLinesDiscountsGenerateRunResult> {
    // [START discount-rejections.run]

    let all_influencer_codes: Vec<_> = input
        .entered_discount_codes()
        .iter()
        .filter(|code| code.code().to_lowercase().starts_with("inf-"))
        .collect();

    let rejectable_influencer_codes: Vec<String> = all_influencer_codes
        .iter()
        .filter(|code| *code.rejectable())
        .map(|code| code.code().to_string())
        .collect();

    let non_rejectable_exists = all_influencer_codes.iter().any(|code| !*code.rejectable());

    let codes_to_reject = if non_rejectable_exists {
        rejectable_influencer_codes
    } else {
        // Take all except the last one
        rejectable_influencer_codes
            .split_last()
            .map(|(_, all_but_last)| all_but_last.to_vec())
            .unwrap_or_default()
    };

    if codes_to_reject.is_empty() {
        return Ok(schema::CartLinesDiscountsGenerateRunResult { operations: vec![] });
    }

    Ok(schema::CartLinesDiscountsGenerateRunResult {
        operations: vec![schema::CartOperation::EnteredDiscountCodesReject(
            schema::EnteredDiscountCodesRejectOperation {
                codes: codes_to_reject
                    .iter()
                    .map(|code| schema::RejectedDiscountCode {
                        code: code.to_string(),
                    })
                    .collect(),
                message: format!(
                    "Only one influencer code allowed. Rejected: {}",
                    codes_to_reject.join(", ")
                ),
            },
        )],
    })
    // [END discount-rejections.run]
}
