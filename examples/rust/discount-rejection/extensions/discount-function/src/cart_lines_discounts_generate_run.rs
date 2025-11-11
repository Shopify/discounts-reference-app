use super::schema;
use shopify_function::prelude::*;
use shopify_function::Result;

#[derive(serde::Deserialize, Default)]
#[serde(rename_all = "camelCase")]
struct MetafieldConfig {
    code_prefix: Option<String>,
    rejection_message: Option<String>,
}

#[shopify_function]
fn cart_lines_discounts_generate_run(
    input: schema::cart_lines_discounts_generate_run::Input,
) -> Result<schema::CartLinesDiscountsGenerateRunResult> {
    // [START discount-rejections.run]
    // Parse configuration from metafield with fallback defaults
    let config = parse_metafield_config(input.discount().metafield().map(|m| m.value()));
    let code_prefix = config.code_prefix.unwrap_or_else(|| "INF-".to_string());
    let rejection_message = config
        .rejection_message
        .unwrap_or_else(|| "Only one influencer code allowed".to_string());

    let mut matching_codes: Vec<_> = input
        .entered_discount_codes()
        .iter()
        .filter(|code| code.code().starts_with(&code_prefix) && *code.rejectable())
        .map(|code| code.code().to_string())
        .collect();

    if matching_codes.len() <= 1 {
        return Ok(schema::CartLinesDiscountsGenerateRunResult { operations: vec![] });
    }

    matching_codes.pop();
    Ok(schema::CartLinesDiscountsGenerateRunResult {
        operations: vec![schema::CartOperation::EnteredDiscountCodesReject(
            schema::EnteredDiscountCodesRejectOperation {
                codes: matching_codes
                    .iter()
                    .map(|code| schema::RejectedDiscountCode { code: code.clone() })
                    .collect(),
                message: format!(
                    "{}. Rejected: {}",
                    rejection_message,
                    matching_codes.join(", ")
                ),
            },
        )],
    })
    // [END discount-rejections.run]
}

fn parse_metafield_config(value: Option<&String>) -> MetafieldConfig {
    value
        .and_then(|v| serde_json::from_str(v).ok())
        .unwrap_or_default()
}
