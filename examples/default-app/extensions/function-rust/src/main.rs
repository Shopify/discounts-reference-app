use std::process;
pub mod cart_run;
pub mod delivery_run;

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
