use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct DiscountConfiguration {
    cart_line_percentage: f64,
    order_percentage: f64,
    collection_ids: Vec<String>,
}

// [START discount-function.run.cart]
#[shopify_function_target(
    query_path = "src/cart_lines_discounts_generate_run.graphql",
    schema_path = "schema.graphql"
)]
fn cart_lines_discounts_generate_run(
    input: cart_lines_discounts_generate_run::input::ResponseData,
) -> Result<cart_lines_discounts_generate_run::output::CartLinesDiscountsGenerateRunResult> {
    // [START discount-function.run.cart.parse-metafield]
    let discount_configuration = serde_json::from_str::<DiscountConfiguration>(
        &input
            .discount
            .metafield
            .ok_or("No metafield provided")?
            .value,
    )?;
    // [END discount-function.run.cart.parse-metafield]
    // [START discount-function.run.cart.add-operations]
    let has_order_discount_class = input
        .discount
        .discount_classes
        .contains(&cart_lines_discounts_generate_run::input::DiscountClass::ORDER);
    let has_product_discount_class = input
        .discount
        .discount_classes
        .contains(&cart_lines_discounts_generate_run::input::DiscountClass::PRODUCT);

    if !has_order_discount_class && !has_product_discount_class {
        return Ok(
            cart_lines_discounts_generate_run::output::CartLinesDiscountsGenerateRunResult {
                operations: vec![],
            },
        );
    }

    let mut operations = vec![];

    // Add product discounts first if available and allowed
    if has_product_discount_class && discount_configuration.cart_line_percentage > 0.0 {
        let mut cart_line_targets = vec![];
        for line in &input.cart.lines {
            // [START discount-function.run.cart.product.in_any_collection]
            if let cart_lines_discounts_generate_run::input::InputCartLinesMerchandise::ProductVariant(variant) = &line.merchandise {
                if variant.product.in_any_collection
                    || discount_configuration.collection_ids.is_empty()
                {
                    cart_line_targets.push(cart_lines_discounts_generate_run::output::ProductDiscountCandidateTarget::CartLine(
                        cart_lines_discounts_generate_run::output::CartLineTarget {
                            id: line.id.clone(),
                            quantity: None,
                        },
                    ));
                }
            }
            // [END discount-function.run.cart.product.in_any_collection]
        }

        if !cart_line_targets.is_empty() {
            operations.push(cart_lines_discounts_generate_run::output::CartOperation::ProductDiscountsAdd(
                cart_lines_discounts_generate_run::output::ProductDiscountsAddOperation {
                    selection_strategy: cart_lines_discounts_generate_run::output::ProductDiscountSelectionStrategy::FIRST,
                    candidates: vec![cart_lines_discounts_generate_run::output::ProductDiscountCandidate {
                        targets: cart_line_targets,
                        message: Some(format!(
                            "{}% OFF PRODUCT",
                            discount_configuration.cart_line_percentage
                        )),
                        value: cart_lines_discounts_generate_run::output::ProductDiscountCandidateValue::Percentage(cart_lines_discounts_generate_run::output::Percentage {
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
        operations.push(cart_lines_discounts_generate_run::output::CartOperation::OrderDiscountsAdd(
            cart_lines_discounts_generate_run::output::OrderDiscountsAddOperation {
                selection_strategy: cart_lines_discounts_generate_run::output::OrderDiscountSelectionStrategy::FIRST,
                candidates: vec![cart_lines_discounts_generate_run::output::OrderDiscountCandidate {
                    targets: vec![cart_lines_discounts_generate_run::output::OrderDiscountCandidateTarget::OrderSubtotal(
                        cart_lines_discounts_generate_run::output::OrderSubtotalTarget {
                            excluded_cart_line_ids: vec![],
                        },
                    )],
                    message: Some(format!(
                        "{}% OFF ORDER",
                        discount_configuration.order_percentage
                    )),
                    value: cart_lines_discounts_generate_run::output::OrderDiscountCandidateValue::Percentage(cart_lines_discounts_generate_run::output::Percentage {
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
        cart_lines_discounts_generate_run::output::CartLinesDiscountsGenerateRunResult {
            operations,
        },
    )
}
// [END discount_function.run.cart]
