// [START discount-function.delivery.run]
use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_delivery_options_discounts_generate_run::output::{
    DeliveryDiscountsAddOperation, DeliveryOperation, CartDeliveryOptionsDiscountsGenerateRunResult, EnteredDiscountCodesAcceptOperation,
};

use cart_delivery_options_discounts_generate_run::input::{ResponseData, DiscountClass};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct OperationItem {
    #[serde(default)]
    delivery_discounts_add: Option<DeliveryDiscountsAddOperation>,
    #[serde(default)]
    entered_discount_codes_accept: Option<EnteredDiscountCodesAcceptOperation>,
    // Ignore any other fields we don't need
    #[serde(flatten)]
    _other: std::collections::HashMap<String, serde_json::Value>,
}

#[shopify_function_target(
    target = "cartDeliveryOptionsDiscountsGenerateRun",
    query_path = "src/generate_delivery_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_delivery_run(input: ResponseData) -> Result<CartDeliveryOptionsDiscountsGenerateRunResult> {
    // [START discount-function.delivery.run.body]
    let fetch_result = input.fetch_result.ok_or("Missing fetch result")?;
    let discount_classes = &input.discount.discount_classes;

    // Check if shipping discount class is set
    let has_shipping_discount_class = discount_classes.contains(&DiscountClass::SHIPPING);

    // If shipping discount class is not set, return empty operations
    if !has_shipping_discount_class {
        return Ok(CartDeliveryOptionsDiscountsGenerateRunResult { operations: vec![] });
    }

    // Use jsonBody which is the only available property
    let json_body = fetch_result
        .json_body
        .ok_or("Missing json_body in response")?;

    // Parse using the JSON value
    let operation_items = serde_json::from_value::<Vec<OperationItem>>(json_body)
        .map_err(|e| format!("Failed to convert jsonBody: {}", e))?;

    // Convert the response into operations
    let mut operations = Vec::new();

    // Process each operation item
    for item in operation_items {
        // Always include discount code operations
        if let Some(validations) = item.entered_discount_codes_accept {
            operations.push(DeliveryOperation::EnteredDiscountCodesAccept(validations));
        }

        // Include delivery discounts (shipping discount class is already verified)
        if let Some(delivery_discounts_add_operation) = item.delivery_discounts_add {
            operations.push(DeliveryOperation::DeliveryDiscountsAdd(delivery_discounts_add_operation));
        }
        // Ignore cart/order discounts for delivery operations
    }

    Ok(CartDeliveryOptionsDiscountsGenerateRunResult { operations })
    // [END discount-function.delivery.run.body]
}
// [END discount-function.delivery.run]
