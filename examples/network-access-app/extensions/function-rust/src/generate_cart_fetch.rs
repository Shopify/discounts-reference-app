// [START discount-function.cart.fetch]
use anyhow::{Context, Result};
use serde::Deserialize;
use shopify_function;
use shopify_function::prelude::*;

type JSON = serde_json::Value;
use serde_json::json;

use generate_cart_fetch::input::{
    InputDiscountNodeMetafield as CartFetchInputDiscountNodeMetafield,
    ResponseData as CartFetchResponseData,
};
use generate_cart_fetch::output::{FunctionCartFetchResult, HttpRequest as CartFetchHttpRequest};


#[shopify_function_target(
    query_path = "src/generate_cart_fetch.graphql",
    schema_path = "schema.graphql",
    target = "cart_fetch"
)]
fn generate_cart_fetch(input: CartFetchResponseData) -> shopify_function::Result<FunctionCartFetchResult> {
    let entered_discount_codes = &input.entered_discount_codes;
    let mut request = CartFetchHttpRequest {
        headers: vec![CartFetchHttpRequestHeader {
            name: "accept".to_string(),
            value: "application/json".to_string(),
        }],
        method: CartFetchHttpRequestMethod::POST,
        policy: CartFetchHttpRequestPolicy {
            read_timeout_ms: 2000,
        },
        url: "https://example.com/discount-function-network-access"
            .to_string(),
    };

    let json_body = json!({ "body": { "enteredDiscountCodes": entered_discount_codes } });
    request.json_body = Some(json_body.clone());
    request.body = Some(json_body.to_string());

    Ok(FunctionCartFetchResult {
        request: Some(request),
    })
}
// [END discount-function.fetch.cart]


#[cfg(test)]
mod tests {
    use super::*;
    use generate_cart_fetch::output::{
        HttpRequestHeader as CartFetchHttpRequestHeader,
        HttpRequestMethod as CartFetchHttpRequestMethod,
        HttpRequestPolicy as CartFetchHttpRequestPolicy,
    };

    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn adds_entered_discount_codes_to_json_body_for_cart() -> Result<()> {
        let input = json!({
            "enteredDiscountCodes": [],
            })
        .to_string();

        let result = run_function_with_input(generate_cart_fetch, &input)?;
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
                url: "https://example.com/discount-function-network-access"
                    .to_string(),
                json_body: Some(json_body.clone()),
                body: Some(json_body.to_string()),
            }),
        };

        assert_eq!(result, expected);
        Ok(())
    }
}


