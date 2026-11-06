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

    // Discount only the groups with shipping options.
    let targets: Vec<schema::DeliveryDiscountCandidateTarget> = input
        .cart()
        .delivery_groups()
        .iter()
        // If you also want to apply a discount for other delivery methods (e.g. LOCAL), ensure to account for that here.
        .filter(|group| {
            group.delivery_options().iter().any(|option| {
                matches!(
                    option.delivery_method_type(),
                    schema::DeliveryMethod::Shipping
                )
            })
        })
        .map(|group| {
            schema::DeliveryDiscountCandidateTarget::DeliveryGroup(schema::DeliveryGroupTarget {
                id: group.id().clone(),
            })
        })
        .collect();

    // Only add delivery discount if the percentage is set and the cart has a shipping group
    if discount_configuration.delivery_percentage > 0.0 && !targets.is_empty() {
        operations.push(schema::DeliveryOperation::DeliveryDiscountsAdd(
            schema::DeliveryDiscountsAddOperation {
                selection_strategy: schema::DeliveryDiscountSelectionStrategy::All,
                candidates: vec![schema::DeliveryDiscountCandidate {
                    targets,
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
