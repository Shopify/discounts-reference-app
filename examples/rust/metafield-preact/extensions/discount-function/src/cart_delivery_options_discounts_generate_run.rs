use super::schema;
use shopify_function::prelude::*;
use shopify_function::Result;

#[derive(Deserialize)]
#[shopify_function(rename_all = "camelCase")]
pub struct DiscountConfiguration {
    delivery_percentage: f64,
}

// [START discount-function.run.delivery]
#[shopify_function]
fn cart_delivery_options_discounts_generate_run(
    input: schema::cart_delivery_options_discounts_generate_run::Input,
) -> Result<schema::CartDeliveryOptionsDiscountsGenerateRunResult> {
    let first_delivery_group = input
        .cart()
        .delivery_groups()
        .first()
        .ok_or("No delivery groups found")?;

    // [START discount-function.run.delivery.parse-metafield]
    let discount_configuration = match input.discount().metafield() {
        Some(metafield) => metafield.json_value(),
        None => return Err("No metafield provided".into()),
    };
    // [END discount-function.run.delivery.parse-metafield]
    // [START discount-function.run.delivery.add-operations]

    let has_shipping_discount_class = input
        .discount()
        .discount_classes()
        .contains(&schema::DiscountClass::Shipping);

    if !has_shipping_discount_class {
        return Ok(schema::CartDeliveryOptionsDiscountsGenerateRunResult { operations: vec![] });
    }

    let mut operations = vec![];

    // Only add delivery discount if both the class is allowed and percentage is set
    if discount_configuration.delivery_percentage > 0.0 {
        operations.push(schema::DeliveryOperation::DeliveryDiscountsAdd(
            schema::DeliveryDiscountsAddOperation {
                selection_strategy: schema::DeliveryDiscountSelectionStrategy::All,
                candidates: vec![schema::DeliveryDiscountCandidate {
                    targets: vec![schema::DeliveryDiscountCandidateTarget::DeliveryGroup(
                        schema::DeliveryGroupTarget {
                            id: first_delivery_group.id().clone(),
                        },
                    )],
                    value: schema::DeliveryDiscountCandidateValue::Percentage(schema::Percentage {
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
    Ok(schema::CartDeliveryOptionsDiscountsGenerateRunResult { operations })
}
// [END discount-function.run.delivery]
