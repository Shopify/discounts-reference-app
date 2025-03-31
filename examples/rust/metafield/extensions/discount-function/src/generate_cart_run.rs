use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_lines_discounts_generate_run::output::{
    CartLineTarget, CartLinesDiscountsGenerateRunResult, CartOperation, OrderDiscountCandidate,
    OrderDiscountCandidateTarget, OrderDiscountCandidateValue, OrderDiscountSelectionStrategy,
    OrderDiscountsAddOperation, OrderSubtotalTarget, Percentage, ProductDiscountCandidate,
    ProductDiscountCandidateTarget, ProductDiscountCandidateValue,
    ProductDiscountSelectionStrategy, ProductDiscountsAddOperation,
};

use cart_lines_discounts_generate_run::input::{
    InputCartLinesMerchandise::ProductVariant, ResponseData,
};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct DiscountConfiguration {
    cart_line_percentage: f64,
    order_percentage: f64,
    collection_ids: Vec<String>,
}

// [START discount-function.run.cart]
#[shopify_function_target(
    target = "cartLinesDiscountsGenerateRun",
    query_path = "src/generate_cart_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_cart_run(input: ResponseData) -> Result<CartLinesDiscountsGenerateRunResult> {
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
    let mut operations = vec![];
    if discount_configuration.order_percentage > 0.0 {
        operations.push(CartOperation::OrderDiscountsAdd(
            OrderDiscountsAddOperation {
                selection_strategy: OrderDiscountSelectionStrategy::FIRST,
                candidates: vec![OrderDiscountCandidate {
                    targets: vec![OrderDiscountCandidateTarget::OrderSubtotal(
                        OrderSubtotalTarget {
                            excluded_cart_line_ids: vec![],
                        },
                    )],
                    message: Some(format!(
                        "{}% OFF ORDER",
                        discount_configuration.order_percentage
                    )),
                    value: OrderDiscountCandidateValue::Percentage(Percentage {
                        value: Decimal(discount_configuration.order_percentage),
                    }),
                    conditions: None,
                    associated_discount_code: None,
                }],
            },
        ));
    }

    if discount_configuration.cart_line_percentage > 0.0 {
        let mut cart_line_targets = vec![];
        for line in &input.cart.lines {
            // [START discount-function.run.cart.product.in_any_collection]
            if let ProductVariant(variant) = &line.merchandise {
                if variant.product.in_any_collection
                    || discount_configuration.collection_ids.is_empty()
                {
                    cart_line_targets.push(ProductDiscountCandidateTarget::CartLine(
                        CartLineTarget {
                            id: line.id.clone(),
                            quantity: None,
                        },
                    ));
                }
            }
            // [END discount-function.run.cart.product.in_any_collection]
        }

        if !cart_line_targets.is_empty() {
            operations.push(CartOperation::ProductDiscountsAdd(
                ProductDiscountsAddOperation {
                    selection_strategy: ProductDiscountSelectionStrategy::FIRST,
                    candidates: vec![ProductDiscountCandidate {
                        targets: cart_line_targets,
                        message: Some(format!(
                            "{}% OFF PRODUCT",
                            discount_configuration.cart_line_percentage
                        )),
                        value: ProductDiscountCandidateValue::Percentage(Percentage {
                            value: Decimal(discount_configuration.cart_line_percentage),
                        }),
                        associated_discount_code: None,
                    }],
                },
            ));
        }
    }
    // [END discount-function.run.cart.add-operations]
    Ok(CartLinesDiscountsGenerateRunResult {
        operations: operations,
    })
}
// [END discount_function.run.cart]
