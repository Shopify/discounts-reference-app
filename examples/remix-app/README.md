# Shopify Discount Functions Remix App

> [!NOTE]
> Instead of cloning this repo, you can use the Shopify CLI to create a new app using the following command:
>
> ```bash
> shopify app init --template https://github.com/Shopify/discounts-reference-app/examples/remix-app
> ```

This app demonstrates the discount Functions API, which allows merchants to combine multiple discount types (product, order, and shipping) in a single function. It serves as a reference implementation.

## Overview

The discount Function API allows you to create complex discounts by allowing a single automatic discount or discount code to produce discount candidates of multiple classes. This eliminates the need to configure multiple separate Functions for different discount types.

### Key Features

- **Multi-class Discounts**

  - Combine product, order, and shipping discounts in one Function
  - Target specific product collections
  - Apply percentage-based discounts

- **Flexible Configuration**

  - Create automatic discounts or discount codes
  - Set usage limits
  - Configure combination rules with other discounts

- **Developer Experience**
  - Built with TypeScript and Remix
  - Uses Shopify's Polaris design system
  - Shopify GraphQL AdminAPI integration

## Prerequisites

1. Node.js 18.x or later
2. [Shopify Partner account](https://partners.shopify.com/signup)
3. Development store or [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store)
4. [Shopify CLI](https://shopify.dev/docs/apps/tools/cli) installed

## Discount Function

To setup your discount function, you can use the Shopify CLI to create a new function.

```bash
shopify app generate extension --template discount
```

Then follow the instructions found in the [Build a discount UI with Remix](https://shopify-dev.myshopify.io/docs/apps/build/discounts/build-ui-with-remix?extension=rust#update-the-discount-function-extension-to-read-metafield-data) tutorial.

## Development

### Initial Setup

```bash
# Install dependencies
pnpm install

# Set up the database
pnpm run setup
```

### Running the App

```bash
# Start the development server
pnpm run dev
```

## Deployment

1. Build the app:

```bash
pnpm run build
```

2. Deploy to your preferred hosting platform ([deployment guide](https://shopify.dev/docs/apps/deployment/web))

3. Set required environment variables:

```bash
NODE_ENV=production
```

## Troubleshooting

### Missing Database Tables

If you encounter the error `The table 'main.Session' does not exist`:

```bash
pnpm run setup
```

### OAuth Loop Issues

If authentication loops when changing scopes:

```bash
# Update app scopes
pnpm run deploy

# Or reset during development
pnpm run dev --reset
```

## Tech Stack

- [Remix](https://remix.run) - Web framework
- [Shopify App Bridge](https://shopify.dev/docs/apps/tools/app-bridge) - Admin integration
- [Polaris](https://polaris.shopify.com/) - Design system
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Prisma](https://www.prisma.io/) - Database ORM
