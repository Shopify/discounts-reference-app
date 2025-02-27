
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_run::output::{
    CartLineTarget, CartOperation, FunctionCartRunResult, OrderDiscountCandidate,
    OrderDiscountCandidateTarget, OrderDiscountCandidateValue, OrderDiscountSelectionStrategy,
    OrderDiscounts, OrderSubtotalTarget, Percentage, ProductDiscountCandidate,
    ProductDiscountCandidateTarget, ProductDiscountCandidateValue,
    ProductDiscountSelectionStrategy, ProductDiscounts,
};

use cart_run::input::ResponseData;

// [START discount-function.run.cart]
#[shopify_function_target(
    target = "cart_run",
    query_path = "src/generate_cart_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_cart_run(input: ResponseData) -> Result<FunctionCartRunResult> {
    let cart_lines = input.cart.lines.iter();
    Ok(FunctionCartRunResult {
        operations: vec![
            CartOperation::AddOrderDiscounts(OrderDiscounts {
                selection_strategy: OrderDiscountSelectionStrategy::FIRST,
                candidates: vec![OrderDiscountCandidate {
                    targets: vec![OrderDiscountCandidateTarget::OrderSubtotal(
                        OrderSubtotalTarget {
                            excluded_variant_ids: vec![],
                        },
                    )],
                    message: Some("10% OFF ORDER".to_string()),
                    value: OrderDiscountCandidateValue::Percentage(Percentage {
                        value: Decimal(10.0),
                    }),
                    conditions: None,
                    associated_discount_code: None,
                }],
            }),
            CartOperation::AddProductDiscounts(ProductDiscounts {
                selection_strategy: ProductDiscountSelectionStrategy::FIRST,
                candidates: cart_lines
                    .map(|cart_line| ProductDiscountCandidate {
                        targets: vec![ProductDiscountCandidateTarget::CartLine(CartLineTarget {
                            id: cart_line.id.clone(),
                            quantity: None,
                        })],
                        message: Some("20% OFF PRODUCT".to_string()),
                        value: ProductDiscountCandidateValue::Percentage(Percentage {
                            value: Decimal(20.0),
                        }),
                        associated_discount_code: None,
                    })
                    .collect(),
            }),
        ],
    })
}
// [END discount-function.run.cart]
