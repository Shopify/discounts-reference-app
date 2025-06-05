use std::process;
pub mod cart_delivery_options_discounts_generate_run;
pub mod cart_lines_discounts_generate_run;
// [START discount-function.main]
pub mod cart_delivery_options_discounts_generate_fetch;
pub mod cart_lines_discounts_generate_fetch;
use shopify_function::typegen;

#[typegen("schema.graphql")]
pub mod schema {
    #[query("src/cart_delivery_options_discounts_generate_fetch.graphql")]
    pub mod cart_delivery_options_discounts_generate_fetch {}

    #[query("src/cart_lines_discounts_generate_fetch.graphql")]
    pub mod cart_lines_discounts_generate_fetch {}

    #[query(
        "src/cart_delivery_options_discounts_generate_run.graphql",
        custom_scalar_overrides = {
            "Input.fetchResult.jsonBody" => super::cart_delivery_options_discounts_generate_run::JsonBody
        }
    )]
    pub mod cart_delivery_options_discounts_generate_run {}

    #[query (
        "src/cart_lines_discounts_generate_run.graphql", 
        custom_scalar_overrides = {
            "Input.fetchResult.jsonBody" => super::cart_lines_discounts_generate_run::JsonBody
        }
    )]
    pub mod cart_lines_discounts_generate_run {}
}
// [END discount-function.main]

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
