
use shopify_function::prelude::*;
use shopify_function::Result;

use delivery_run::output::{
    DeliveryDiscountCandidate, DeliveryDiscountCandidateTarget, DeliveryDiscountCandidateValue,
    DeliveryDiscountSelectionStrategy, DeliveryDiscounts, DeliveryGroupTarget, DeliveryOperation,
    FunctionDeliveryRunResult, Percentage,
};

use delivery_run::input::ResponseData;

// [START discount-function.run.delivery]
#[shopify_function_target(
    target = "delivery_run",
    query_path = "src/generate_delivery_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_delivery_run(input: ResponseData) -> Result<FunctionDeliveryRunResult> {
    let delivery_groups = input.cart.delivery_groups.iter();
    Ok(FunctionDeliveryRunResult {
        operations: vec![DeliveryOperation::AddDeliveryDiscounts(DeliveryDiscounts {
            selection_strategy: DeliveryDiscountSelectionStrategy::ALL,
            candidates: delivery_groups
                .map(|group| DeliveryDiscountCandidate {
                    targets: vec![DeliveryDiscountCandidateTarget::DeliveryGroup(
                        DeliveryGroupTarget {
                            id: group.id.clone(),
                        },
                    )],
                    value: DeliveryDiscountCandidateValue::Percentage(Percentage {
                        value: Decimal(30.0),
                    }),
                    message: Some("30% OFF DELIVERY".to_string()),
                    associated_discount_code: None,
                })
                .collect(),
        })],
    })
}
// [END discount-function.run.delivery]
