# Mock Discount HTTP Server

A simple mock server for testing discount code functionality of the Shopify Discount Function API.

> [!NOTE]
> This server is not intended to be used in production. It is only intended to be used for testing purposes.

## Overview

This server simulates the behavior expected from an HTTP server which supports a Shopify Discount Function with network access.

## Setup and Installation

1. `pnpm install`
2. `pnpm start`

The server will run at http://localhost:3000.

## Ngrok Setup (Optional)

To expose your local server to the internet:

1. Install and setup [ngrok](https://ngrok.com) on your computer.
2. `ngrok http http://localhost:3000`
3. Copy the URL provided by ngrok and use it in your cart or delivery discount functions with network access.

## Available Endpoints

### GET /

Returns a welcome page HTML response.

### POST /

Handles shipping discount code application requests.

#### Request Body

```json
{
  "enteredDiscountCodes": string[]
}
```

#### Example Request

```json
{
  "enteredDiscountCodes": ["FREESHIPPING"]
}
```

## Available Test Discount Codes

- `10OFFPRODUCT`: Applies a 10% discount to a specific cart line with ID "gid://shopify/CartLine/0"
- `20OFFORDER`: Applies a 20% discount to the order subtotal
- `FREESHIPPING`: Applies free shipping to the delivery group with ID "gid://shopify/DeliveryGroup/0"

## Development

The server is built with Express and TypeScript. The main components are:

- `server.ts`: Main server file that sets up Express and registers routes
- `src/cart-delivery.ts`: Handles product, order, and shipping discount code operations
- `src/types/generated.ts`: Contains TypeScript types for the Shopify Discount API which are pre-generated from the [Discount Function API](https://shopify-dev.myshopify.io/docs/api/functions/reference/discount) GraphQL schema.

### Running in Development Mode

For development with automatic reloading:

```bash
pnpm dev
```
