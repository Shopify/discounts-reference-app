# Discounts in Rollouts Setup

Authenticated DFT tool that seeds the dedicated Discounts in Rollouts test shop with a fixed fixture matrix. Reachable from the Tools page or `/app/discounts-in-rollouts-setup`.

- Target shop: `discounts-in-rollouts.myshopify.com` (`gid://shopify/Shop/82109235446`)
- Tracking issue: https://github.com/shop/issues-discounts/issues/2230
- Project: https://vault.shopify.io/gsd/projects/51298

## What it seeds

One fixed, source-controlled configuration: `data/seed-configs/discounts-in-rollouts.ts`.

| Type | Fixtures |
| --- | --- |
| Products | `rollouts-seed-product-a`, `-b`, `-c` — active, untracked inventory, published to Online Store |
| Customers | one segment member (tagged `dft-rollouts-seed-segment-member`), one control |
| Segment | `[DFT Rollouts Seed] Segment members` on the member tag |
| Markets | resolves existing US and Canada region markets; creates `[DFT Rollouts Seed] Canada` only when no Canada market exists |
| Native discounts | 6 fixtures: add/remove x automatic/code, plus segment and Canada-market eligibility |
| Function discounts | `[DFT] Passthrough Order` (automatic app) and `[DFT] Passthrough Product` (code app) |

The tool never creates Rollout resources. Create launch and experiment Rollouts through Shopify Admin using the seeded discounts.

## Safety model

- Every loader and action authenticates with `authenticate.admin(request)`.
- Setup and reset mutations require `session.shop`, `shop.myshopifyDomain`, and `shop.id` to all match the target shop. The check runs inside the executor, not only in the UI.
- Dry run performs no mutations. On the target shop it checks existing resources; on any other shop it previews the plan from config without reading shop data.
- The config name is a constant; no form field selects a configuration.
- Preflight fails closed before the first mutation: config validation, shop identity, exact function-title resolution, Online Store publication, and required US market.

## Idempotency and ownership

- Every resource has a stable natural key (handle, email, name, title+code) and carries the `dft-rollouts-seed` tag or `[DFT Rollouts Seed]` title prefix.
- Setup looks up each resource before creating it. Reruns report `skipped` or `updated`, never duplicates.
- An existing resource with the same key but without the ownership marker (or with a different code) is reported as `conflict` and left untouched. Its dependents are `blocked`.

## Reset

- Reset preview lists what would be deleted; nothing is mutated. It reads shop data, so it only runs on the target shop.
- Destructive reset requires typing `discounts-in-rollouts` and runs only on the target shop.
- Deletion order: discounts, segment, customers, seeder-created market, products.
- Adopted markets, the primary market, and any resource without the ownership marker are never deleted; they are reported as manual cleanup steps.

## Scopes and deployment

Publishing products to Online Store requires `read_publications` and `write_publications`, added in `shopify.app.discount-functions-testing.toml`. A scope change requires deploying the app and reauthorizing it on the target shop before setup can publish products.

## Tests

```
pnpm vitest run -c tests/config/app-tests.config.ts \
  app/routes/app.discounts-in-rollouts-setup/tests \
  app/routes/tests/app.discounts-in-rollouts-setup.test.tsx
```
