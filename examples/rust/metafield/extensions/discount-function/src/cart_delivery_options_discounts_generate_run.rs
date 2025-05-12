use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct DiscountConfiguration {
    delivery_percentage: f64,
}

// [START discount-function.run.delivery]
#[shopify_function_target(
    query_path = "src/cart_delivery_options_discounts_generate_run.graphql",
    schema_path = "schema.graphql"
)]
fn cart_delivery_options_discounts_generate_run(
    input: cart_delivery_options_discounts_generate_run::input::ResponseData,
) -> Result<cart_delivery_options_discounts_generate_run::output::CartDeliveryOptionsDiscountsGenerateRunResult>{
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

    let has_shipping_discount_class = input
        .discount
        .discount_classes
        .contains(&cart_delivery_options_discounts_generate_run::input::DiscountClass::SHIPPING);

    if !has_shipping_discount_class {
        return Ok(cart_delivery_options_discounts_generate_run::output::CartDeliveryOptionsDiscountsGenerateRunResult { operations: vec![] });
    }

    let mut operations = vec![];

    // Only add delivery discount if both the class is allowed and percentage is set
    if discount_configuration.delivery_percentage > 0.0 {
        operations.push(cart_delivery_options_discounts_generate_run::output::DeliveryOperation::DeliveryDiscountsAdd(
            cart_delivery_options_discounts_generate_run::output::DeliveryDiscountsAddOperation {
                selection_strategy: cart_delivery_options_discounts_generate_run::output::DeliveryDiscountSelectionStrategy::ALL,
                candidates: vec![cart_delivery_options_discounts_generate_run::output::DeliveryDiscountCandidate {
                    targets: vec![cart_delivery_options_discounts_generate_run::output::DeliveryDiscountCandidateTarget::DeliveryGroup(
                        cart_delivery_options_discounts_generate_run::output::DeliveryGroupTarget {
                            id: first_delivery_group.id.clone(),
                        },
                    )],
                    value: cart_delivery_options_discounts_generate_run::output::DeliveryDiscountCandidateValue::Percentage(cart_delivery_options_discounts_generate_run::output::Percentage {
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
    Ok(cart_delivery_options_discounts_generate_run::output::CartDeliveryOptionsDiscountsGenerateRunResult { operations })
}
// [END discount-function.run.delivery]
