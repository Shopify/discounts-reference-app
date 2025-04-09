# Shopify Discount Functions Reference App

Reference applications and examples demonstrating how to implement Shopify Discount Functions.

> [!NOTE]
>
> # Note to External Developers
>
> This repository is read-only. All examples and code samples contained here are generated and maintained by Shopify.
>
> If you encounter any issues or have questions about the implementations, please submit them through the GitHub Issues section of this repository.
>
> We encourage you to use these examples as a learning resource while following the official tutorials on [Shopify Dev](https://shopify.dev/docs/apps/build/discounts).

## Overview

This project provides examples and reference implementations for Shopify Discount Functions, helping developers understand how to create and test custom discount logic for Shopify stores.

## Prerequisites

- Node.js >= 20.0.0
- PNPM >= 8.15.5
- Rust (for Rust examples)

## Project Structure

```
.
├── docs/           # Documentation
├── examples/       # Example implementations
│   ├── javascript/ # JavaScript examples
│   ├── remix-app/  # Remix application examples
│   ├── rust/       # Rust examples
│   └── mock-http-server/ # Mock server for testing
```

## Getting Started

Examples and apps found in this repo are meant to be used as reference only. **Do not clone or run these applications directly from this repository.**


Examples and apps found in this repo are meant to be used with our tutorials on [Shopify Dev](https://shopify.dev/docs/apps/build/discounts). Rather than clone this repo, we recommend following the tutorials and using the code snippets as reference. Each example can be scaffolded using the Shopify CLI. Learn more about [Shopify CLI](https://shopify.dev/docs/api/shopify-cli/app/app-init#flags-propertydetail-templatevalue) template value.

```bash
shopify app init --template https://github.com/Shopify/discounts-reference-app/remix-app#[main]
```

- [Build a discount function](https://shopify.dev/docs/apps/build/discounts/build-discount-function)
- [Build a discount UI with UI Extensions](https://shopify.dev/docs/apps/build/discounts/build-ui-extension)
- [Build a discount UI with Remix](https://shopify.dev/docs/apps/build/discounts/build-ui-with-remix)
- [Network access](https://shopify.dev/docs/apps/build/discounts/network-access)
- [Migrate from a legacy discount APIs](https://shopify.dev/docs/apps/build/discounts/migrate-discount-api)

## Examples

The project includes several example implementations:

- **JavaScript Examples**: JavaScript implementations of discount functions
- **Rust Examples**: Rust implementations of discount functions
- **Remix App**: A full Remix application demonstrating discount function integration
- **Mock HTTP Server**: A server for testing discount functions with network access locally

## Support

For support, please open an issue in the [GitHub repository](https://github.com/Shopify/discounts-reference-app/issues).
