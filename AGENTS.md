# Discount Functions Testing - Agent Guide

This is a specialized Shopify internal tool for testing Discount Functions with a dual purpose: internal testing app and reference app generator.

## Quick Commands Reference

### Development

```bash
# Install and setup everything
dev up

# Start development server (recommended)
dev server

# Interactive extension management
dev extension

# Generate types
dev typegen
```

### Testing

```bash
# Run all tests (app + scripts + extensions)
pnpm test

# Run single test file
pnpm vitest run path/to/test.test.ts

# Run app tests only
pnpm vitest run -c tests/config/app-tests.config.ts

# Run scripts tests only
pnpm vitest run -c tests/config/scripts-tests.config.ts

# Update test snapshots
pnpm vitest -u -c tests/config/scripts-tests.config.ts
```

### Code Quality

```bash
# Lint with caching
pnpm lint

# Auto-fix lint issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting (CI)
pnpm format:check

# Type checking
pnpm type-check
```

### Extension Workflow

```bash
# Pack extensions (working -> source of truth)
pnpm extensions:pack

# Unpack extensions (source -> working directory)
pnpm extensions:unpack

# Force unpack after git pull
pnpm extensions:unpack:force

# Build all extensions
pnpm build-all-extensions

# Validate extensions
pnpm validate-extensions
```

## Project Architecture

**Key Concept**: Pack/unpack workflow for managing 50+ extensions

- `data/extensions-packed/*.json` - Source of truth (committed to git)
- `extensions/` - Working directory (not committed, can be regenerated)
- Use `dev extension` for interactive unpacking

**Tech Stack**: React Router, Polaris, TypeScript, Prisma, Vitest, Vite, pnpm

## Code Style Guidelines

### Formatting (Prettier)

- Single quotes: `false` (use double quotes)
- Trailing commas: `all`
- Semicolons: `true`
- Tab width: `2`
- Print width: `80`
- Arrow function parens: `avoid`

### Import Order (ESLint enforced)

1. Built-in modules
2. External dependencies
3. Internal modules
4. Parent modules
5. Sibling modules

Groups separated by newlines, alphabetized case-insensitive.

### TypeScript Configuration

- Strict mode enabled
- Target: ES2022
- Path alias: `~/*` maps to `./app/*`
- React JSX transform

### Naming Conventions

- Files: `kebab-case` for utilities, `PascalCase` for components
- Functions/variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/interfaces: `PascalCase`
- Test files: `*.test.ts` or `*.test.tsx`

### React/JSX Patterns

- Use React 19+ automatic JSX runtime (no React import needed)
- Functional components with hooks
- Prefer ternary over leaked renders
- No prop-types required (TypeScript handles typing)

### Error Handling

- Use `console.error()` for logging errors
- Never use `console.log()` in production code (allowed in tests/builders)
- Handle errors explicitly at boundaries
- Use TypeScript strict mode for catch-all safety

### Extension-Specific Rules

- **Preact extensions**: Use `jsxPragma: "h"` and pragma version "16.0"
- **TypeScript extensions**: Use individual tsconfig.json files
- **Rust extensions**: Follow Cargo workspace structure in `extensions/*/`

## Testing Patterns

### Test Structure (Vitest)

```typescript
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

describe("module being tested", () => {
  beforeEach(() => {
    // Setup mocks
  });

  afterEach(() => {
    // Cleanup
  });

  test("specific behavior", () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```

### Test Environments

- **App tests**: `happy-dom` environment, includes `app/**`
- **Scripts tests**: `node` environment, includes `scripts/**/tests/**`
- **Extension tests**: Run via scripts, not directly

### Coverage

- Provider: `v8`
- Reports: `text`, `html`, `json`
- Directory: `./coverage`
- Excludes test files, types, and entry points

## Development Workflow

1. **Setup**: Run `dev up` to install dependencies and setup database
2. **Work on extension**: Use `dev extension` to unpack and work on specific extensions
3. **Make changes**: Edit in `extensions/` directory
4. **Pack changes**: Run `pnpm extensions:pack` to update source of truth
5. **Test**: Run `pnpm test` for full test suite or individual tests
6. **Quality checks**: Run `pnpm lint` and `pnpm type-check` before commits

## Important Notes

- **Never commit** `extensions/` directory to git
- **Always commit** `data/extensions-packed/` JSON files
- After `git pull`, run `pnpm extensions:unpack:force` to sync working directory
- Use `shopify app dev --reset` for first-time setup or OAuth issues
- Rust functions use `wasm32-wasip1` target (not deprecated `wasm32-wasi`)

## Package Management

- Manager: `pnpm@9.15.9`
- Node: `>=22.16.0`
- TypeScript: `^5.9.3`
- Always use `pnpm` commands, not `npm`

## Shopify Integration

- CLI: Shopify CLI v3.85.5+
- Admin API with auto-generated types
- Polaris v13.9.5 for UI components
- App Bridge React for Shopify integration
