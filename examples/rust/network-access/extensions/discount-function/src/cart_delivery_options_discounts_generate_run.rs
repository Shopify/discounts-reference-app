// [START discount-function.delivery.run]
use super::schema;
use shopify_function::prelude::*;
use shopify_function::Result;
#[derive(Deserialize)]
#[shopify_function(rename_all = "camelCase")]
pub struct OperationItem {
    delivery_discounts_add: Option<schema::DeliveryDiscountsAddOperation>,
    entered_discount_codes_accept: Option<schema::EnteredDiscountCodesAcceptOperation>,
}
pub type JsonBody = Vec<OperationItem>;

#[shopify_function]
fn cart_delivery_options_discounts_generate_run(
    input: schema::cart_delivery_options_discounts_generate_run::Input,
) -> Result<schema::CartDeliveryOptionsDiscountsGenerateRunResult> {
    // [START discount-function.delivery.run.body]
    let fetch_result = input.fetch_result().ok_or("Missing fetch result")?;
    let discount_classes = &input.discount().discount_classes();

    // Check if shipping discount class is set
    let has_shipping_discount_class = discount_classes.contains(&schema::DiscountClass::Shipping);

    // If shipping discount class is not set, return empty operations
    if !has_shipping_discount_class {
        return Ok(schema::CartDeliveryOptionsDiscountsGenerateRunResult { operations: vec![] });
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
            operations.push(schema::DeliveryOperation::EnteredDiscountCodesAccept(
                validations.clone(),
            ));
        }

        // Include delivery discounts (shipping discount class is already verified)
        if let Some(delivery_discounts_add_operation) = &item.delivery_discounts_add {
            operations.push(schema::DeliveryOperation::DeliveryDiscountsAdd(
                delivery_discounts_add_operation.clone(),
            ));
        }
        // Ignore cart/order discounts for delivery operations
    }

    Ok(schema::CartDeliveryOptionsDiscountsGenerateRunResult { operations })
    // [END discount-function.delivery.run.body]
}
// [END discount-function.delivery.run]
