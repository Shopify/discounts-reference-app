import path from "path";

import { shopifyApiProject, ApiType } from "@shopify/api-codegen-preset";
import { ApiVersion } from "@shopify/shopify-api";
import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: ApiVersion.Unstable,
      documents: [path.join(__dirname, "app/**/*.{js,ts,jsx,tsx}")],
      outputDir: path.join(__dirname, "app/types"),
      apiKey: process.env.SHOPIFY_API_KEY,
    }),
  },
};

export default config;
