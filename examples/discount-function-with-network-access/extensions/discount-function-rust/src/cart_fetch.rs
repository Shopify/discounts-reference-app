// [START discount-function.cart_fetch]
use anyhow::{Context, Result};
use serde::Deserialize;
use shopify_function;
use shopify_function::prelude::*;

type JSON = serde_json::Value;
use serde_json::json;

use cart_fetch::input::{
    InputDiscountNodeMetafield as CartFetchInputDiscountNodeMetafield,
    ResponseData as CartFetchResponseData,
};
use cart_fetch::output::{FunctionCartFetchResult, HttpRequest as CartFetchHttpRequest};
use delivery_fetch::input::{
    InputDiscountNodeMetafield as DeliveryFetchInputDiscountNodeMetafield,
    ResponseData as DeliveryFetchResponseData,
};
use delivery_fetch::output::{
    FunctionDeliveryFetchResult, HttpRequest as DeliveryFetchHttpRequest,
};
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct MetafieldConfigCart {
    request: CartFetchHttpRequest,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct MetafieldConfigDelivery {
    request: DeliveryFetchHttpRequest,
}

#[shopify_function_target(
    query_path = "src/fetch.graphql",
    schema_path = "schema.graphql",
    target = "cart_fetch"
)]
fn cart_fetch(input: CartFetchResponseData) -> shopify_function::Result<FunctionCartFetchResult> {
    let entered_discount_codes = &input.entered_discount_codes;
    let mut request = serde_json::from_str::<MetafieldConfigCart>(
        &configuration_cart_metafield_fetch(&input)?.value,
    )
    .context("Failed to parse metafield configuration")?
    .request;

    let json_body = json!({ "body": { "enteredDiscountCodes": entered_discount_codes } });
    request.json_body = Some(json_body.clone());
    request.body = Some(json_body.to_string());

    Ok(FunctionCartFetchResult {
        request: Some(request),
    })
}

fn configuration_cart_metafield_fetch(
    response_data: &CartFetchResponseData,
) -> Result<&CartFetchInputDiscountNodeMetafield> {
    response_data
        .discount_node
        .metafield
        .as_ref()
        .context("No configuration metafield found.")
}

#[shopify_function_target(
    query_path = "src/fetch.graphql",
    schema_path = "schema.graphql",
    target = "delivery_fetch"
)]
fn delivery_fetch(
    input: DeliveryFetchResponseData,
) -> shopify_function::Result<FunctionDeliveryFetchResult> {
    let entered_discount_codes = &input.entered_discount_codes;
    let mut request = serde_json::from_str::<MetafieldConfigDelivery>(
        &configuration_delivery_metafield_fetch(&input)?.value,
    )
    .context("Failed to parse metafield configuration")?
    .request;

    let json_body = json!({ "body": { "enteredDiscountCodes": entered_discount_codes } });
    request.json_body = Some(json_body.clone());
    request.body = Some(json_body.to_string());

    Ok(FunctionDeliveryFetchResult {
        request: Some(request),
    })
}

fn configuration_delivery_metafield_fetch(
    response_data: &DeliveryFetchResponseData,
) -> Result<&DeliveryFetchInputDiscountNodeMetafield> {
    response_data
        .discount_node
        .metafield
        .as_ref()
        .context("No configuration metafield found.")
}

#[cfg(test)]
mod tests {
    use super::*;
    use cart_fetch::output::{
        HttpRequestHeader as CartFetchHttpRequestHeader,
        HttpRequestMethod as CartFetchHttpRequestMethod,
        HttpRequestPolicy as CartFetchHttpRequestPolicy,
    };
    use delivery_fetch::output::{
        HttpRequestHeader as DeliveryFetchHttpRequestHeader,
        HttpRequestMethod as DeliveryFetchHttpRequestMethod,
        HttpRequestPolicy as DeliveryFetchHttpRequestPolicy,
    };
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn adds_entered_discount_codes_to_json_body_for_cart() -> Result<()> {
        let input = json!({
            "enteredDiscountCodes": [],
            "discountNode": {
              "metafield": {
                "value": json!({"request": {
                  "headers": [
                    {
                      "name": "accept",
                      "value": "application/json",
                    },
                  ],
                  "method": "POST",
                  "policy": {
                    "readTimeoutMs": 2000,
                  },
                  "body": "".to_string(),
                  "url": "https://delaygateway.shopifycloud.com/discount-function-network-calls",
                }}).to_string()
            }
        }})
        .to_string();

        let result = run_function_with_input(cart_fetch, &input)?;
        let json_body = json!({ "enteredDiscountCodes": [] });
        let expected = FunctionCartFetchResult {
            request: Some(CartFetchHttpRequest {
                headers: vec![CartFetchHttpRequestHeader {
                    name: "accept".to_string(),
                    value: "application/json".to_string(),
                }],
                method: CartFetchHttpRequestMethod::POST,
                policy: CartFetchHttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "https://delaygateway.shopifycloud.com/discount-function-network-calls"
                    .to_string(),
                json_body: Some(json_body.clone()),
                body: Some(json_body.to_string()),
            }),
        };

        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn adds_entered_discount_codes_to_body_for_delivery() -> Result<()> {
        let input = json!({
            "enteredDiscountCodes": ["ABC"],
            "discountNode": {
              "metafield": {
                "value": json!({"request": {
                  "headers": [
                    {
                      "name": "accept",
                      "value": "application/json",
                    },
                  ],
                  "method": "POST",
                  "policy": {
                    "readTimeoutMs": 2000,
                  },
                  "body": "".to_string(),
                  "url": "https://delaygateway.shopifycloud.com/discount-function-network-calls",
                }}).to_string()
            }
        }})
        .to_string();

        let result = run_function_with_input(delivery_fetch, &input)?;
        let json_body = json!({ "enteredDiscountCodes": ["ABC"] });
        let expected = FunctionDeliveryFetchResult {
            request: Some(DeliveryFetchHttpRequest {
                headers: vec![DeliveryFetchHttpRequestHeader {
                    name: "accept".to_string(),
                    value: "application/json".to_string(),
                }],
                method: DeliveryFetchHttpRequestMethod::POST,
                policy: DeliveryFetchHttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "https://delaygateway.shopifycloud.com/discount-function-network-calls"
                    .to_string(),
                json_body: Some(json_body.clone()),
                body: Some(json_body.to_string()),
            }),
        };

        assert_eq!(result, expected);
        Ok(())
    }
}

// [END discount-function.cart_fetch]
