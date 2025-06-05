// [START discount-function.delivery.fetch]
use super::schema;
use shopify_function;
use shopify_function::prelude::*;
use std::collections::BTreeMap;
#[shopify_function]
fn cart_delivery_options_discounts_generate_fetch(
    input: schema::cart_delivery_options_discounts_generate_fetch::Input,
) -> shopify_function::Result<schema::CartDeliveryOptionsDiscountsGenerateFetchResult> {
    let entered_discount_codes = &input.entered_discount_codes();
    let json_body = JsonValue::Object(BTreeMap::from([(
        "enteredDiscountCodes".to_string(),
        JsonValue::Array(
            entered_discount_codes
                .iter()
                .map(|s| JsonValue::String(s.clone()))
                .collect(),
        ),
    )]));

    let request = schema::HttpRequest {
        headers: vec![
            schema::HttpRequestHeader {
                name: "accept".to_string(),
                value: "application/json".to_string(),
            },
            schema::HttpRequestHeader {
                name: "Content-Type".to_string(),
                value: "application/json".to_string(),
            },
        ],
        method: schema::HttpRequestMethod::Post,
        policy: schema::HttpRequestPolicy {
            read_timeout_ms: 2000,
        },
        // [START discount-function.delivery.fetch.url]
        url: "<external-server-url>/api".to_string(),
        // [END discount-function.delivery.fetch.url]
        body: None,
        json_body: Some(json_body.clone()),
    };

    Ok(schema::CartDeliveryOptionsDiscountsGenerateFetchResult {
        request: Some(request),
    })
}
// [END discount-function.delivery.fetch]

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;
    use shopify_function::run_function_with_input;

    #[test]
    fn adds_entered_discount_codes_to_json_body_for_delivery() -> shopify_function::Result<()> {
        let input = json!({
            "enteredDiscountCodes": [],
            "cart": {
                "lines": []
            }
        })
        .to_string();

        let result =
            run_function_with_input(cart_delivery_options_discounts_generate_fetch, &input)?;
        let json_body = JsonValue::Object(BTreeMap::from([(
            "enteredDiscountCodes".to_string(),
            JsonValue::Array(vec![]),
        )]));
        let expected = schema::CartDeliveryOptionsDiscountsGenerateFetchResult {
            request: Some(schema::HttpRequest {
                headers: vec![
                    schema::HttpRequestHeader {
                        name: "accept".to_string(),
                        value: "application/json".to_string(),
                    },
                    schema::HttpRequestHeader {
                        name: "Content-Type".to_string(),
                        value: "application/json".to_string(),
                    },
                ],
                method: schema::HttpRequestMethod::Post,
                policy: schema::HttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "<external-server-url>/api".to_string(),
                json_body: Some(json_body),
                body: None,
            }),
        };

        assert_eq!(result, expected);
        Ok(())
    }
}
