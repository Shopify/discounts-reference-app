use std::process;
pub mod cart_delivery_options_discounts_generate_run;
pub mod cart_lines_discounts_generate_run;
use shopify_function::typegen;

#[typegen("schema.graphql")]
pub mod schema {
    #[query("src/cart_delivery_options_discounts_generate_run.graphql",
      custom_scalar_overrides = {
        "Input.discount.metafield.jsonValue" => super::cart_delivery_options_discounts_generate_run::DiscountConfiguration
    }
   )]
    pub mod cart_delivery_options_discounts_generate_run {}

    #[query("src/cart_lines_discounts_generate_run.graphql",
      custom_scalar_overrides = {
        "Input.discount.metafield.jsonValue" => super::cart_lines_discounts_generate_run::DiscountConfiguration
    }
    )]
    pub mod cart_lines_discounts_generate_run {}
}

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
