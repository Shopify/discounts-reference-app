// [START discount-function.cart.fetch]
use shopify_function;
use shopify_function::prelude::*;
use serde_json::json;

use cart_fetch::input::ResponseData as CartFetchResponseData;
use cart_fetch::output::{
    FunctionCartFetchResult,
    HttpRequest as CartFetchHttpRequest,
    HttpRequestHeader as CartFetchHttpRequestHeader,
    HttpRequestMethod as CartFetchHttpRequestMethod,
    HttpRequestPolicy as CartFetchHttpRequestPolicy,
};

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
        // [START discount-function.cart.fetch.url]
        url: "<external server url>".to_string(),
        // [END discount-function.cart.fetch.url]
        body: None,
        json_body: None,
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
    use cart_fetch::output::{
        FunctionCartFetchResult,
        HttpRequest as CartFetchHttpRequest,
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
        let json_body = json!({ "body": { "enteredDiscountCodes": [] } });
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
                url: "<external server url>"
                    .to_string(),
                json_body: Some(json_body.clone()),
                body: Some(json_body.to_string()),
            }),
        };

        assert_eq!(result, expected);
        Ok(())
    }
}


