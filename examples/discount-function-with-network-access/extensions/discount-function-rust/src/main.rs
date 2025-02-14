use std::process;
pub mod cart_run;
pub mod delivery_run;
// [START discount-function.main]
pub mod cart_fetch;
pub mod delivery_fetch;
// [END discount-function.main]

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
