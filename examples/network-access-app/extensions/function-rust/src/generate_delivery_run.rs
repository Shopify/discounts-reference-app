// [START discount-function.delivery.run]
use shopify_function::prelude::*;
use shopify_function::Result;
use serde_json::Value;

use delivery_run::output::{
    DeliveryDiscountCandidate, DeliveryDiscountCandidateTarget, DeliveryDiscountCandidateValue,
    DeliveryDiscountSelectionStrategy, DeliveryDiscounts, DeliveryGroupTarget, DeliveryOperation,
    FunctionDeliveryRunResult, Percentage,
};

use delivery_run::input::ResponseData;

#[shopify_function_target(
    target = "delivery_run",
    query_path = "src/generate_delivery_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_delivery_run(input: ResponseData) -> Result<FunctionDeliveryRunResult> {
    let fetch_result = input.fetch_result
        .ok_or("Missing fetch result")?;
    let body = fetch_result.body
        .ok_or("Missing response body")?;

    // Parse the response body as JSON
    let response_body: Value = serde_json::from_str(&body)
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    // Extract operations from the response
    let operations = if let Some(ops) = response_body.get("operations") {
        let mut delivery_operations = Vec::new();

        if let Some(delivery_discounts) = ops.get("addDeliveryDiscounts") {
            if let Some(candidates) = delivery_discounts.get("candidates") {
                let empty_vec = Vec::new();
                let candidates = candidates.as_array().unwrap_or(&empty_vec);
                let mut delivery_discount_candidates = Vec::new();

                for candidate in candidates {
                    if let (Some(targets), Some(value), Some(message)) = (
                        candidate.get("targets"),
                        candidate.get("value"),
                        candidate.get("message"),
                    ) {
                        let delivery_group = targets
                            .get("deliveryGroup")
                            .and_then(|g| g.get("id"))
                            .and_then(|id| id.as_str())
                            .unwrap_or("");

                        let percentage = value
                            .get("percentage")
                            .and_then(|p| p.get("value"))
                            .and_then(|v| v.as_f64())
                            .unwrap_or(0.0);

                        delivery_discount_candidates.push(DeliveryDiscountCandidate {
                            targets: vec![DeliveryDiscountCandidateTarget::DeliveryGroup(
                                DeliveryGroupTarget {
                                    id: delivery_group.to_string(),
                                },
                            )],
                            value: DeliveryDiscountCandidateValue::Percentage(Percentage {
                                value: Decimal(percentage),
                            }),
                            message: Some(message.as_str().unwrap_or("").to_string()),
                            associated_discount_code: None,
                        });
                    }
                }

                if !delivery_discount_candidates.is_empty() {
                    delivery_operations.push(DeliveryOperation::AddDeliveryDiscounts(
                        DeliveryDiscounts {
                            selection_strategy: DeliveryDiscountSelectionStrategy::ALL,
                            candidates: delivery_discount_candidates,
                        },
                    ));
                }
            }
        }

        delivery_operations
    } else {
        Vec::new()
    };

    Ok(FunctionDeliveryRunResult { operations })
}
// [END discount-function.delivery.run]
