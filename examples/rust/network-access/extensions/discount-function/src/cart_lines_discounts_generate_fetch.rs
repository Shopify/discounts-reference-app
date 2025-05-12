// [START discount-function.cart.fetch]
use serde_json::json;
use shopify_function;
use shopify_function::prelude::*;

#[shopify_function_target(
    query_path = "src/cart_lines_discounts_generate_fetch.graphql",
    schema_path = "schema.graphql",
    target = "cartLinesDiscountsGenerateFetch"
)]
fn cart_lines_discounts_generate_fetch(
    input: cart_lines_discounts_generate_fetch::input::ResponseData,
) -> shopify_function::Result<
    cart_lines_discounts_generate_fetch::output::CartLinesDiscountsGenerateFetchResult,
> {
    let entered_discount_codes = &input.entered_discount_codes;
    let json_body = json!({ "enteredDiscountCodes": entered_discount_codes });

    let request = cart_lines_discounts_generate_fetch::output::HttpRequest {
        headers: vec![
            cart_lines_discounts_generate_fetch::output::HttpRequestHeader {
                name: "accept".to_string(),
                value: "application/json".to_string(),
            },
            cart_lines_discounts_generate_fetch::output::HttpRequestHeader {
                name: "Content-Type".to_string(),
                value: "application/json".to_string(),
            },
        ],
        method: cart_lines_discounts_generate_fetch::output::HttpRequestMethod::POST,
        policy: cart_lines_discounts_generate_fetch::output::HttpRequestPolicy {
            read_timeout_ms: 2000,
        },
        // [START discount-function.cart.fetch.url]
        url: "<external-server-url>/api".to_string(),
        // [END discount-function.cart.fetch.url]
        body: Some(json_body.to_string()),
        json_body: Some(json_body.clone()),
    };

    Ok(
        cart_lines_discounts_generate_fetch::output::CartLinesDiscountsGenerateFetchResult {
            request: Some(request),
        },
    )
}
// [END discount-function.fetch.cart]

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::run_function_with_input;

    #[test]
    fn adds_entered_discount_codes_to_json_body_for_cart() -> shopify_function::Result<()> {
        let input = json!({
            "enteredDiscountCodes": [],
            "cart": {
                "lines": []
            }
        })
        .to_string();

        let result = run_function_with_input(cart_lines_discounts_generate_fetch, &input)?;
        let json_body = json!({ "enteredDiscountCodes": [] });
        let expected =
            cart_lines_discounts_generate_fetch::output::CartLinesDiscountsGenerateFetchResult {
                request: Some(cart_lines_discounts_generate_fetch::output::HttpRequest {
                    headers: vec![
                        cart_lines_discounts_generate_fetch::output::HttpRequestHeader {
                            name: "accept".to_string(),
                            value: "application/json".to_string(),
                        },
                        cart_lines_discounts_generate_fetch::output::HttpRequestHeader {
                            name: "Content-Type".to_string(),
                            value: "application/json".to_string(),
                        },
                    ],
                    method: cart_lines_discounts_generate_fetch::output::HttpRequestMethod::POST,
                    policy: cart_lines_discounts_generate_fetch::output::HttpRequestPolicy {
                        read_timeout_ms: 2000,
                    },
                    url: "<external-server-url>/api".to_string(),
                    json_body: Some(json_body.clone()),
                    body: Some(json_body.to_string()),
                }),
            };

        assert_eq!(result, expected);
        Ok(())
    }
}
