use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;
use super::schema;
use crate::schema::DiscountClass;
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct DiscountConfiguration {
    cart_line_percentage: f64,
    order_percentage: f64,
    collection_ids: Vec<String>,
}

// [START discount-function.run.cart]
#[shopify_function]
fn cart_lines_discounts_generate_run(
    input: schema::cart_lines_discounts_generate_run::Input,
) -> Result<schema::CartLinesDiscountsGenerateRunResult> {
    // [START discount-function.run.cart.parse-metafield]
    let discount_configuration = serde_json::from_str::<DiscountConfiguration>(
        &input
            .discount()
            .metafield()
            .ok_or("No metafield provided")?
            .value(),
    )?;
    // [END discount-function.run.cart.parse-metafield]
    // [START discount-function.run.cart.add-operations]
    let has_order_discount_class = input
        .discount()
        .discount_classes()
        .contains(&DiscountClass::Order);
    let has_product_discount_class = input
        .discount()
        .discount_classes()
        .contains(&DiscountClass::Product);

    if !has_order_discount_class && !has_product_discount_class {
        return Ok(
            schema::CartLinesDiscountsGenerateRunResult {
                operations: vec![],
            },
        );
    }

    let mut operations = vec![];

    // Add product discounts first if available and allowed
    if has_product_discount_class && discount_configuration.cart_line_percentage > 0.0 {
        let mut cart_line_targets = vec![];
        for line in input.cart().lines() {
            // [START discount-function.run.cart.product.in_any_collection]
            if let schema::cart_lines_discounts_generate_run::input::cart::lines::Merchandise::ProductVariant(variant) = &line.merchandise() {
                if *variant.product().in_any_collection()
                    || discount_configuration.collection_ids.is_empty()
                {
                    cart_line_targets.push(schema::ProductDiscountCandidateTarget::CartLine(
                        schema::CartLineTarget {
                            id: line.id().clone(),
                            quantity: None,
                        },
                    ));
                }
            }
            // [END discount-function.run.cart.product.in_any_collection]
        }

        if !cart_line_targets.is_empty() {
            operations.push(schema::CartOperation::ProductDiscountsAdd(
                schema::ProductDiscountsAddOperation {
                    selection_strategy: schema::ProductDiscountSelectionStrategy::First,
                    candidates: vec![schema::ProductDiscountCandidate {
                        targets: cart_line_targets,
                        message: Some(format!(
                            "{}% OFF PRODUCT",
                            discount_configuration.cart_line_percentage
                        )),
                        value: schema::ProductDiscountCandidateValue::Percentage(schema::Percentage {
                            value: Decimal(discount_configuration.cart_line_percentage),
                        }),
                        associated_discount_code: None,
                    }],
                },
            ));
        }
    }

    // Then add order discounts if available and allowed
    if has_order_discount_class && discount_configuration.order_percentage > 0.0 {
        operations.push(schema::CartOperation::OrderDiscountsAdd(
            schema::OrderDiscountsAddOperation {
                selection_strategy: schema::OrderDiscountSelectionStrategy::First,
                candidates: vec![schema::OrderDiscountCandidate {
                    targets: vec![schema::OrderDiscountCandidateTarget::OrderSubtotal(
                        schema::OrderSubtotalTarget {
                            excluded_cart_line_ids: vec![],
                        },
                    )],
                    message: Some(format!(
                        "{}% OFF ORDER",
                        discount_configuration.order_percentage
                    )),
                    value: schema::OrderDiscountCandidateValue::Percentage(schema::Percentage {
                        value: Decimal(discount_configuration.order_percentage),
                    }),
                    conditions: None,
                    associated_discount_code: None,
                }],
            },
        ));
    }
    // [END discount-function.run.cart.add-operations]
    Ok(
        schema::CartLinesDiscountsGenerateRunResult {
            operations,
        },
    )
}
// [END discount_function.run.cart]