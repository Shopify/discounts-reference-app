// [START discount-function.cart.run]
use super::schema;
use shopify_function::prelude::*;
use shopify_function::Result;

#[derive(Deserialize)]
#[shopify_function(rename_all = "camelCase")]
pub struct OperationItem {
    product_discounts_add: Option<schema::ProductDiscountsAddOperation>,
    order_discounts_add: Option<schema::OrderDiscountsAddOperation>,
    entered_discount_codes_accept: Option<schema::EnteredDiscountCodesAcceptOperation>,
}
pub type JsonBody = Vec<OperationItem>;

#[shopify_function]
fn cart_lines_discounts_generate_run(
    input: schema::cart_lines_discounts_generate_run::Input,
) -> Result<schema::CartLinesDiscountsGenerateRunResult> {
    // [START discount-function.cart.run.body]
    let fetch_result = input.fetch_result().ok_or("Missing fetch result")?;
    let discount_classes = &input.discount().discount_classes();

    // Check if relevant discount classes are set
    let has_order_discount_class = discount_classes.contains(&schema::DiscountClass::Order);
    let has_product_discount_class = discount_classes.contains(&schema::DiscountClass::Product);

    // If no relevant discount class is set, return empty operations
    if !has_order_discount_class && !has_product_discount_class {
        return Ok(schema::CartLinesDiscountsGenerateRunResult { operations: vec![] });
    }

    // Use jsonBody which is the only available property
    let operation_items = fetch_result
        .json_body()
        .ok_or("Missing json_body in response")?;

    // Convert the response into operations
    let mut operations = Vec::new();

    // Process each operation item
    for item in operation_items {
        // Always include discount code operations
        if let Some(validations) = &item.entered_discount_codes_accept {
            operations.push(schema::CartOperation::EnteredDiscountCodesAccept(
                validations.clone(),
            ));
        }

        // Include product discounts only if that class is set
        if has_product_discount_class {
            if let Some(product_discounts_add_operation) = &item.product_discounts_add {
                operations.push(schema::CartOperation::ProductDiscountsAdd(
                    product_discounts_add_operation.clone(),
                ));
            }
        }

        // Include order discounts only if that class is set
        if has_order_discount_class {
            if let Some(order_discounts_add_operation) = &item.order_discounts_add {
                operations.push(schema::CartOperation::OrderDiscountsAdd(
                    order_discounts_add_operation.clone(),
                ));
            }
        }
        // Ignore delivery discounts for cart operations
    }

    Ok(schema::CartLinesDiscountsGenerateRunResult { operations })
    // [END discount-function.cart.run.body]
}
// [END discount-function.cart.run]

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;
    use shopify_function::run_function_with_input;

    #[test]
    fn processes_discount_codes_with_product_and_order_classes() -> Result<()> {
        let input = json!({
            "cart": {
                "lines": []
            },
            "discount": {
                "discountClasses": ["PRODUCT", "ORDER"]
            },
            "fetchResult": {
                "status": 200,
                "jsonBody": [
                    {
                        "enteredDiscountCodesAccept": {
                            "codes": [
                                {"code": "SUMMER10"}
                            ]
                        }
                    },
                    {
                        "productDiscountsAdd": {
                            "selectionStrategy": "FIRST",
                            "candidates": [
                                {
                                    "value": {
                                        "percentage": {
                                            "value": "0.1"
                                        }
                                    },
                                    "targets": [
                                        {
                                            "cartLine": {
                                                "id": "gid://shopify/CartLine/123"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        "orderDiscountsAdd": {
                            "selectionStrategy": "MAXIMUM",
                            "candidates": [
                                {
                                    "value": {
                                        "percentage": {
                                            "value": "0.15"
                                        }
                                    },
                                    "targets": [
                                        {
                                            "orderSubtotal": {
                                                "excludedCartLineIds": []
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        })
        .to_string();

        let result = run_function_with_input(cart_lines_discounts_generate_run, &input)?;

        // We should have 3 operations: discount codes, product discounts, and order discounts
        assert_eq!(result.operations.len(), 3);

        // First operation should be EnteredDiscountCodesAccept
        match &result.operations[0] {
            schema::CartOperation::EnteredDiscountCodesAccept(op) => {
                assert_eq!(op.codes.len(), 1);
                assert_eq!(op.codes[0].code, "SUMMER10");
            }
            _ => panic!("Expected EnteredDiscountCodesAccept operation"),
        }

        // Second operation should be ProductDiscountsAdd
        match &result.operations[1] {
            schema::CartOperation::ProductDiscountsAdd(op) => {
                assert_eq!(
                    op.selection_strategy,
                    schema::ProductDiscountSelectionStrategy::First
                );
                assert_eq!(op.candidates.len(), 1);

                let candidate = &op.candidates[0];
                match &candidate.value {
                    schema::ProductDiscountCandidateValue::Percentage(pct) => {
                        assert_eq!(pct.value, Decimal::from(0.1));
                    }
                    _ => panic!("Expected Percentage value"),
                }

                assert_eq!(candidate.targets.len(), 1);
                match &candidate.targets[0] {
                    schema::ProductDiscountCandidateTarget::CartLine(target) => {
                        assert_eq!(target.id, "gid://shopify/CartLine/123");
                    }
                }
            }
            _ => panic!("Expected ProductDiscountsAdd operation"),
        }

        // Third operation should be OrderDiscountsAdd
        match &result.operations[2] {
            schema::CartOperation::OrderDiscountsAdd(op) => {
                assert_eq!(
                    op.selection_strategy,
                    schema::OrderDiscountSelectionStrategy::Maximum
                );
                assert_eq!(op.candidates.len(), 1);

                let candidate = &op.candidates[0];
                match &candidate.value {
                    schema::OrderDiscountCandidateValue::Percentage(pct) => {
                        assert_eq!(pct.value, Decimal::from(0.15));
                    }
                    _ => panic!("Expected Percentage value"),
                }

                assert_eq!(candidate.targets.len(), 1);
                match &candidate.targets[0] {
                    schema::OrderDiscountCandidateTarget::OrderSubtotal(target) => {
                        assert_eq!(target.excluded_cart_line_ids.len(), 0);
                    }
                }
            }
            _ => panic!("Expected OrderDiscountsAdd operation"),
        }

        Ok(())
    }

    #[test]
    fn filters_operations_based_on_discount_classes() -> Result<()> {
        // Only PRODUCT class is enabled, so ORDER discounts should be ignored
        let input = json!({
            "cart": {
                "lines": []
            },
            "discount": {
                "discountClasses": ["PRODUCT"]
            },
            "fetchResult": {
                "status": 200,
                "jsonBody": [
                    {
                        "productDiscountsAdd": {
                            "selectionStrategy": "FIRST",
                            "candidates": [
                                {
                                    "value": {
                                        "percentage": {
                                            "value": "0.1"
                                        }
                                    },
                                    "targets": [
                                        {
                                            "cartLine": {
                                                "id": "gid://shopify/CartLine/123"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        "orderDiscountsAdd": {
                            "selectionStrategy": "MAXIMUM",
                            "candidates": [
                                {
                                    "value": {
                                        "percentage": {
                                            "value": "0.15"
                                        }
                                    },
                                    "targets": [
                                        {
                                            "orderSubtotal": {
                                                "excludedCartLineIds": []
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        })
        .to_string();

        let result = run_function_with_input(cart_lines_discounts_generate_run, &input)?;

        // Should only include product discounts and filter out order discounts
        assert_eq!(
            result.operations.len(),
            1,
            "Should only have one operation (product discounts)"
        );

        // The operation should be ProductDiscountsAdd
        match &result.operations[0] {
            schema::CartOperation::ProductDiscountsAdd(op) => {
                assert_eq!(
                    op.selection_strategy,
                    schema::ProductDiscountSelectionStrategy::First
                );
                assert_eq!(op.candidates.len(), 1);

                let candidate = &op.candidates[0];
                match &candidate.value {
                    schema::ProductDiscountCandidateValue::Percentage(pct) => {
                        assert_eq!(pct.value, Decimal::from(0.1));
                    }
                    _ => panic!("Expected Percentage value"),
                }

                assert_eq!(candidate.targets.len(), 1);
                match &candidate.targets[0] {
                    schema::ProductDiscountCandidateTarget::CartLine(target) => {
                        assert_eq!(target.id, "gid://shopify/CartLine/123");
                    }
                }
            }
            _ => panic!("Expected ProductDiscountsAdd operation"),
        }

        Ok(())
    }

    #[test]
    fn returns_empty_operations_with_no_relevant_discount_classes() -> Result<()> {
        // Only DELIVERY class is set, which isn't relevant for cart operations
        let input = json!({
            "cart": {
                "lines": []
            },
            "discount": {
                "discountClasses": ["DELIVERY"]
            },
            "fetchResult": {
                "status": 200,
                "jsonBody": [
                    {
                        "productDiscountsAdd": {
                            "selectionStrategy": "FIRST",
                            "candidates": [
                                {
                                    "value": {
                                        "percentage": {
                                            "value": "0.1"
                                        }
                                    },
                                    "targets": [
                                        {
                                            "cartLine": {
                                                "id": "gid://shopify/CartLine/123"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        })
        .to_string();

        let result = run_function_with_input(cart_lines_discounts_generate_run, &input)?;

        // Should return empty operations since no relevant discount class is set
        assert_eq!(
            result.operations.len(),
            0,
            "Should have no operations when no relevant discount classes are set"
        );

        Ok(())
    }

    #[test]
    fn always_includes_discount_code_operations() -> Result<()> {
        // Only ORDER class is set, but discount code operations should still be included
        let input = json!({
            "cart": {
                "lines": []
            },
            "discount": {
                "discountClasses": ["ORDER"]
            },
            "fetchResult": {
                "status": 200,
                "jsonBody": [
                    {
                        "enteredDiscountCodesAccept": {
                            "codes": [
                                {"code": "SAVE20"}
                            ]
                        }
                    },
                    {
                        "productDiscountsAdd": {
                            "selectionStrategy": "FIRST",
                            "candidates": [
                                {
                                    "value": {
                                        "percentage": {
                                            "value": "0.1"
                                        }
                                    },
                                    "targets": [
                                        {
                                            "cartLine": {
                                                "id": "gid://shopify/CartLine/123"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        })
        .to_string();

        let result = run_function_with_input(cart_lines_discounts_generate_run, &input)?;

        // Should only include discount codes and filter out product discounts
        assert_eq!(
            result.operations.len(),
            1,
            "Should only have one operation (discount codes)"
        );

        // The operation should be EnteredDiscountCodesAccept
        match &result.operations[0] {
            schema::CartOperation::EnteredDiscountCodesAccept(op) => {
                assert_eq!(op.codes.len(), 1);
                assert_eq!(op.codes[0].code, "SAVE20");
            }
            _ => panic!("Expected EnteredDiscountCodesAccept operation"),
        }

        // Make sure we don't have any product discount operations
        assert!(
            !result
                .operations
                .iter()
                .any(|op| matches!(op, schema::CartOperation::ProductDiscountsAdd(_))),
            "Should not have ProductDiscountsAdd operations when PRODUCT class is not set"
        );

        Ok(())
    }
}
