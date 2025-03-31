/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from "./admin.types";

export type GetShopQueryVariables = AdminTypes.Exact<{ [key: string]: never }>;

export type GetShopQuery = {
  shop: Pick<AdminTypes.Shop, "id" | "name" | "email">;
};

export type UpdateCodeDiscountMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars["ID"]["input"];
  discount: AdminTypes.DiscountCodeAppInput;
}>;

export type UpdateCodeDiscountMutation = {
  discountUpdate?: AdminTypes.Maybe<{
    userErrors: Array<
      Pick<AdminTypes.DiscountUserError, "code" | "message" | "field">
    >;
  }>;
};

export type UpdateAutomaticDiscountMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars["ID"]["input"];
  discount: AdminTypes.DiscountAutomaticAppInput;
}>;

export type UpdateAutomaticDiscountMutation = {
  discountUpdate?: AdminTypes.Maybe<{
    userErrors: Array<
      Pick<AdminTypes.DiscountUserError, "code" | "message" | "field">
    >;
  }>;
};

export type GetDiscountQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars["ID"]["input"];
}>;

export type GetDiscountQuery = {
  discountNode?: AdminTypes.Maybe<
    Pick<AdminTypes.DiscountNode, "id"> & {
      configurationField?: AdminTypes.Maybe<
        Pick<AdminTypes.Metafield, "id" | "value">
      >;
      discount:
        | ({ __typename: "DiscountAutomaticApp" } & Pick<
            AdminTypes.DiscountAutomaticApp,
            "title" | "discountClass" | "startsAt" | "endsAt"
          > & {
              combinesWith: Pick<
                AdminTypes.DiscountCombinesWith,
                "orderDiscounts" | "productDiscounts" | "shippingDiscounts"
              >;
            })
        | {
            __typename:
              | "DiscountAutomaticBasic"
              | "DiscountAutomaticBxgy"
              | "DiscountAutomaticFreeShipping"
              | "DiscountCodeBasic"
              | "DiscountCodeBxgy"
              | "DiscountCodeFreeShipping";
          }
        | ({ __typename: "DiscountCodeApp" } & Pick<
            AdminTypes.DiscountCodeApp,
            | "title"
            | "discountClass"
            | "startsAt"
            | "endsAt"
            | "usageLimit"
            | "appliesOncePerCustomer"
          > & {
              combinesWith: Pick<
                AdminTypes.DiscountCombinesWith,
                "orderDiscounts" | "productDiscounts" | "shippingDiscounts"
              >;
              codes: {
                nodes: Array<Pick<AdminTypes.DiscountRedeemCode, "code">>;
              };
            });
    }
  >;
};

export type CreateCodeDiscountMutationVariables = AdminTypes.Exact<{
  discount: AdminTypes.DiscountCodeAppInput;
}>;

export type CreateCodeDiscountMutation = {
  discountCreate?: AdminTypes.Maybe<{
    codeAppDiscount?: AdminTypes.Maybe<
      Pick<AdminTypes.DiscountCodeApp, "discountId">
    >;
    userErrors: Array<
      Pick<AdminTypes.DiscountUserError, "code" | "message" | "field">
    >;
  }>;
};

export type CreateAutomaticDiscountMutationVariables = AdminTypes.Exact<{
  discount: AdminTypes.DiscountAutomaticAppInput;
}>;

export type CreateAutomaticDiscountMutation = {
  discountCreate?: AdminTypes.Maybe<{
    automaticAppDiscount?: AdminTypes.Maybe<
      Pick<AdminTypes.DiscountAutomaticApp, "discountId">
    >;
    userErrors: Array<
      Pick<AdminTypes.DiscountUserError, "code" | "message" | "field">
    >;
  }>;
};

interface GeneratedQueryTypes {
  "\n  query GetShop {\n    shop {\n      id\n      name\n      email\n    }\n  }\n": {
    return: GetShopQuery;
    variables: GetShopQueryVariables;
  };
  '#graphql\n      query GetDiscount($id: ID!) {\n        discountNode(id: $id) {\n          id\n          configurationField: metafield(\n            namespace: "$app:volume-discount"\n            key: "function-configuration"\n          ) {\n            id\n            value\n          }\n          discount {\n            __typename\n            ... on DiscountAutomaticApp {\n              title\n              discountClass\n              combinesWith {\n                orderDiscounts\n                productDiscounts\n                shippingDiscounts\n              }\n              startsAt\n              endsAt\n            }\n            ... on DiscountCodeApp {\n              title\n              discountClass\n              combinesWith {\n                orderDiscounts\n                productDiscounts\n                shippingDiscounts\n              }\n              startsAt\n              endsAt\n              usageLimit\n              appliesOncePerCustomer\n              codes(first: 1) {\n                nodes {\n                  code\n                }\n              }\n            }\n          }\n        }\n      }': {
    return: GetDiscountQuery;
    variables: GetDiscountQueryVariables;
  };
}

interface GeneratedMutationTypes {
  "#graphql\n          mutation UpdateCodeDiscount($id: ID!, $discount: DiscountCodeAppInput!) {\n            discountUpdate: discountCodeAppUpdate(id: $id, codeAppDiscount: $discount) {\n              userErrors {\n                code\n                message\n                field\n              }\n            }\n          }": {
    return: UpdateCodeDiscountMutation;
    variables: UpdateCodeDiscountMutationVariables;
  };
  "#graphql\n          mutation UpdateAutomaticDiscount($id: ID!, $discount: DiscountAutomaticAppInput!) {\n            discountUpdate: discountAutomaticAppUpdate(id: $id, automaticAppDiscount: $discount) {\n              userErrors {\n                code\n                message\n                field\n              }\n            }\n          }": {
    return: UpdateAutomaticDiscountMutation;
    variables: UpdateAutomaticDiscountMutationVariables;
  };
  "#graphql\n          mutation CreateCodeDiscount($discount: DiscountCodeAppInput!) {\n            discountCreate: discountCodeAppCreate(codeAppDiscount: $discount) {\n              codeAppDiscount{\n                discountId\n              }\n              userErrors {\n                code\n                message\n                field\n              }\n            }\n          }": {
    return: CreateCodeDiscountMutation;
    variables: CreateCodeDiscountMutationVariables;
  };
  "#graphql\n          mutation CreateAutomaticDiscount($discount: DiscountAutomaticAppInput!) {\n            discountCreate: discountAutomaticAppCreate(automaticAppDiscount: $discount) {\n              automaticAppDiscount {\n                discountId\n              }\n              userErrors {\n                code\n                message\n                field\n              }\n            }\n          }": {
    return: CreateAutomaticDiscountMutation;
    variables: CreateAutomaticDiscountMutationVariables;
  };
}
declare module "@shopify/admin-api-client" {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
