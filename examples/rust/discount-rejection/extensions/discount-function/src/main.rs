use std::process;
pub mod cart_lines_discounts_generate_run;
use shopify_function::typegen;

#[typegen("schema.graphql")]
pub mod schema {
    #[query("src/cart_lines_discounts_generate_run.graphql")]
    pub mod cart_lines_discounts_generate_run {}
}

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
