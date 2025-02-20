# Mock Discount HTTP Server

A simple mock server for testing discount code functionality that implements the Shopify Discount API.

## Overview

This server simulates the behavior of Shopify's discount Function API, which allows for:

- Multiple discount classes (product, order, and shipping) in a single Function
- Automatic discounts and discount codes
- External validation and calculation of discounts

## Setup and Installation

1. `pnpm install`
2. `pnpm start`

The server will run at http://localhost:3000.

## Ngrok Setup (Optional)

To expose your local server to the internet:

1. `brew install ngrok`
2. `ngrok http http://localhost:3000`
3. Copy the URL provided by ngrok

## Available Endpoints

### GET /

Returns a welcome page HTML response.

### POST /

Handles discount code application requests.

#### Request Body

```typescript
{
  "enteredDiscountCodes": string[]
}
```

### Processing the request

The server processes the request by:

1. Validating the discount codes

#### Available Test Discount Codes

- `10OFFPRODUCT`: Applies a 10% discount to a specific cart line
- `20OFFORDER`: Applies a 20% discount to the order subtotal

#### Response Body

Returns a JSON object with product, order and shipping discount operations.

## Development

To modify the server response, edit the `server.ts` file. The server is built with Express.js and TypeScript.
