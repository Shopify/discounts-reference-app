import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const OFF = 0;
const WARN = 1;
const ERROR = 2;

export default [
  {
    ignores: [
      "**/dist/**",
      "**/dist",
      "extensions/**/dist/**",
      "extensions/**/dist",
      "**/node_modules/**",
      "build",
      "public/build",
      "shopify-app-remix",
      "*.yml",
      ".shopify/**",
      "**/generated/**/*.{ts,js}",
      "**/*.generated.{ts,js}",
      "**/*.d.ts",
      "**/types/**/*.d.ts",
      "**/admin.*.d.ts",
      "app/types/admin.*.d.ts",
      "app/types/*.d.ts",
    ],
  },
  // Base configuration for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": WARN,
      "@typescript-eslint/explicit-function-return-type": OFF,
      "@typescript-eslint/explicit-module-boundary-types": OFF,
      "@typescript-eslint/no-unused-vars": ERROR,
      "@typescript-eslint/no-non-null-assertion": WARN,

      // React specific rules
      "react/jsx-uses-react": ERROR,
      "react/jsx-uses-vars": ERROR,
      "react/jsx-no-leaked-render": [ERROR, { validStrategies: ["ternary"] }],
      "react/prop-types": OFF,
      "react/react-in-jsx-scope": OFF,

      // React Hooks rules
      "react-hooks/rules-of-hooks": ERROR,
      "react-hooks/exhaustive-deps": WARN,

      // General JavaScript/TypeScript rules
      "prefer-const": WARN,
      "no-console": [ERROR, { allow: ["error"] }],
      "no-debugger": ERROR,
      "no-duplicate-imports": ERROR,

      // Import rules
      "import/order": [
        WARN,
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          groups: ["builtin", "external", "internal", "parent", "sibling"],
          "newlines-between": "always",
        },
      ],
    },
  },
  // Reference app builder and scripts specific rules
  {
    files: [
      "reference-app-builder/**/*.{js,jsx,ts,tsx}",
      "scripts/**/*.{js,jsx,ts,tsx}",
    ],
    rules: {
      "no-console": OFF, // Allow console.log in reference-app-builder
    },
  },
  // Markdown specific rules
  {
    files: ["**/*.md/**"],
    rules: {
      "import/no-extraneous-dependencies": ERROR,
      "no-dupe-keys": ERROR,
      "no-undef": ERROR,
      "no-unused-expressions": ERROR,
      "no-unused-vars": ERROR,
    },
  },
  // Test files specific rules
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": OFF,
      "no-console": OFF,
    },
  },
];
