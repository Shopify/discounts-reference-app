use super::schema;
use shopify_function::prelude::*;
use shopify_function::Result;

// [START discount-function.run.delivery]
#[shopify_function]
fn cart_delivery_options_discounts_generate_run(
    input: schema::cart_delivery_options_discounts_generate_run::Input,
) -> Result<schema::CartDeliveryOptionsDiscountsGenerateRunResult> {
    let has_shipping_discount_class = input
        .discount()
        .discount_classes()
        .contains(&schema::DiscountClass::Shipping);
    if !has_shipping_discount_class {
        return Ok(schema::CartDeliveryOptionsDiscountsGenerateRunResult { operations: vec![] });
    }

    // Discount only the groups with shipping options.
    let targets: Vec<schema::DeliveryDiscountCandidateTarget> = input
        .cart()
        .delivery_groups()
        .iter()
        // If you also want to apply a discount for other delivery methods (e.g. LOCAL), ensure to account for that here.
        .filter(|group| {
            group.delivery_options().iter().any(|option| {
                matches!(
                    option.delivery_method_type(),
                    schema::DeliveryMethod::Shipping
                )
            })
        })
        .map(|group| {
            schema::DeliveryDiscountCandidateTarget::DeliveryGroup(schema::DeliveryGroupTarget {
                id: group.id().clone(),
            })
        })
        .collect();

    if targets.is_empty() {
        return Ok(schema::CartDeliveryOptionsDiscountsGenerateRunResult { operations: vec![] });
    }

    Ok(schema::CartDeliveryOptionsDiscountsGenerateRunResult {
        operations: vec![schema::DeliveryOperation::DeliveryDiscountsAdd(
            schema::DeliveryDiscountsAddOperation {
                selection_strategy: schema::DeliveryDiscountSelectionStrategy::All,
                candidates: vec![schema::DeliveryDiscountCandidate {
                    targets,
                    value: schema::DeliveryDiscountCandidateValue::Percentage(schema::Percentage {
                        value: Decimal(100.0),
                    }),
                    message: Some("FREE DELIVERY".to_string()),
                    associated_discount_code: None,
                }],
            },
        )],
    })
}
// [END discount-function.run.delivery]

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::run_function_with_input;

    const PICKUP_GROUP: &str = r#"{
        "id": "gid://shopify/CartDeliveryGroup/0",
        "deliveryOptions": [{ "deliveryMethodType": "PICK_UP" }]
    }"#;
    const SHIPPING_GROUP: &str = r#"{
        "id": "gid://shopify/CartDeliveryGroup/1",
        "deliveryOptions": [{ "deliveryMethodType": "SHIPPING" }]
    }"#;
    const LOCAL_DELIVERY_GROUP: &str = r#"{
        "id": "gid://shopify/CartDeliveryGroup/2",
        "deliveryOptions": [{ "deliveryMethodType": "LOCAL" }]
    }"#;
    const PICKUP_POINT_GROUP: &str = r#"{
        "id": "gid://shopify/CartDeliveryGroup/3",
        "deliveryOptions": [{ "deliveryMethodType": "PICKUP_POINT" }]
    }"#;

    fn run(
        delivery_groups: &[&str],
        discount_classes: &str,
    ) -> Result<Vec<schema::DeliveryOperation>> {
        let input = format!(
            r#"{{
                "cart": {{ "deliveryGroups": [{}] }},
                "discount": {{ "discountClasses": {} }}
            }}"#,
            delivery_groups.join(","),
            discount_classes
        );
        let result = run_function_with_input(cart_delivery_options_discounts_generate_run, &input)?;
        Ok(result.operations)
    }

    fn free_delivery_operations(group_ids: &[&str]) -> Vec<schema::DeliveryOperation> {
        vec![schema::DeliveryOperation::DeliveryDiscountsAdd(
            schema::DeliveryDiscountsAddOperation {
                selection_strategy: schema::DeliveryDiscountSelectionStrategy::All,
                candidates: vec![schema::DeliveryDiscountCandidate {
                    targets: group_ids
                        .iter()
                        .map(|id| {
                            schema::DeliveryDiscountCandidateTarget::DeliveryGroup(
                                schema::DeliveryGroupTarget { id: id.to_string() },
                            )
                        })
                        .collect(),
                    value: schema::DeliveryDiscountCandidateValue::Percentage(schema::Percentage {
                        value: Decimal(100.0),
                    }),
                    message: Some("FREE DELIVERY".to_string()),
                    associated_discount_code: None,
                }],
            },
        )]
    }

    #[test]
    fn returns_no_operations_without_the_shipping_discount_class() -> Result<()> {
        assert_eq!(run(&[SHIPPING_GROUP], "[]")?, vec![]);
        Ok(())
    }

    #[test]
    fn discounts_the_shipping_group() -> Result<()> {
        assert_eq!(
            run(&[SHIPPING_GROUP], r#"["SHIPPING"]"#)?,
            free_delivery_operations(&["gid://shopify/CartDeliveryGroup/1"])
        );
        Ok(())
    }

    #[test]
    fn discounts_only_the_shipping_group_when_the_pickup_group_is_first_in_a_split() -> Result<()> {
        assert_eq!(
            run(&[PICKUP_GROUP, SHIPPING_GROUP], r#"["SHIPPING"]"#)?,
            free_delivery_operations(&["gid://shopify/CartDeliveryGroup/1"])
        );
        Ok(())
    }

    #[test]
    fn discounts_only_the_shipping_group_when_the_shipping_group_is_first_in_a_split() -> Result<()>
    {
        assert_eq!(
            run(&[SHIPPING_GROUP, PICKUP_GROUP], r#"["SHIPPING"]"#)?,
            free_delivery_operations(&["gid://shopify/CartDeliveryGroup/1"])
        );
        Ok(())
    }

    #[test]
    fn returns_no_operations_for_a_pickup_only_cart() -> Result<()> {
        assert_eq!(run(&[PICKUP_GROUP], r#"["SHIPPING"]"#)?, vec![]);
        Ok(())
    }

    #[test]
    fn returns_no_operations_for_local_delivery_and_pickup_point_groups() -> Result<()> {
        assert_eq!(
            run(
                &[LOCAL_DELIVERY_GROUP, PICKUP_POINT_GROUP],
                r#"["SHIPPING"]"#
            )?,
            vec![]
        );
        Ok(())
    }

    #[test]
    fn returns_no_operations_without_delivery_groups() -> Result<()> {
        assert_eq!(run(&[], r#"["SHIPPING"]"#)?, vec![]);
        Ok(())
    }
}
