
// [START discount-function.cart.run]
use shopify_function::prelude::*;
use shopify_function::Result;
use serde_json::Value;

use cart_run::output::{
    CartLineTarget, CartOperation, FunctionCartRunResult, OrderDiscountCandidate,
    OrderDiscountCandidateTarget, OrderDiscountCandidateValue, OrderDiscountSelectionStrategy,
    OrderDiscounts, OrderSubtotalTarget, Percentage, ProductDiscountCandidate,
    ProductDiscountCandidateTarget, ProductDiscountCandidateValue,
    ProductDiscountSelectionStrategy, ProductDiscounts,
};

use cart_run::input::ResponseData;

#[shopify_function_target(
    target = "cart_run",
    query_path = "src/generate_cart_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_cart_run(input: ResponseData) -> Result<FunctionCartRunResult> {
    let fetch_result = input.fetch_result
        .ok_or("Missing fetch result")?;
    let body = fetch_result.body
        .ok_or("Missing response body")?;

    // Parse the response body as JSON
    let response_body: Value = serde_json::from_str(&body)
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    // Extract operations from the response
    let operations = if let Some(ops) = response_body.get("operations") {
        let mut cart_operations = Vec::new();

        if let Some(product_discounts) = ops.get("addProductDiscounts") {
            if let Some(candidates) = product_discounts.get("candidates") {
                let empty_vec = Vec::new();
                let candidates = candidates.as_array().unwrap_or(&empty_vec);
                let mut product_discount_candidates = Vec::new();

                for candidate in candidates {
                    if let (Some(targets), Some(value), Some(message)) = (
                        candidate.get("targets"),
                        candidate.get("value"),
                        candidate.get("message"),
                    ) {
                        let empty_line_ids = Vec::new();
                        let cart_line_ids = targets["cartLineIds"].as_array().unwrap_or(&empty_line_ids);

                        for cart_line_id in cart_line_ids {
                            let percentage = value
                                .get("percentage")
                                .and_then(|p| p.get("value"))
                                .and_then(|v| v.as_f64())
                                .unwrap_or(0.0);

                            product_discount_candidates.push(ProductDiscountCandidate {
                                targets: vec![ProductDiscountCandidateTarget::CartLine(CartLineTarget {
                                    id: cart_line_id.as_str().unwrap_or("").to_string(),
                                    quantity: None,
                                })],
                                message: Some(message.as_str().unwrap_or("").to_string()),
                                value: ProductDiscountCandidateValue::Percentage(Percentage {
                                    value: Decimal(percentage),
                                }),
                                associated_discount_code: None,
                            });
                        }
                    }
                }

                if !product_discount_candidates.is_empty() {
                    cart_operations.push(CartOperation::AddProductDiscounts(ProductDiscounts {
                        selection_strategy: ProductDiscountSelectionStrategy::FIRST,
                        candidates: product_discount_candidates,
                    }));
                }
            }
        }

        // Handle order discounts
        if let Some(order_discounts) = ops.get("addOrderDiscounts") {
            if let Some(candidates) = order_discounts.get("candidates") {
                let empty_vec = Vec::new();
                let candidates = candidates.as_array().unwrap_or(&empty_vec);
                let mut order_discount_candidates = Vec::new();

                for candidate in candidates {
                    if let (Some(_targets), Some(value), Some(message)) = (
                        candidate.get("targets"),
                        candidate.get("value"),
                        candidate.get("message"),
                    ) {
                        let percentage = value
                            .get("percentage")
                            .and_then(|p| p.get("value"))
                            .and_then(|v| v.as_f64())
                            .unwrap_or(0.0);

                        order_discount_candidates.push(OrderDiscountCandidate {
                            targets: vec![OrderDiscountCandidateTarget::OrderSubtotal(
                                OrderSubtotalTarget {
                                    excluded_variant_ids: vec![],
                                },
                            )],
                            message: Some(message.as_str().unwrap_or("").to_string()),
                            value: OrderDiscountCandidateValue::Percentage(Percentage {
                                value: Decimal(percentage),
                            }),
                            conditions: None,
                            associated_discount_code: None,
                        });
                    }
                }

                if !order_discount_candidates.is_empty() {
                    cart_operations.push(CartOperation::AddOrderDiscounts(OrderDiscounts {
                        selection_strategy: OrderDiscountSelectionStrategy::FIRST,
                        candidates: order_discount_candidates,
                    }));
                }
            }
        }

        cart_operations
    } else {
        Vec::new()
    };

    Ok(FunctionCartRunResult { operations })
}
// [END discount-function.run.cart]
