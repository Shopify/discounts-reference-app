use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_delivery_options_discounts_generate_run::output::{
    CartDeliveryOptionsDiscountsGenerateRunResult, DeliveryDiscountCandidate,
    DeliveryDiscountCandidateTarget, DeliveryDiscountCandidateValue,
    DeliveryDiscountSelectionStrategy, DeliveryDiscountsAddOperation, DeliveryGroupTarget,
    DeliveryOperation, Percentage,
};

use cart_delivery_options_discounts_generate_run::input::ResponseData;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct DiscountConfiguration {
    delivery_percentage: f64,
}

// [START discount-function.run.delivery]
#[shopify_function_target(
    target = "cartDeliveryOptionsDiscountsGenerateRun",
    query_path = "src/generate_delivery_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_delivery_run(
    input: ResponseData,
) -> Result<CartDeliveryOptionsDiscountsGenerateRunResult> {
    let first_delivery_group = input
        .cart
        .delivery_groups
        .first()
        .ok_or("No delivery groups found")?;

    // [START discount-function.run.delivery.parse-metafield]
    let discount_configuration = serde_json::from_str::<DiscountConfiguration>(
        &input
            .discount
            .metafield
            .ok_or("No metafield provided")?
            .value,
    )?;
    // [END discount-function.run.delivery.parse-metafield]
    // [START discount-function.run.delivery.add-operations]
    let mut operations = vec![];
    if discount_configuration.delivery_percentage > 0.0 {
        operations.push(DeliveryOperation::DeliveryDiscountsAdd(
            DeliveryDiscountsAddOperation {
                selection_strategy: DeliveryDiscountSelectionStrategy::ALL,
                candidates: vec![DeliveryDiscountCandidate {
                    targets: vec![DeliveryDiscountCandidateTarget::DeliveryGroup(
                        DeliveryGroupTarget {
                            id: first_delivery_group.id.clone(),
                        },
                    )],
                    value: DeliveryDiscountCandidateValue::Percentage(Percentage {
                        value: Decimal(discount_configuration.delivery_percentage),
                    }),
                    message: Some(format!(
                        "{}% OFF DELIVERY",
                        discount_configuration.delivery_percentage
                    )),
                    associated_discount_code: None,
                }],
            },
        ));
    }
    // [END discount-function.run.delivery.add-operations]
    Ok(CartDeliveryOptionsDiscountsGenerateRunResult {
        operations: operations,
    })
}
// [END discount-function.run.delivery]
