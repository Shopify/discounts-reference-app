use super::schema;
use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function]
fn cart_lines_discounts_generate_run(
    input: schema::cart_lines_discounts_generate_run::Input,
) -> Result<schema::CartLinesDiscountsGenerateRunResult> {
    // [START discount-rejections.run]
    let mut influencer_codes: Vec<_> = input
        .entered_discount_codes()
        .iter()
        .filter(|code| code.code().starts_with("INF-") && *code.rejectable())
        .map(|code| code.code().to_string())
        .collect();

    if influencer_codes.len() <= 1 {
        return Ok(schema::CartLinesDiscountsGenerateRunResult { operations: vec![] });
    }

    influencer_codes.pop();
    Ok(schema::CartLinesDiscountsGenerateRunResult {
        operations: vec![schema::CartOperation::EnteredDiscountCodesReject(
            schema::EnteredDiscountCodesRejectOperation {
                codes: influencer_codes
                    .into_iter()
                    .map(|code| schema::RejectedDiscountCode { code })
                    .collect(),
                message: "Only one influencer code allowed".to_string(),
            },
        )],
    })
    // [END discount-rejections.run]
}
