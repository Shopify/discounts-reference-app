export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Represents an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-encoded date string.
   * For example, September 7, 2019 is represented as `"2019-07-16"`.
   */
  Date: { input: any; output: any; }
  /**
   * Represents an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-encoded date and time string.
   * For example, 3:50 pm on September 7, 2019 in the time zone of UTC (Coordinated Universal Time) is
   * represented as `"2019-09-07T15:50:00Z`".
   */
  DateTime: { input: any; output: any; }
  /**
   * A subset of the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format that
   * includes the date and time but not the timezone which is determined from context.
   *
   * For example, "2018-01-01T00:00:00".
   */
  DateTimeWithoutTimezone: { input: any; output: any; }
  /**
   * A signed decimal number, which supports arbitrary precision and is serialized as a string.
   *
   * Example values: `"29.99"`, `"29.999"`.
   */
  Decimal: { input: any; output: any; }
  /**
   * A function-scoped handle to a refer a resource.
   * The Handle type appears in a JSON response as a String, but it is not intended to be human-readable.
   * Example value: `"10079785100"`
   */
  Handle: { input: any; output: any; }
  /**
   * A [JSON](https://www.json.org/json-en.html) object.
   *
   * Example value:
   * `{
   *   "product": {
   *     "id": "gid://shopify/Product/1346443542550",
   *     "title": "White T-shirt",
   *     "options": [{
   *       "name": "Size",
   *       "values": ["M", "L"]
   *     }]
   *   }
   * }`
   */
  JSON: { input: any; output: any; }
  /**
   * A subset of the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format that
   * includes the time but not the date or timezone which is determined from context.
   * For example, "05:43:21".
   */
  TimeWithoutTimezone: { input: any; output: any; }
  /**
   * Represents an [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) and
   * [RFC 3987](https://datatracker.ietf.org/doc/html/rfc3987)-compliant URI string.
   *
   * For example, `"https://example.myshopify.com"` is a valid URL. It includes a scheme (`https`) and a host
   * (`example.myshopify.com`).
   */
  URL: { input: any; output: any; }
  /** A void type that can be used to return a null value from a mutation. */
  Void: { input: any; output: any; }
};

/** A discount code that is associated with a discount candidate. */
export type AssociatedDiscountCode = {
  /** The discount code. */
  code: Scalars['String']['input'];
};

/**
 * A custom property. Attributes are used to store additional information about a Shopify resource, such as
 * products, customers, or orders. Attributes are stored as key-value pairs.
 *
 * For example, a list of attributes might include whether a customer is a first-time buyer (`"customer_first_order": "true"`),
 * whether an order is gift-wrapped (`"gift_wrapped": "true"`), a preferred delivery date
 * (`"preferred_delivery_date": "2025-10-01"`), the discount applied (`"loyalty_discount_applied": "10%"`), and any
 * notes provided by the customer (`"customer_notes": "Please leave at the front door"`).
 */
export type Attribute = {
  __typename?: 'Attribute';
  /** The key or name of the attribute. For example, `"customer_first_order"`. */
  key: Scalars['String']['output'];
  /** The value of the attribute. For example, `"true"`. */
  value?: Maybe<Scalars['String']['output']>;
};

/**
 * Information about the customer that's interacting with the cart. It includes details such as the
 * customer's email and phone number, and the total amount of money the customer has spent in the store.
 * This information helps personalize the checkout experience and ensures that accurate pricing and delivery options
 * are displayed to customers.
 */
export type BuyerIdentity = {
  __typename?: 'BuyerIdentity';
  /** The [customer](https://help.shopify.com/manual/customers/manage-customers) that's interacting with the cart. */
  customer?: Maybe<Customer>;
  /** The email address of the customer that's interacting with the cart. */
  email?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the customer is authenticated through their
   * [customer account](https://help.shopify.com/manual/customers/customer-accounts).
   */
  isAuthenticated: Scalars['Boolean']['output'];
  /** The phone number of the customer that's interacting with the cart. */
  phone?: Maybe<Scalars['String']['output']>;
  /**
   * The company of a B2B customer that's interacting with the cart.
   * Used to manage and track purchases made by businesses rather than individual customers.
   */
  purchasingCompany?: Maybe<PurchasingCompany>;
};

/**
 * The cart where the Function is running. A cart contains the merchandise that a customer intends to purchase
 * and information about the customer, such as the customer's email address and phone number.
 */
export type Cart = HasMetafields & {
  __typename?: 'Cart';
  /**
   * The custom attributes associated with a cart to store additional information. Cart attributes
   * allow you to collect specific information from customers on the **Cart** page, such as order notes,
   * gift wrapping requests, or custom product details. Attributes are stored as key-value pairs.
   */
  attribute?: Maybe<Attribute>;
  /**
   * Information about the customer that's interacting with the cart. It includes details such as the
   * customer's email and phone number, and the total amount of money the customer has spent in the store.
   * This information helps personalize the checkout experience and ensures that accurate pricing and delivery options
   * are displayed to customers.
   */
  buyerIdentity?: Maybe<BuyerIdentity>;
  /**
   * A breakdown of the costs that the customer will pay at checkout. It includes the total amount,
   * the subtotal before taxes and duties, the tax amount, and duty charges.
   */
  cost: CartCost;
  /** The items in a cart that are eligible for fulfillment and can be delivered to the customer. */
  deliverableLines: Array<DeliverableCartLine>;
  /**
   * A collection of items that are grouped by shared delivery characteristics. Delivery groups streamline
   * fulfillment by organizing items that can be shipped together, based on the customer's
   * shipping address. For example, if a customer orders a t-shirt and a pair of shoes that can be shipped
   * together, then the items are included in the same delivery group.
   *
   * In the [Order Discount](https://shopify.dev/docs/api/functions/reference/order-discounts) and
   * [Product Discount](https://shopify.dev/docs/api/functions/reference/product-discounts) legacy APIs,
   * the `cart.deliveryGroups` input is always an empty array. This means you can't access delivery groups when
   * creating Order Discount or Product Discount Functions. If you need to apply discounts to shipping costs,
   * then use the [Discount Function API](https://shopify.dev/docs/api/functions/reference/discount)
   * instead.
   */
  deliveryGroups: Array<CartDeliveryGroup>;
  /**
   * The items in a cart that the customer intends to purchase. A cart line is an entry in the
   * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
   * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
   */
  lines: Array<CartLine>;
  /**
   * The additional fields on the **Cart** page that are required for international orders in specific countries,
   * such as customs information or tax identification numbers.
   */
  localizedFields: Array<LocalizedField>;
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
  /** The physical location where a retail order is created or completed. */
  retailLocation?: Maybe<Location>;
};


/**
 * The cart where the Function is running. A cart contains the merchandise that a customer intends to purchase
 * and information about the customer, such as the customer's email address and phone number.
 */
export type CartAttributeArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
};


/**
 * The cart where the Function is running. A cart contains the merchandise that a customer intends to purchase
 * and information about the customer, such as the customer's email address and phone number.
 */
export type CartLocalizedFieldsArgs = {
  keys?: Array<LocalizedFieldKey>;
};


/**
 * The cart where the Function is running. A cart contains the merchandise that a customer intends to purchase
 * and information about the customer, such as the customer's email address and phone number.
 */
export type CartMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A breakdown of the costs that the customer will pay at checkout. It includes the total amount,
 * the subtotal before taxes and duties, the tax amount, and duty charges.
 */
export type CartCost = {
  __typename?: 'CartCost';
  /** The amount, before taxes and cart-level discounts, for the customer to pay. */
  subtotalAmount: MoneyV2;
  /** The total amount for the customer to pay at checkout. */
  totalAmount: MoneyV2;
  /** The duty charges for a customer to pay at checkout. */
  totalDutyAmount?: Maybe<MoneyV2>;
  /** The total tax amount for the customer to pay at checkout. */
  totalTaxAmount?: Maybe<MoneyV2>;
};

/**
 * Information about items in a cart that are grouped by shared delivery characteristics.
 * Delivery groups streamline fulfillment by organizing items that can be shipped together, based on the customer's
 * shipping address. For example, if a customer orders a t-shirt and a pair of shoes that can be shipped
 * together, then the items are included in the same delivery group.
 */
export type CartDeliveryGroup = {
  __typename?: 'CartDeliveryGroup';
  /**
   * Information about items in a cart that a customer intends to purchase. A cart line is an entry in the
   * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
   * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
   */
  cartLines: Array<CartLine>;
  /** The shipping or destination address associated with the delivery group. */
  deliveryAddress?: Maybe<MailingAddress>;
  /**
   * The delivery options available for the delivery group. Delivery options are the different ways that customers
   * can choose to have their orders shipped. Examples include express shipping or standard shipping.
   */
  deliveryOptions: Array<CartDeliveryOption>;
  /** The type of merchandise in the delivery group. */
  groupType: CartDeliveryGroupType;
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the delivery group.
   */
  id: Scalars['ID']['output'];
  /** Information about the delivery option that the customer has selected. */
  selectedDeliveryOption?: Maybe<CartDeliveryOption>;
};

/** Defines what type of merchandise is in the delivery group. */
export enum CartDeliveryGroupType {
  /**
   * The delivery group only contains merchandise that is either a one time purchase or a first delivery of
   * subscription merchandise.
   */
  OneTimePurchase = 'ONE_TIME_PURCHASE',
  /** The delivery group only contains subscription merchandise. */
  Subscription = 'SUBSCRIPTION'
}

/**
 * Information about a delivery option that's available for an item in a cart. Delivery options are the different
 * ways that customers can choose to have their orders shipped. Examples include express shipping or standard
 * shipping.
 */
export type CartDeliveryOption = {
  __typename?: 'CartDeliveryOption';
  /**
   * A unique identifier that represents the delivery option offered to customers.
   * For example, `Canada Post Expedited`.
   */
  code?: Maybe<Scalars['String']['output']>;
  /** The amount that the customer pays if they select the delivery option. */
  cost: MoneyV2;
  /**
   * The delivery method associated with the delivery option. A delivery method is a way that merchants can
   * fulfill orders from their online stores. Delivery methods include shipping to an address,
   * [local pickup](https://help.shopify.com/manual/fulfillment/setup/delivery-methods/pickup-in-store),
   * and shipping to a [pickup point](https://help.shopify.com/manual/fulfillment/shopify-shipping/pickup-points),
   * all of which are natively supported by Shopify checkout.
   */
  deliveryMethodType: DeliveryMethod;
  /** A single-line description of the delivery option, with HTML tags removed. */
  description?: Maybe<Scalars['String']['output']>;
  /**
   * A unique, human-readable identifier of the delivery option's title.
   * A handle can contain letters, hyphens (`-`), and numbers, but not spaces.
   * For example, `standard-shipping`.
   */
  handle: Scalars['Handle']['output'];
  /**
   * The name of the delivery option that displays to customers. The title is used to construct the delivery
   * option's handle. For example, if a delivery option is titled "Standard Shipping", then the handle is
   * `standard-shipping`.
   */
  title?: Maybe<Scalars['String']['output']>;
};

/**
 * The cart.delivery-options.discounts.generate.fetch target result. Refer to [network access](https://shopify.dev/apps/build/functions/input-output/network-access/graphql)
 * for Shopify Functions.
 */
export type CartDeliveryOptionsDiscountsGenerateFetchResult = {
  /** The attributes associated with an HTTP request. */
  request?: InputMaybe<HttpRequest>;
};

/** The cart.delivery-options.discounts.generate.run target result. */
export type CartDeliveryOptionsDiscountsGenerateRunResult = {
  /** An ordered list of operations to generate delivery discounts, such as validating and applying discounts to the cart. */
  operations: Array<DeliveryOperation>;
};

/**
 * Information about an item in a cart that a customer intends to purchase. A cart line is an entry in the
 * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
 * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
 */
export type CartLine = {
  __typename?: 'CartLine';
  /**
   * The custom attributes associated with a cart to store additional information. Cart attributes
   * allow you to collect specific information from customers on the **Cart** page, such as order notes,
   * gift wrapping requests, or custom product details. Attributes are stored as key-value pairs.
   *
   * Cart line attributes are equivalent to the
   * [`line_item`](https://shopify.dev/docs/api/liquid/objects/line_item)
   * object in Liquid.
   */
  attribute?: Maybe<Attribute>;
  /**
   * The cost of an item in a cart that the customer intends to purchase. Cart lines are entries in the customer's
   * cart that represent a single unit of a product variant. For example, if a customer adds two different sizes of
   * the same t-shirt to their cart, then each size is represented as a separate cart line.
   */
  cost: CartLineCost;
  /** The ID of the cart line. */
  id: Scalars['ID']['output'];
  /** The item that the customer intends to purchase. */
  merchandise: Merchandise;
  /**
   * The [nested relationship](https://shopify.dev/docs/apps/build/product-merchandising/nested-cart-lines)
   * between this line and its parent line, if any.
   */
  parentRelationship?: Maybe<CartLineParentRelationship>;
  /** The quantity of the item that the customer intends to purchase. */
  quantity: Scalars['Int']['output'];
  /**
   * The [selling plan](https://shopify.dev/docs/apps/build/purchase-options/subscriptions/selling-plans)
   * associated with the cart line, including information about how a product variant can be sold and purchased.
   */
  sellingPlanAllocation?: Maybe<SellingPlanAllocation>;
};


/**
 * Information about an item in a cart that a customer intends to purchase. A cart line is an entry in the
 * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
 * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
 */
export type CartLineAttributeArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
};

/**
 * The cost of an item in a cart that the customer intends to purchase. Cart lines are entries in the customer's
 * cart that represent a single unit of a product variant. For example, if a customer adds two different sizes of
 * the same t-shirt to their cart, then each size is represented as a separate cart line.
 */
export type CartLineCost = {
  __typename?: 'CartLineCost';
  /**
   * The cost of a single unit. For example, if a customer purchases three units of a product
   * that are priced at $10 each, then the `amountPerQuantity` is $10.
   */
  amountPerQuantity: MoneyV2;
  /**
   * The `compareAt` price of a single unit before any discounts are applied. This field is used to calculate and display
   * savings for customers. For example, if a product's `compareAtAmountPerQuantity` is $25 and its current price
   * is $20, then the customer sees a $5 discount. This value can change based on the buyer's identity and is
   * `null` when the value is hidden from buyers.
   */
  compareAtAmountPerQuantity?: Maybe<MoneyV2>;
  /**
   * The cost of items in the cart before applying any discounts to certain items.
   * This amount serves as the starting point for calculating any potential savings customers
   * might receive through promotions or discounts.
   */
  subtotalAmount: MoneyV2;
  /** The total cost of items in a cart. */
  totalAmount: MoneyV2;
};

/** The condition for checking the minimum quantity of products across a group of cart lines. */
export type CartLineMinimumQuantity = {
  /**
   * Cart line IDs with a merchandise line price that's included to calculate the
   * minimum quantity purchased to receive the discount.
   */
  ids: Array<Scalars['ID']['input']>;
  /** The minimum quantity of a cart line to be eligible for a discount candidate. */
  minimumQuantity: Scalars['Int']['input'];
};

/** The condition for checking the minimum subtotal of products across a group of cart lines. */
export type CartLineMinimumSubtotal = {
  /**
   * Cart line IDs with a merchandise line price that's included to calculate the
   * minimum subtotal purchased to receive the discount.
   */
  ids: Array<Scalars['ID']['input']>;
  /** The minimum subtotal amount of the cart line to be eligible for a discount candidate in the shop's currency. */
  minimumAmount: Scalars['Decimal']['input'];
};

/** Represents the relationship between a cart line and its parent line. */
export type CartLineParentRelationship = {
  __typename?: 'CartLineParentRelationship';
  /** The parent line in the relationship. */
  parent: CartLine;
};

/**
 * A method for applying a discount to a specific line item in the cart. A cart line is an entry in the
 * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
 * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
 */
export type CartLineTarget = {
  /** The ID of the targeted cart line. */
  id: Scalars['ID']['input'];
  /**
   * The number of line items that are being discounted.
   * The default value is `null`, which represents the quantity of the matching line items.
   *
   * The value is validated against: > 0.
   */
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * The cart.lines.discounts.generate.fetch target result. Refer to [network access](https://shopify.dev/apps/build/functions/input-output/network-access/graphql)
 * for Shopify Functions.
 */
export type CartLinesDiscountsGenerateFetchResult = {
  /** The HTTP request object. */
  request?: InputMaybe<HttpRequest>;
};

/** The cart.lines.discounts.generate.run target result. */
export type CartLinesDiscountsGenerateRunResult = {
  /** The list of operations to apply discounts to the cart. */
  operations: Array<CartOperation>;
};

/** The operations that can be performed to apply discounts to the cart. */
export type CartOperation =
  /**
   * An operation that selects which entered discount codes to accept. Use this to
   * validate discount codes from external systems.
   */
  { enteredDiscountCodesAccept: EnteredDiscountCodesAcceptOperation; enteredDiscountCodesReject?: never; orderDiscountsAdd?: never; productDiscountsAdd?: never; }
  |  /**
   * An operation that rejects entered discount codes with a custom message. Use
   * this to conditionally reject discount codes based on business logic. This
   * operation can only be used if the function is backed by an automatic discount.
   */
  { enteredDiscountCodesAccept?: never; enteredDiscountCodesReject: EnteredDiscountCodesRejectOperation; orderDiscountsAdd?: never; productDiscountsAdd?: never; }
  |  /** An operation that applies order discounts to a cart that share a selection strategy. */
  { enteredDiscountCodesAccept?: never; enteredDiscountCodesReject?: never; orderDiscountsAdd: OrderDiscountsAddOperation; productDiscountsAdd?: never; }
  |  /** An operation that applies product discounts to a cart that share a selection strategy. */
  { enteredDiscountCodesAccept?: never; enteredDiscountCodesReject?: never; orderDiscountsAdd?: never; productDiscountsAdd: ProductDiscountsAddOperation; };

/**
 * Whether the product is in the specified collection.
 *
 * A collection is a group of products that can be displayed in online stores and other sales channels in
 * categories, which makes it easy for customers to find them. For example, an athletics store might create
 * different collections for running attire and accessories.
 */
export type CollectionMembership = {
  __typename?: 'CollectionMembership';
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the collection.
   */
  collectionId: Scalars['ID']['output'];
  /** Whether the product is in the specified collection. */
  isMember: Scalars['Boolean']['output'];
};

/** Represents information about a company which is also a customer of the shop. */
export type Company = HasMetafields & {
  __typename?: 'Company';
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was created in Shopify. */
  createdAt: Scalars['DateTime']['output'];
  /** A unique externally-supplied ID for the company. */
  externalId?: Maybe<Scalars['String']['output']>;
  /** The ID of the company. */
  id: Scalars['ID']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
  /** The name of the company. */
  name: Scalars['String']['output'];
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was last modified. */
  updatedAt: Scalars['DateTime']['output'];
};


/** Represents information about a company which is also a customer of the shop. */
export type CompanyMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** A company's main point of contact. */
export type CompanyContact = {
  __typename?: 'CompanyContact';
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company contact was created in Shopify.
   */
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the company. */
  id: Scalars['ID']['output'];
  /** The company contact's locale (language). */
  locale?: Maybe<Scalars['String']['output']>;
  /** The company contact's job title. */
  title?: Maybe<Scalars['String']['output']>;
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company contact was last modified.
   */
  updatedAt: Scalars['DateTime']['output'];
};

/** A company's location. */
export type CompanyLocation = HasMetafields & {
  __typename?: 'CompanyLocation';
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company location was created in Shopify.
   */
  createdAt: Scalars['DateTime']['output'];
  /** A unique externally-supplied ID for the company. */
  externalId?: Maybe<Scalars['String']['output']>;
  /** The ID of the company. */
  id: Scalars['ID']['output'];
  /** The preferred locale of the company location. */
  locale?: Maybe<Scalars['String']['output']>;
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
  /** The name of the company location. */
  name: Scalars['String']['output'];
  /** The number of orders placed at this company location. */
  ordersCount: Scalars['Int']['output'];
  /** The total amount spent at this company location. */
  totalSpent: MoneyV2;
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company location was last modified.
   */
  updatedAt: Scalars['DateTime']['output'];
};


/** A company's location. */
export type CompanyLocationMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** The conditions that satisfy the discount candidate to be applied to a cart line. */
export type Condition =
  /** The condition for checking the minimum quantity of products across a group of cart lines. */
  { cartLineMinimumQuantity: CartLineMinimumQuantity; cartLineMinimumSubtotal?: never; orderMinimumSubtotal?: never; }
  |  /** The condition for checking the minimum subtotal of products across a group of cart lines. */
  { cartLineMinimumQuantity?: never; cartLineMinimumSubtotal: CartLineMinimumSubtotal; orderMinimumSubtotal?: never; }
  |  /** The condition for checking the minimum subtotal amount of the order. */
  { cartLineMinimumQuantity?: never; cartLineMinimumSubtotal?: never; orderMinimumSubtotal: OrderMinimumSubtotal; };

/**
 * The country for which the store is customized, reflecting local preferences and regulations.
 * Localization might influence the language, currency, and product offerings available in a store to enhance
 * the shopping experience for customers in that region.
 */
export type Country = {
  __typename?: 'Country';
  /** The ISO code of the country. */
  isoCode: CountryCode;
};

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 */
export enum CountryCode {
  /** Ascension Island. */
  Ac = 'AC',
  /** Andorra. */
  Ad = 'AD',
  /** United Arab Emirates. */
  Ae = 'AE',
  /** Afghanistan. */
  Af = 'AF',
  /** Antigua & Barbuda. */
  Ag = 'AG',
  /** Anguilla. */
  Ai = 'AI',
  /** Albania. */
  Al = 'AL',
  /** Armenia. */
  Am = 'AM',
  /** Netherlands Antilles. */
  An = 'AN',
  /** Angola. */
  Ao = 'AO',
  /** Argentina. */
  Ar = 'AR',
  /** Austria. */
  At = 'AT',
  /** Australia. */
  Au = 'AU',
  /** Aruba. */
  Aw = 'AW',
  /** Åland Islands. */
  Ax = 'AX',
  /** Azerbaijan. */
  Az = 'AZ',
  /** Bosnia & Herzegovina. */
  Ba = 'BA',
  /** Barbados. */
  Bb = 'BB',
  /** Bangladesh. */
  Bd = 'BD',
  /** Belgium. */
  Be = 'BE',
  /** Burkina Faso. */
  Bf = 'BF',
  /** Bulgaria. */
  Bg = 'BG',
  /** Bahrain. */
  Bh = 'BH',
  /** Burundi. */
  Bi = 'BI',
  /** Benin. */
  Bj = 'BJ',
  /** St. Barthélemy. */
  Bl = 'BL',
  /** Bermuda. */
  Bm = 'BM',
  /** Brunei. */
  Bn = 'BN',
  /** Bolivia. */
  Bo = 'BO',
  /** Caribbean Netherlands. */
  Bq = 'BQ',
  /** Brazil. */
  Br = 'BR',
  /** Bahamas. */
  Bs = 'BS',
  /** Bhutan. */
  Bt = 'BT',
  /** Bouvet Island. */
  Bv = 'BV',
  /** Botswana. */
  Bw = 'BW',
  /** Belarus. */
  By = 'BY',
  /** Belize. */
  Bz = 'BZ',
  /** Canada. */
  Ca = 'CA',
  /** Cocos (Keeling) Islands. */
  Cc = 'CC',
  /** Congo - Kinshasa. */
  Cd = 'CD',
  /** Central African Republic. */
  Cf = 'CF',
  /** Congo - Brazzaville. */
  Cg = 'CG',
  /** Switzerland. */
  Ch = 'CH',
  /** Côte d’Ivoire. */
  Ci = 'CI',
  /** Cook Islands. */
  Ck = 'CK',
  /** Chile. */
  Cl = 'CL',
  /** Cameroon. */
  Cm = 'CM',
  /** China. */
  Cn = 'CN',
  /** Colombia. */
  Co = 'CO',
  /** Costa Rica. */
  Cr = 'CR',
  /** Cuba. */
  Cu = 'CU',
  /** Cape Verde. */
  Cv = 'CV',
  /** Curaçao. */
  Cw = 'CW',
  /** Christmas Island. */
  Cx = 'CX',
  /** Cyprus. */
  Cy = 'CY',
  /** Czechia. */
  Cz = 'CZ',
  /** Germany. */
  De = 'DE',
  /** Djibouti. */
  Dj = 'DJ',
  /** Denmark. */
  Dk = 'DK',
  /** Dominica. */
  Dm = 'DM',
  /** Dominican Republic. */
  Do = 'DO',
  /** Algeria. */
  Dz = 'DZ',
  /** Ecuador. */
  Ec = 'EC',
  /** Estonia. */
  Ee = 'EE',
  /** Egypt. */
  Eg = 'EG',
  /** Western Sahara. */
  Eh = 'EH',
  /** Eritrea. */
  Er = 'ER',
  /** Spain. */
  Es = 'ES',
  /** Ethiopia. */
  Et = 'ET',
  /** Finland. */
  Fi = 'FI',
  /** Fiji. */
  Fj = 'FJ',
  /** Falkland Islands. */
  Fk = 'FK',
  /** Faroe Islands. */
  Fo = 'FO',
  /** France. */
  Fr = 'FR',
  /** Gabon. */
  Ga = 'GA',
  /** United Kingdom. */
  Gb = 'GB',
  /** Grenada. */
  Gd = 'GD',
  /** Georgia. */
  Ge = 'GE',
  /** French Guiana. */
  Gf = 'GF',
  /** Guernsey. */
  Gg = 'GG',
  /** Ghana. */
  Gh = 'GH',
  /** Gibraltar. */
  Gi = 'GI',
  /** Greenland. */
  Gl = 'GL',
  /** Gambia. */
  Gm = 'GM',
  /** Guinea. */
  Gn = 'GN',
  /** Guadeloupe. */
  Gp = 'GP',
  /** Equatorial Guinea. */
  Gq = 'GQ',
  /** Greece. */
  Gr = 'GR',
  /** South Georgia & South Sandwich Islands. */
  Gs = 'GS',
  /** Guatemala. */
  Gt = 'GT',
  /** Guinea-Bissau. */
  Gw = 'GW',
  /** Guyana. */
  Gy = 'GY',
  /** Hong Kong SAR. */
  Hk = 'HK',
  /** Heard & McDonald Islands. */
  Hm = 'HM',
  /** Honduras. */
  Hn = 'HN',
  /** Croatia. */
  Hr = 'HR',
  /** Haiti. */
  Ht = 'HT',
  /** Hungary. */
  Hu = 'HU',
  /** Indonesia. */
  Id = 'ID',
  /** Ireland. */
  Ie = 'IE',
  /** Israel. */
  Il = 'IL',
  /** Isle of Man. */
  Im = 'IM',
  /** India. */
  In = 'IN',
  /** British Indian Ocean Territory. */
  Io = 'IO',
  /** Iraq. */
  Iq = 'IQ',
  /** Iran. */
  Ir = 'IR',
  /** Iceland. */
  Is = 'IS',
  /** Italy. */
  It = 'IT',
  /** Jersey. */
  Je = 'JE',
  /** Jamaica. */
  Jm = 'JM',
  /** Jordan. */
  Jo = 'JO',
  /** Japan. */
  Jp = 'JP',
  /** Kenya. */
  Ke = 'KE',
  /** Kyrgyzstan. */
  Kg = 'KG',
  /** Cambodia. */
  Kh = 'KH',
  /** Kiribati. */
  Ki = 'KI',
  /** Comoros. */
  Km = 'KM',
  /** St. Kitts & Nevis. */
  Kn = 'KN',
  /** North Korea. */
  Kp = 'KP',
  /** South Korea. */
  Kr = 'KR',
  /** Kuwait. */
  Kw = 'KW',
  /** Cayman Islands. */
  Ky = 'KY',
  /** Kazakhstan. */
  Kz = 'KZ',
  /** Laos. */
  La = 'LA',
  /** Lebanon. */
  Lb = 'LB',
  /** St. Lucia. */
  Lc = 'LC',
  /** Liechtenstein. */
  Li = 'LI',
  /** Sri Lanka. */
  Lk = 'LK',
  /** Liberia. */
  Lr = 'LR',
  /** Lesotho. */
  Ls = 'LS',
  /** Lithuania. */
  Lt = 'LT',
  /** Luxembourg. */
  Lu = 'LU',
  /** Latvia. */
  Lv = 'LV',
  /** Libya. */
  Ly = 'LY',
  /** Morocco. */
  Ma = 'MA',
  /** Monaco. */
  Mc = 'MC',
  /** Moldova. */
  Md = 'MD',
  /** Montenegro. */
  Me = 'ME',
  /** St. Martin. */
  Mf = 'MF',
  /** Madagascar. */
  Mg = 'MG',
  /** North Macedonia. */
  Mk = 'MK',
  /** Mali. */
  Ml = 'ML',
  /** Myanmar (Burma). */
  Mm = 'MM',
  /** Mongolia. */
  Mn = 'MN',
  /** Macao SAR. */
  Mo = 'MO',
  /** Martinique. */
  Mq = 'MQ',
  /** Mauritania. */
  Mr = 'MR',
  /** Montserrat. */
  Ms = 'MS',
  /** Malta. */
  Mt = 'MT',
  /** Mauritius. */
  Mu = 'MU',
  /** Maldives. */
  Mv = 'MV',
  /** Malawi. */
  Mw = 'MW',
  /** Mexico. */
  Mx = 'MX',
  /** Malaysia. */
  My = 'MY',
  /** Mozambique. */
  Mz = 'MZ',
  /** Namibia. */
  Na = 'NA',
  /** New Caledonia. */
  Nc = 'NC',
  /** Niger. */
  Ne = 'NE',
  /** Norfolk Island. */
  Nf = 'NF',
  /** Nigeria. */
  Ng = 'NG',
  /** Nicaragua. */
  Ni = 'NI',
  /** Netherlands. */
  Nl = 'NL',
  /** Norway. */
  No = 'NO',
  /** Nepal. */
  Np = 'NP',
  /** Nauru. */
  Nr = 'NR',
  /** Niue. */
  Nu = 'NU',
  /** New Zealand. */
  Nz = 'NZ',
  /** Oman. */
  Om = 'OM',
  /** Panama. */
  Pa = 'PA',
  /** Peru. */
  Pe = 'PE',
  /** French Polynesia. */
  Pf = 'PF',
  /** Papua New Guinea. */
  Pg = 'PG',
  /** Philippines. */
  Ph = 'PH',
  /** Pakistan. */
  Pk = 'PK',
  /** Poland. */
  Pl = 'PL',
  /** St. Pierre & Miquelon. */
  Pm = 'PM',
  /** Pitcairn Islands. */
  Pn = 'PN',
  /** Palestinian Territories. */
  Ps = 'PS',
  /** Portugal. */
  Pt = 'PT',
  /** Paraguay. */
  Py = 'PY',
  /** Qatar. */
  Qa = 'QA',
  /** Réunion. */
  Re = 'RE',
  /** Romania. */
  Ro = 'RO',
  /** Serbia. */
  Rs = 'RS',
  /** Russia. */
  Ru = 'RU',
  /** Rwanda. */
  Rw = 'RW',
  /** Saudi Arabia. */
  Sa = 'SA',
  /** Solomon Islands. */
  Sb = 'SB',
  /** Seychelles. */
  Sc = 'SC',
  /** Sudan. */
  Sd = 'SD',
  /** Sweden. */
  Se = 'SE',
  /** Singapore. */
  Sg = 'SG',
  /** St. Helena. */
  Sh = 'SH',
  /** Slovenia. */
  Si = 'SI',
  /** Svalbard & Jan Mayen. */
  Sj = 'SJ',
  /** Slovakia. */
  Sk = 'SK',
  /** Sierra Leone. */
  Sl = 'SL',
  /** San Marino. */
  Sm = 'SM',
  /** Senegal. */
  Sn = 'SN',
  /** Somalia. */
  So = 'SO',
  /** Suriname. */
  Sr = 'SR',
  /** South Sudan. */
  Ss = 'SS',
  /** São Tomé & Príncipe. */
  St = 'ST',
  /** El Salvador. */
  Sv = 'SV',
  /** Sint Maarten. */
  Sx = 'SX',
  /** Syria. */
  Sy = 'SY',
  /** Eswatini. */
  Sz = 'SZ',
  /** Tristan da Cunha. */
  Ta = 'TA',
  /** Turks & Caicos Islands. */
  Tc = 'TC',
  /** Chad. */
  Td = 'TD',
  /** French Southern Territories. */
  Tf = 'TF',
  /** Togo. */
  Tg = 'TG',
  /** Thailand. */
  Th = 'TH',
  /** Tajikistan. */
  Tj = 'TJ',
  /** Tokelau. */
  Tk = 'TK',
  /** Timor-Leste. */
  Tl = 'TL',
  /** Turkmenistan. */
  Tm = 'TM',
  /** Tunisia. */
  Tn = 'TN',
  /** Tonga. */
  To = 'TO',
  /** Türkiye. */
  Tr = 'TR',
  /** Trinidad & Tobago. */
  Tt = 'TT',
  /** Tuvalu. */
  Tv = 'TV',
  /** Taiwan. */
  Tw = 'TW',
  /** Tanzania. */
  Tz = 'TZ',
  /** Ukraine. */
  Ua = 'UA',
  /** Uganda. */
  Ug = 'UG',
  /** U.S. Outlying Islands. */
  Um = 'UM',
  /** United States. */
  Us = 'US',
  /** Uruguay. */
  Uy = 'UY',
  /** Uzbekistan. */
  Uz = 'UZ',
  /** Vatican City. */
  Va = 'VA',
  /** St. Vincent & Grenadines. */
  Vc = 'VC',
  /** Venezuela. */
  Ve = 'VE',
  /** British Virgin Islands. */
  Vg = 'VG',
  /** Vietnam. */
  Vn = 'VN',
  /** Vanuatu. */
  Vu = 'VU',
  /** Wallis & Futuna. */
  Wf = 'WF',
  /** Samoa. */
  Ws = 'WS',
  /** Kosovo. */
  Xk = 'XK',
  /** Yemen. */
  Ye = 'YE',
  /** Mayotte. */
  Yt = 'YT',
  /** South Africa. */
  Za = 'ZA',
  /** Zambia. */
  Zm = 'ZM',
  /** Zimbabwe. */
  Zw = 'ZW',
  /** Unknown Region. */
  Zz = 'ZZ'
}

/**
 * The currency codes that represent the world currencies throughout the Admin API. Currency codes include
 * [standard ISO 4217 codes](https://en.wikipedia.org/wiki/ISO_4217), legacy codes, non-standard codes,
 * digital currency codes.
 */
export enum CurrencyCode {
  /** United Arab Emirates Dirham (AED). */
  Aed = 'AED',
  /** Afghan Afghani (AFN). */
  Afn = 'AFN',
  /** Albanian Lek (ALL). */
  All = 'ALL',
  /** Armenian Dram (AMD). */
  Amd = 'AMD',
  /** Netherlands Antillean Guilder. */
  Ang = 'ANG',
  /** Angolan Kwanza (AOA). */
  Aoa = 'AOA',
  /** Argentine Pesos (ARS). */
  Ars = 'ARS',
  /** Australian Dollars (AUD). */
  Aud = 'AUD',
  /** Aruban Florin (AWG). */
  Awg = 'AWG',
  /** Azerbaijani Manat (AZN). */
  Azn = 'AZN',
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  Bam = 'BAM',
  /** Barbadian Dollar (BBD). */
  Bbd = 'BBD',
  /** Bangladesh Taka (BDT). */
  Bdt = 'BDT',
  /** Bulgarian Lev (BGN). */
  Bgn = 'BGN',
  /** Bahraini Dinar (BHD). */
  Bhd = 'BHD',
  /** Burundian Franc (BIF). */
  Bif = 'BIF',
  /** Bermudian Dollar (BMD). */
  Bmd = 'BMD',
  /** Brunei Dollar (BND). */
  Bnd = 'BND',
  /** Bolivian Boliviano (BOB). */
  Bob = 'BOB',
  /** Brazilian Real (BRL). */
  Brl = 'BRL',
  /** Bahamian Dollar (BSD). */
  Bsd = 'BSD',
  /** Bhutanese Ngultrum (BTN). */
  Btn = 'BTN',
  /** Botswana Pula (BWP). */
  Bwp = 'BWP',
  /** Belarusian Ruble (BYN). */
  Byn = 'BYN',
  /**
   * Belarusian Ruble (BYR).
   * @deprecated Use `BYN` instead.
   */
  Byr = 'BYR',
  /** Belize Dollar (BZD). */
  Bzd = 'BZD',
  /** Canadian Dollars (CAD). */
  Cad = 'CAD',
  /** Congolese franc (CDF). */
  Cdf = 'CDF',
  /** Swiss Francs (CHF). */
  Chf = 'CHF',
  /** Chilean Peso (CLP). */
  Clp = 'CLP',
  /** Chinese Yuan Renminbi (CNY). */
  Cny = 'CNY',
  /** Colombian Peso (COP). */
  Cop = 'COP',
  /** Costa Rican Colones (CRC). */
  Crc = 'CRC',
  /** Cape Verdean escudo (CVE). */
  Cve = 'CVE',
  /** Czech Koruny (CZK). */
  Czk = 'CZK',
  /** Djiboutian Franc (DJF). */
  Djf = 'DJF',
  /** Danish Kroner (DKK). */
  Dkk = 'DKK',
  /** Dominican Peso (DOP). */
  Dop = 'DOP',
  /** Algerian Dinar (DZD). */
  Dzd = 'DZD',
  /** Egyptian Pound (EGP). */
  Egp = 'EGP',
  /** Eritrean Nakfa (ERN). */
  Ern = 'ERN',
  /** Ethiopian Birr (ETB). */
  Etb = 'ETB',
  /** Euro (EUR). */
  Eur = 'EUR',
  /** Fijian Dollars (FJD). */
  Fjd = 'FJD',
  /** Falkland Islands Pounds (FKP). */
  Fkp = 'FKP',
  /** United Kingdom Pounds (GBP). */
  Gbp = 'GBP',
  /** Georgian Lari (GEL). */
  Gel = 'GEL',
  /** Ghanaian Cedi (GHS). */
  Ghs = 'GHS',
  /** Gibraltar Pounds (GIP). */
  Gip = 'GIP',
  /** Gambian Dalasi (GMD). */
  Gmd = 'GMD',
  /** Guinean Franc (GNF). */
  Gnf = 'GNF',
  /** Guatemalan Quetzal (GTQ). */
  Gtq = 'GTQ',
  /** Guyanese Dollar (GYD). */
  Gyd = 'GYD',
  /** Hong Kong Dollars (HKD). */
  Hkd = 'HKD',
  /** Honduran Lempira (HNL). */
  Hnl = 'HNL',
  /** Croatian Kuna (HRK). */
  Hrk = 'HRK',
  /** Haitian Gourde (HTG). */
  Htg = 'HTG',
  /** Hungarian Forint (HUF). */
  Huf = 'HUF',
  /** Indonesian Rupiah (IDR). */
  Idr = 'IDR',
  /** Israeli New Shekel (NIS). */
  Ils = 'ILS',
  /** Indian Rupees (INR). */
  Inr = 'INR',
  /** Iraqi Dinar (IQD). */
  Iqd = 'IQD',
  /** Iranian Rial (IRR). */
  Irr = 'IRR',
  /** Icelandic Kronur (ISK). */
  Isk = 'ISK',
  /** Jersey Pound. */
  Jep = 'JEP',
  /** Jamaican Dollars (JMD). */
  Jmd = 'JMD',
  /** Jordanian Dinar (JOD). */
  Jod = 'JOD',
  /** Japanese Yen (JPY). */
  Jpy = 'JPY',
  /** Kenyan Shilling (KES). */
  Kes = 'KES',
  /** Kyrgyzstani Som (KGS). */
  Kgs = 'KGS',
  /** Cambodian Riel. */
  Khr = 'KHR',
  /** Kiribati Dollar (KID). */
  Kid = 'KID',
  /** Comorian Franc (KMF). */
  Kmf = 'KMF',
  /** South Korean Won (KRW). */
  Krw = 'KRW',
  /** Kuwaiti Dinar (KWD). */
  Kwd = 'KWD',
  /** Cayman Dollars (KYD). */
  Kyd = 'KYD',
  /** Kazakhstani Tenge (KZT). */
  Kzt = 'KZT',
  /** Laotian Kip (LAK). */
  Lak = 'LAK',
  /** Lebanese Pounds (LBP). */
  Lbp = 'LBP',
  /** Sri Lankan Rupees (LKR). */
  Lkr = 'LKR',
  /** Liberian Dollar (LRD). */
  Lrd = 'LRD',
  /** Lesotho Loti (LSL). */
  Lsl = 'LSL',
  /** Lithuanian Litai (LTL). */
  Ltl = 'LTL',
  /** Latvian Lati (LVL). */
  Lvl = 'LVL',
  /** Libyan Dinar (LYD). */
  Lyd = 'LYD',
  /** Moroccan Dirham. */
  Mad = 'MAD',
  /** Moldovan Leu (MDL). */
  Mdl = 'MDL',
  /** Malagasy Ariary (MGA). */
  Mga = 'MGA',
  /** Macedonia Denar (MKD). */
  Mkd = 'MKD',
  /** Burmese Kyat (MMK). */
  Mmk = 'MMK',
  /** Mongolian Tugrik. */
  Mnt = 'MNT',
  /** Macanese Pataca (MOP). */
  Mop = 'MOP',
  /** Mauritanian Ouguiya (MRU). */
  Mru = 'MRU',
  /** Mauritian Rupee (MUR). */
  Mur = 'MUR',
  /** Maldivian Rufiyaa (MVR). */
  Mvr = 'MVR',
  /** Malawian Kwacha (MWK). */
  Mwk = 'MWK',
  /** Mexican Pesos (MXN). */
  Mxn = 'MXN',
  /** Malaysian Ringgits (MYR). */
  Myr = 'MYR',
  /** Mozambican Metical. */
  Mzn = 'MZN',
  /** Namibian Dollar. */
  Nad = 'NAD',
  /** Nigerian Naira (NGN). */
  Ngn = 'NGN',
  /** Nicaraguan Córdoba (NIO). */
  Nio = 'NIO',
  /** Norwegian Kroner (NOK). */
  Nok = 'NOK',
  /** Nepalese Rupee (NPR). */
  Npr = 'NPR',
  /** New Zealand Dollars (NZD). */
  Nzd = 'NZD',
  /** Omani Rial (OMR). */
  Omr = 'OMR',
  /** Panamian Balboa (PAB). */
  Pab = 'PAB',
  /** Peruvian Nuevo Sol (PEN). */
  Pen = 'PEN',
  /** Papua New Guinean Kina (PGK). */
  Pgk = 'PGK',
  /** Philippine Peso (PHP). */
  Php = 'PHP',
  /** Pakistani Rupee (PKR). */
  Pkr = 'PKR',
  /** Polish Zlotych (PLN). */
  Pln = 'PLN',
  /** Paraguayan Guarani (PYG). */
  Pyg = 'PYG',
  /** Qatari Rial (QAR). */
  Qar = 'QAR',
  /** Romanian Lei (RON). */
  Ron = 'RON',
  /** Serbian dinar (RSD). */
  Rsd = 'RSD',
  /** Russian Rubles (RUB). */
  Rub = 'RUB',
  /** Rwandan Franc (RWF). */
  Rwf = 'RWF',
  /** Saudi Riyal (SAR). */
  Sar = 'SAR',
  /** Solomon Islands Dollar (SBD). */
  Sbd = 'SBD',
  /** Seychellois Rupee (SCR). */
  Scr = 'SCR',
  /** Sudanese Pound (SDG). */
  Sdg = 'SDG',
  /** Swedish Kronor (SEK). */
  Sek = 'SEK',
  /** Singapore Dollars (SGD). */
  Sgd = 'SGD',
  /** Saint Helena Pounds (SHP). */
  Shp = 'SHP',
  /** Sierra Leonean Leone (SLL). */
  Sll = 'SLL',
  /** Somali Shilling (SOS). */
  Sos = 'SOS',
  /** Surinamese Dollar (SRD). */
  Srd = 'SRD',
  /** South Sudanese Pound (SSP). */
  Ssp = 'SSP',
  /**
   * Sao Tome And Principe Dobra (STD).
   * @deprecated Use `STN` instead.
   */
  Std = 'STD',
  /** Sao Tome And Principe Dobra (STN). */
  Stn = 'STN',
  /** Syrian Pound (SYP). */
  Syp = 'SYP',
  /** Swazi Lilangeni (SZL). */
  Szl = 'SZL',
  /** Thai baht (THB). */
  Thb = 'THB',
  /** Tajikistani Somoni (TJS). */
  Tjs = 'TJS',
  /** Turkmenistani Manat (TMT). */
  Tmt = 'TMT',
  /** Tunisian Dinar (TND). */
  Tnd = 'TND',
  /** Tongan Pa'anga (TOP). */
  Top = 'TOP',
  /** Turkish Lira (TRY). */
  Try = 'TRY',
  /** Trinidad and Tobago Dollars (TTD). */
  Ttd = 'TTD',
  /** Taiwan Dollars (TWD). */
  Twd = 'TWD',
  /** Tanzanian Shilling (TZS). */
  Tzs = 'TZS',
  /** Ukrainian Hryvnia (UAH). */
  Uah = 'UAH',
  /** Ugandan Shilling (UGX). */
  Ugx = 'UGX',
  /** United States Dollars (USD). */
  Usd = 'USD',
  /** United States Dollars Coin (USDC). */
  Usdc = 'USDC',
  /** Uruguayan Pesos (UYU). */
  Uyu = 'UYU',
  /** Uzbekistan som (UZS). */
  Uzs = 'UZS',
  /** Venezuelan Bolivares (VED). */
  Ved = 'VED',
  /**
   * Venezuelan Bolivares (VEF).
   * @deprecated Use `VES` instead.
   */
  Vef = 'VEF',
  /** Venezuelan Bolivares Soberanos (VES). */
  Ves = 'VES',
  /** Vietnamese đồng (VND). */
  Vnd = 'VND',
  /** Vanuatu Vatu (VUV). */
  Vuv = 'VUV',
  /** Samoan Tala (WST). */
  Wst = 'WST',
  /** Central African CFA Franc (XAF). */
  Xaf = 'XAF',
  /** East Caribbean Dollar (XCD). */
  Xcd = 'XCD',
  /** West African CFA franc (XOF). */
  Xof = 'XOF',
  /** CFP Franc (XPF). */
  Xpf = 'XPF',
  /** Unrecognized currency. */
  Xxx = 'XXX',
  /** Yemeni Rial (YER). */
  Yer = 'YER',
  /** South African Rand (ZAR). */
  Zar = 'ZAR',
  /** Zambian Kwacha (ZMW). */
  Zmw = 'ZMW'
}

/**
 * A custom product represents a product that doesn't map to Shopify's
 * [standard product categories](https://help.shopify.com/manual/products/details/product-type).
 * For example, you can use a custom product to manage gift cards, shipping requirements, localized product
 * information, or weight measurements and conversions.
 */
export type CustomProduct = {
  __typename?: 'CustomProduct';
  /** Whether the merchandise is a gift card. */
  isGiftCard: Scalars['Boolean']['output'];
  /**
   * Whether the item needs to be shipped to the customer. For example, a
   * digital gift card doesn't need to be shipped, but a t-shirt does
   * need to be shipped.
   */
  requiresShipping: Scalars['Boolean']['output'];
  /**
   * The localized name for the product that displays to customers. The title is used to construct the product's
   * handle, which is a unique, human-readable string of the product's title. For example, if a product is titled
   * "Black Sunglasses", then the handle is `black-sunglasses`.
   */
  title: Scalars['String']['output'];
  /** The product variant's weight, in the system of measurement set in the `weightUnit` field. */
  weight?: Maybe<Scalars['Float']['output']>;
  /** The unit of measurement for weight. */
  weightUnit: WeightUnit;
};

/**
 * Represents a [customer](https://help.shopify.com/manual/customers/manage-customers).
 * `Customer` returns data including the customer's contact information and order history.
 */
export type Customer = HasMetafields & {
  __typename?: 'Customer';
  /**
   * The total amount that the customer has spent on orders.
   * The amount is converted from the shop's currency to the currency of the cart using a market rate.
   */
  amountSpent: MoneyV2;
  /**
   * The full name of the customer, based on the values for `firstName` and `lastName`.
   * If `firstName` and `lastName` aren't specified, then the value is the customer's email address.
   * If the email address isn't specified, then the value is the customer's phone number.
   */
  displayName: Scalars['String']['output'];
  /** The customer's email address. */
  email?: Maybe<Scalars['String']['output']>;
  /** The customer's first name. */
  firstName?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the customer is associated with any of the specified tags. The customer must have at least one tag
   * from the list to return `true`.
   */
  hasAnyTag: Scalars['Boolean']['output'];
  /** Whether the customer is associated with the specified tags. */
  hasTags: Array<HasTagResponse>;
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the customer.
   */
  id: Scalars['ID']['output'];
  /** The customer's last name. */
  lastName?: Maybe<Scalars['String']['output']>;
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
  /** The total number of orders that the customer has made at the store. */
  numberOfOrders: Scalars['Int']['output'];
};


/**
 * Represents a [customer](https://help.shopify.com/manual/customers/manage-customers).
 * `Customer` returns data including the customer's contact information and order history.
 */
export type CustomerHasAnyTagArgs = {
  tags?: Array<Scalars['String']['input']>;
};


/**
 * Represents a [customer](https://help.shopify.com/manual/customers/manage-customers).
 * `Customer` returns data including the customer's contact information and order history.
 */
export type CustomerHasTagsArgs = {
  tags?: Array<Scalars['String']['input']>;
};


/**
 * Represents a [customer](https://help.shopify.com/manual/customers/manage-customers).
 * `Customer` returns data including the customer's contact information and order history.
 */
export type CustomerMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Represents information about the merchandise in the cart. */
export type DeliverableCartLine = {
  __typename?: 'DeliverableCartLine';
  /**
   * The custom attributes associated with a cart to store additional information. Cart attributes
   * allow you to collect specific information from customers on the **Cart** page, such as order notes,
   * gift wrapping requests, or custom product details. Attributes are stored as key-value pairs.
   *
   * Cart line attributes are equivalent to the
   * [`line_item`](https://shopify.dev/docs/api/liquid/objects/line_item)
   * object in Liquid.
   */
  attribute?: Maybe<Attribute>;
  /** The ID of the cart line. */
  id: Scalars['ID']['output'];
  /** The item that the customer intends to purchase. */
  merchandise: Merchandise;
  /** The quantity of the item that the customer intends to purchase. */
  quantity: Scalars['Int']['output'];
};


/** Represents information about the merchandise in the cart. */
export type DeliverableCartLineAttributeArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
};

/** The discount that's eligible to be applied to a delivery. */
export type DeliveryDiscountCandidate = {
  /**
   * An optional discount code associated with this discount candidate, for use
   * with automatic discounts. If a code discount is the function trigger, the
   * associated discount code will be overwritten by the triggering discount code.
   */
  associatedDiscountCode?: InputMaybe<AssociatedDiscountCode>;
  /**
   * A notification on the **Cart** page informs customers about available
   * discounts. If an automatic discount applies, the notification displays this
   * message, such as "Save 20% on all t-shirts." If a discount code is entered,
   * the notification displays the code instead.
   */
  message?: InputMaybe<Scalars['String']['input']>;
  /** The targets of the discount that are eligible to be applied to a delivery. */
  targets: Array<DeliveryDiscountCandidateTarget>;
  /** The value of the discount that's eligible to be applied to a delivery. */
  value: DeliveryDiscountCandidateValue;
};

/** The target of the eligible delivery discount. */
export type DeliveryDiscountCandidateTarget =
  /**
   * A method for applying a discount to a delivery group. Delivery groups streamline
   * fulfillment by organizing items that can be shipped together, based on the customer's shipping address.
   * For example, if a customer orders a t-shirt and a pair of shoes that can be shipped together, then the
   * items are included in the same delivery group.
   */
  { deliveryGroup: DeliveryGroupTarget; deliveryOption?: never; }
  |  /**
   * A method for applying a discount to a delivery option within a delivery group.
   * Delivery options are the different ways that customers can choose to have their
   * orders shipped. Examples of delivery options include express shipping or standard shipping.
   */
  { deliveryGroup?: never; deliveryOption: DeliveryOptionTarget; };

/** The value of the eligible delivery discount. */
export type DeliveryDiscountCandidateValue =
  /** A fixed amount value. */
  { fixedAmount: FixedAmount; percentage?: never; }
  |  /** A percentage value. */
  { fixedAmount?: never; percentage: Percentage; };

/** The strategy that's applied to the list of discounts that are eligible to be applied to a delivery. */
export enum DeliveryDiscountSelectionStrategy {
  /**
   * Apply all discounts that are eligible to be applied to a delivery with
   * conditions that are satisfied. This doesn't override
   * discount combination or stacking rules.
   */
  All = 'ALL'
}

/**
 * Applies delivery discounts to a cart that share a method for determining which
 * shipping and delivery discounts to apply when multiple discounts are eligible.
 */
export type DeliveryDiscountsAddOperation = {
  /** The list of discounts that are eligible to be applied to a delivery. */
  candidates: Array<DeliveryDiscountCandidate>;
  /**
   * The method for determining which shipping and delivery discounts to apply when
   * multiple discounts are eligible. For example, when the "ALL" strategy is
   * selected, every shipping and delivery discount that qualifies is applied to
   * the cart (for example, free shipping on orders over $50 and $5 off express
   * shipping). This controls how shipping and delivery discounts interact when
   * multiple conditions are satisfied simultaneously.
   */
  selectionStrategy: DeliveryDiscountSelectionStrategy;
};

/**
 * A method for applying a discount to a delivery group. Delivery groups streamline
 * fulfillment by organizing items that can be shipped together, based on the customer's shipping address.
 * For example, if a customer orders a t-shirt and a pair of shoes that can be shipped together, then the
 * items are included in the same delivery group.
 */
export type DeliveryGroupTarget = {
  /** The ID of the target delivery group. */
  id: Scalars['ID']['input'];
};

/** List of different delivery method types. */
export enum DeliveryMethod {
  /** Local Delivery. */
  Local = 'LOCAL',
  /** None. */
  None = 'NONE',
  /** Shipping to a Pickup Point. */
  PickupPoint = 'PICKUP_POINT',
  /** Local Pickup. */
  PickUp = 'PICK_UP',
  /** Retail. */
  Retail = 'RETAIL',
  /** Shipping. */
  Shipping = 'SHIPPING'
}

/**
 * The operations to apply discounts to shipping and delivery charges in a
 * customer's cart. These operations allow you to reduce the cost of shipping by
 * applying percentage or fixed-amount discounts to specific delivery options (such
 * as standard shipping and express shipping) or delivery groups (such as
 * collections of delivery options).
 */
export type DeliveryOperation =
  /**
   * Applies delivery discounts to a cart that share a method for determining which
   * shipping and delivery discounts to apply when multiple discounts are eligible.
   */
  { deliveryDiscountsAdd: DeliveryDiscountsAddOperation; enteredDiscountCodesAccept?: never; enteredDiscountCodesReject?: never; }
  |  /**
   * An operation that selects which entered discount codes to accept. Use this to
   * validate discount codes from external systems.
   */
  { deliveryDiscountsAdd?: never; enteredDiscountCodesAccept: EnteredDiscountCodesAcceptOperation; enteredDiscountCodesReject?: never; }
  |  /**
   * An operation that rejects entered discount codes with a custom message. Use
   * this to conditionally reject discount codes based on business logic. This
   * operation can only be used if the function is backed by an automatic discount.
   */
  { deliveryDiscountsAdd?: never; enteredDiscountCodesAccept?: never; enteredDiscountCodesReject: EnteredDiscountCodesRejectOperation; };

/**
 * A method for applying a discount to a delivery option within a delivery group.
 * Delivery options are the different ways that customers can choose to have their
 * orders shipped. Examples of delivery options include express shipping or standard shipping.
 */
export type DeliveryOptionTarget = {
  /** The handle of the target delivery option. */
  handle: Scalars['Handle']['input'];
};

/** The discount that invoked the [Discount Function](https://shopify.dev/docs/apps/build/discounts#build-with-shopify-functions)). */
export type Discount = HasMetafields & {
  __typename?: 'Discount';
  /** The [discount classes](https://shopify.dev/docs/apps/build/discounts/#discount-classes) that the [discountNode](https://shopify.dev/docs/api/admin-graphql/latest/queries/discountNode) supports. */
  discountClasses: Array<DiscountClass>;
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
};


/** The discount that invoked the [Discount Function](https://shopify.dev/docs/apps/build/discounts#build-with-shopify-functions)). */
export type DiscountMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/**
 * The [discount class](https://help.shopify.com/manual/discounts/combining-discounts/discount-combinations)
 * that's used to control how discounts can be combined.
 */
export enum DiscountClass {
  /**
   * The discount is combined with an
   * [order discount](https://help.shopify.com/manual/discounts/combining-discounts/discount-combinations)
   * class.
   */
  Order = 'ORDER',
  /**
   * The discount is combined with a
   * [product discount](https://help.shopify.com/manual/discounts/combining-discounts/discount-combinations)
   * class.
   */
  Product = 'PRODUCT',
  /**
   * The discount is combined with a
   * [shipping discount](https://help.shopify.com/manual/discounts/combining-discounts/discount-combinations)
   * class.
   */
  Shipping = 'SHIPPING'
}

/** A discount code used by the buyer to add a discount to the cart. */
export type DiscountCode = {
  /** The discount code. */
  code: Scalars['String']['input'];
};

/** A discount code entered by the customer. */
export type EnteredDiscountCode = {
  __typename?: 'EnteredDiscountCode';
  /** The discount code. */
  code: Scalars['String']['output'];
  /**
   * Indicates whether the entered discount code can be rejected.
   *
   * A discount code can't be rejected if it's associated with a discount that has already been applied to the cart.
   */
  rejectable: Scalars['Boolean']['output'];
};

/** An operation that selects which entered discount codes to accept. Use this to validate discount codes from external systems. */
export type EnteredDiscountCodesAcceptOperation = {
  /** The list of discount codes to accept. */
  codes: Array<DiscountCode>;
};

/**
 * An operation that rejects entered discount codes with a custom message. Use this
 * to conditionally reject discount codes based on business logic. This operation
 * can only be used if the function is backed by an automatic discount.
 */
export type EnteredDiscountCodesRejectOperation = {
  /** The list of discount codes to reject. */
  codes: Array<RejectedDiscountCode>;
  /** The custom message to display to the customer when the discount codes are rejected. */
  message: Scalars['String']['input'];
};

/** A fixed amount value. */
export type FixedAmount = {
  /**
   * The fixed amount value of the discount, in the currency of the cart.
   *
   * The amount must be greater than or equal to 0.
   */
  amount: Scalars['Decimal']['input'];
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafields = {
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
};


/** Represents information about the metafields associated to the specified resource. */
export type HasMetafieldsMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Whether a Shopify resource, such as a product or customer, has a specified tag. */
export type HasTagResponse = {
  __typename?: 'HasTagResponse';
  /** Whether the Shopify resource has the tag. */
  hasTag: Scalars['Boolean']['output'];
  /**
   * A searchable keyword that's associated with a Shopify resource, such as a product or customer. For example,
   * a merchant might apply the `sports` and `summer` tags to products that are associated with sportswear for
   * summer.
   */
  tag: Scalars['String']['output'];
};

/** The attributes associated with an HTTP request. */
export type HttpRequest = {
  /**
   * The HTTP request body as a plain string.
   * Use this field when the body isn't in JSON format.
   */
  body?: InputMaybe<Scalars['String']['input']>;
  /** The HTTP headers. */
  headers: Array<HttpRequestHeader>;
  /**
   * The HTTP request body as a JSON object.
   * Use this field when the body's in JSON format, to reduce function instruction consumption
   * and to ensure the body's formatted in logs.
   * Don't use this field together with the `body` field. If both are provided, then the `body` field
   * will take precedence.
   * If this field is specified and no `Content-Type` header is included, then the header will
   * automatically be set to `application/json`.
   */
  jsonBody?: InputMaybe<Scalars['JSON']['input']>;
  /** The HTTP method. */
  method: HttpRequestMethod;
  /** Policy attached to the HTTP request. */
  policy: HttpRequestPolicy;
  /** The HTTP url (eg.: https://example.com). The scheme needs to be HTTPS. */
  url: Scalars['URL']['input'];
};

/** The attributes associated with an HTTP request header. */
export type HttpRequestHeader = {
  /** Header name. */
  name: Scalars['String']['input'];
  /** Header value. */
  value: Scalars['String']['input'];
};

/** The HTTP request available methods. */
export enum HttpRequestMethod {
  /** Http GET. */
  Get = 'GET',
  /** Http POST. */
  Post = 'POST'
}

/** The attributes associated with an HTTP request policy. */
export type HttpRequestPolicy = {
  /** Read timeout in milliseconds. */
  readTimeoutMs: Scalars['Int']['input'];
};

/** The attributes associated with an HTTP response. */
export type HttpResponse = {
  __typename?: 'HttpResponse';
  /**
   * The HTTP response body as a plain string.
   * Use this field when the body is not in JSON format.
   */
  body?: Maybe<Scalars['String']['output']>;
  /** An HTTP header. */
  header?: Maybe<HttpResponseHeader>;
  /**
   * The HTTP headers.
   * @deprecated Use `header` instead.
   */
  headers: Array<HttpResponseHeader>;
  /**
   * The HTTP response body parsed as JSON.
   * If the body is valid JSON, it will be parsed and returned as a JSON object.
   * If parsing fails, then raw body is returned as a string.
   * Use this field when you expect the response to be JSON, or when you're dealing
   * with mixed response types, meaning both JSON and non-JSON.
   * Using this field reduces function instruction consumption and ensures that the data is formatted in logs.
   * To prevent increasing the function target input size unnecessarily, avoid querying
   * both `body` and `jsonBody` simultaneously.
   */
  jsonBody?: Maybe<Scalars['JSON']['output']>;
  /** The HTTP status code. */
  status: Scalars['Int']['output'];
};


/** The attributes associated with an HTTP response. */
export type HttpResponseHeaderArgs = {
  name: Scalars['String']['input'];
};

/** The attributes associated with an HTTP response header. */
export type HttpResponseHeader = {
  __typename?: 'HttpResponseHeader';
  /** Header name. */
  name: Scalars['String']['output'];
  /** Header value. */
  value: Scalars['String']['output'];
};

/** The input object for the Function. */
export type Input = {
  __typename?: 'Input';
  /**
   * The cart where the Function is running. A cart contains the merchandise that a customer intends to purchase
   * and information about the customer, such as the customer's email address and phone number.
   */
  cart: Cart;
  /**
   * The discount node that owns the [Shopify
   * Function](https://shopify.dev/docs/apps/build/functions). Discounts are a way
   * for merchants to promote sales and special offers, or as customer loyalty
   * rewards. A single discount can be automatic or code-based, and can be applied
   * to a cart lines, orders, and delivery.
   */
  discount: Discount;
  /**
   * Discount codes entered by the buyer at checkout, excluding gift cards. For
   * cart.lines.discounts.generate.run and cart.delivery-options.discounts.generate.run targets, these
   * discount codes are validated to ensure they are not deleted, maintain an active status, and are eligible
   * for the current cart. For fetch targets, all entered discount codes are included, excluding gift cards.
   */
  enteredDiscountCodes: Array<EnteredDiscountCode>;
  /**
   * The result of the fetch target. Refer to [network access](https://shopify.dev/apps/build/functions/input-output/network-access/graphql)
   * for Shopify Functions. This input is only available in the
   * `cart.lines.discounts.generate.run` and
   * `cart.delivery-options.discounts.generate.run` extension targets.
   */
  fetchResult?: Maybe<HttpResponse>;
  /**
   * The regional and language settings that determine how the Function
   * handles currency, numbers, dates, and other locale-specific values
   * during discount calculations. These settings are based on the store's configured
   * [localization practices](https://shopify.dev/docs/apps/build/functions/localization-practices-shopify-functions).
   */
  localization: Localization;
  /**
   * The exchange rate used to convert discounts between the shop's default
   * currency and the currency that displays to the customer during checkout.
   * For example, if a store operates in USD but a customer is viewing discounts in EUR,
   * then the presentment currency rate handles this conversion for accurate pricing.
   */
  presentmentCurrencyRate: Scalars['Decimal']['output'];
  /**
   * Information about the shop where the Function is running, including the shop's timezone
   * setting and associated [metafields](https://shopify.dev/docs/apps/build/custom-data).
   */
  shop: Shop;
  /**
   * The discount code entered by a customer, which caused the [Discount Function](https://shopify.dev/docs/apps/build/discounts#build-with-shopify-functions) to run.
   * This input is only available in the `cart.lines.discounts.generate.run` and
   * `cart.delivery-options.discounts.generate.run` extension targets.
   */
  triggeringDiscountCode?: Maybe<Scalars['String']['output']>;
};

/**
 * The language for which the store is customized, ensuring content is tailored to local customers.
 * This includes product descriptions and customer communications that resonate with the target audience.
 */
export type Language = {
  __typename?: 'Language';
  /** The ISO code. */
  isoCode: LanguageCode;
};

/** Language codes supported by Shopify. */
export enum LanguageCode {
  /** Afrikaans. */
  Af = 'AF',
  /** Akan. */
  Ak = 'AK',
  /** Amharic. */
  Am = 'AM',
  /** Arabic. */
  Ar = 'AR',
  /** Assamese. */
  As = 'AS',
  /** Azerbaijani. */
  Az = 'AZ',
  /** Belarusian. */
  Be = 'BE',
  /** Bulgarian. */
  Bg = 'BG',
  /** Bambara. */
  Bm = 'BM',
  /** Bangla. */
  Bn = 'BN',
  /** Tibetan. */
  Bo = 'BO',
  /** Breton. */
  Br = 'BR',
  /** Bosnian. */
  Bs = 'BS',
  /** Catalan. */
  Ca = 'CA',
  /** Chechen. */
  Ce = 'CE',
  /** Central Kurdish. */
  Ckb = 'CKB',
  /** Czech. */
  Cs = 'CS',
  /** Church Slavic. */
  Cu = 'CU',
  /** Welsh. */
  Cy = 'CY',
  /** Danish. */
  Da = 'DA',
  /** German. */
  De = 'DE',
  /** Dzongkha. */
  Dz = 'DZ',
  /** Ewe. */
  Ee = 'EE',
  /** Greek. */
  El = 'EL',
  /** English. */
  En = 'EN',
  /** Esperanto. */
  Eo = 'EO',
  /** Spanish. */
  Es = 'ES',
  /** Estonian. */
  Et = 'ET',
  /** Basque. */
  Eu = 'EU',
  /** Persian. */
  Fa = 'FA',
  /** Fulah. */
  Ff = 'FF',
  /** Finnish. */
  Fi = 'FI',
  /** Filipino. */
  Fil = 'FIL',
  /** Faroese. */
  Fo = 'FO',
  /** French. */
  Fr = 'FR',
  /** Western Frisian. */
  Fy = 'FY',
  /** Irish. */
  Ga = 'GA',
  /** Scottish Gaelic. */
  Gd = 'GD',
  /** Galician. */
  Gl = 'GL',
  /** Gujarati. */
  Gu = 'GU',
  /** Manx. */
  Gv = 'GV',
  /** Hausa. */
  Ha = 'HA',
  /** Hebrew. */
  He = 'HE',
  /** Hindi. */
  Hi = 'HI',
  /** Croatian. */
  Hr = 'HR',
  /** Hungarian. */
  Hu = 'HU',
  /** Armenian. */
  Hy = 'HY',
  /** Interlingua. */
  Ia = 'IA',
  /** Indonesian. */
  Id = 'ID',
  /** Igbo. */
  Ig = 'IG',
  /** Sichuan Yi. */
  Ii = 'II',
  /** Icelandic. */
  Is = 'IS',
  /** Italian. */
  It = 'IT',
  /** Japanese. */
  Ja = 'JA',
  /** Javanese. */
  Jv = 'JV',
  /** Georgian. */
  Ka = 'KA',
  /** Kikuyu. */
  Ki = 'KI',
  /** Kazakh. */
  Kk = 'KK',
  /** Kalaallisut. */
  Kl = 'KL',
  /** Khmer. */
  Km = 'KM',
  /** Kannada. */
  Kn = 'KN',
  /** Korean. */
  Ko = 'KO',
  /** Kashmiri. */
  Ks = 'KS',
  /** Kurdish. */
  Ku = 'KU',
  /** Cornish. */
  Kw = 'KW',
  /** Kyrgyz. */
  Ky = 'KY',
  /** Luxembourgish. */
  Lb = 'LB',
  /** Ganda. */
  Lg = 'LG',
  /** Lingala. */
  Ln = 'LN',
  /** Lao. */
  Lo = 'LO',
  /** Lithuanian. */
  Lt = 'LT',
  /** Luba-Katanga. */
  Lu = 'LU',
  /** Latvian. */
  Lv = 'LV',
  /** Malagasy. */
  Mg = 'MG',
  /** Māori. */
  Mi = 'MI',
  /** Macedonian. */
  Mk = 'MK',
  /** Malayalam. */
  Ml = 'ML',
  /** Mongolian. */
  Mn = 'MN',
  /** Marathi. */
  Mr = 'MR',
  /** Malay. */
  Ms = 'MS',
  /** Maltese. */
  Mt = 'MT',
  /** Burmese. */
  My = 'MY',
  /** Norwegian (Bokmål). */
  Nb = 'NB',
  /** North Ndebele. */
  Nd = 'ND',
  /** Nepali. */
  Ne = 'NE',
  /** Dutch. */
  Nl = 'NL',
  /** Norwegian Nynorsk. */
  Nn = 'NN',
  /** Norwegian. */
  No = 'NO',
  /** Oromo. */
  Om = 'OM',
  /** Odia. */
  Or = 'OR',
  /** Ossetic. */
  Os = 'OS',
  /** Punjabi. */
  Pa = 'PA',
  /** Polish. */
  Pl = 'PL',
  /** Pashto. */
  Ps = 'PS',
  /** Portuguese. */
  Pt = 'PT',
  /** Portuguese (Brazil). */
  PtBr = 'PT_BR',
  /** Portuguese (Portugal). */
  PtPt = 'PT_PT',
  /** Quechua. */
  Qu = 'QU',
  /** Romansh. */
  Rm = 'RM',
  /** Rundi. */
  Rn = 'RN',
  /** Romanian. */
  Ro = 'RO',
  /** Russian. */
  Ru = 'RU',
  /** Kinyarwanda. */
  Rw = 'RW',
  /** Sanskrit. */
  Sa = 'SA',
  /** Sardinian. */
  Sc = 'SC',
  /** Sindhi. */
  Sd = 'SD',
  /** Northern Sami. */
  Se = 'SE',
  /** Sango. */
  Sg = 'SG',
  /** Sinhala. */
  Si = 'SI',
  /** Slovak. */
  Sk = 'SK',
  /** Slovenian. */
  Sl = 'SL',
  /** Shona. */
  Sn = 'SN',
  /** Somali. */
  So = 'SO',
  /** Albanian. */
  Sq = 'SQ',
  /** Serbian. */
  Sr = 'SR',
  /** Sundanese. */
  Su = 'SU',
  /** Swedish. */
  Sv = 'SV',
  /** Swahili. */
  Sw = 'SW',
  /** Tamil. */
  Ta = 'TA',
  /** Telugu. */
  Te = 'TE',
  /** Tajik. */
  Tg = 'TG',
  /** Thai. */
  Th = 'TH',
  /** Tigrinya. */
  Ti = 'TI',
  /** Turkmen. */
  Tk = 'TK',
  /** Tongan. */
  To = 'TO',
  /** Turkish. */
  Tr = 'TR',
  /** Tatar. */
  Tt = 'TT',
  /** Uyghur. */
  Ug = 'UG',
  /** Ukrainian. */
  Uk = 'UK',
  /** Urdu. */
  Ur = 'UR',
  /** Uzbek. */
  Uz = 'UZ',
  /** Vietnamese. */
  Vi = 'VI',
  /** Volapük. */
  Vo = 'VO',
  /** Wolof. */
  Wo = 'WO',
  /** Xhosa. */
  Xh = 'XH',
  /** Yiddish. */
  Yi = 'YI',
  /** Yoruba. */
  Yo = 'YO',
  /** Chinese. */
  Zh = 'ZH',
  /** Chinese (Simplified). */
  ZhCn = 'ZH_CN',
  /** Chinese (Traditional). */
  ZhTw = 'ZH_TW',
  /** Zulu. */
  Zu = 'ZU'
}

/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export type LocalTime = {
  __typename?: 'LocalTime';
  /** The current date relative to the parent object. */
  date: Scalars['Date']['output'];
  /** Returns true if the current date and time is at or past the given date and time, and false otherwise. */
  dateTimeAfter: Scalars['Boolean']['output'];
  /** Returns true if the current date and time is before the given date and time, and false otherwise. */
  dateTimeBefore: Scalars['Boolean']['output'];
  /** Returns true if the current date and time is between the two given date and times, and false otherwise. */
  dateTimeBetween: Scalars['Boolean']['output'];
  /** Returns true if the current time is at or past the given time, and false otherwise. */
  timeAfter: Scalars['Boolean']['output'];
  /** Returns true if the current time is at or past the given time, and false otherwise. */
  timeBefore: Scalars['Boolean']['output'];
  /** Returns true if the current time is between the two given times, and false otherwise. */
  timeBetween: Scalars['Boolean']['output'];
};


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export type LocalTimeDateTimeAfterArgs = {
  dateTime: Scalars['DateTimeWithoutTimezone']['input'];
};


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export type LocalTimeDateTimeBeforeArgs = {
  dateTime: Scalars['DateTimeWithoutTimezone']['input'];
};


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export type LocalTimeDateTimeBetweenArgs = {
  endDateTime: Scalars['DateTimeWithoutTimezone']['input'];
  startDateTime: Scalars['DateTimeWithoutTimezone']['input'];
};


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export type LocalTimeTimeAfterArgs = {
  time: Scalars['TimeWithoutTimezone']['input'];
};


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export type LocalTimeTimeBeforeArgs = {
  time: Scalars['TimeWithoutTimezone']['input'];
};


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export type LocalTimeTimeBetweenArgs = {
  endTime: Scalars['TimeWithoutTimezone']['input'];
  startTime: Scalars['TimeWithoutTimezone']['input'];
};

/**
 * Details about the localized experience for the store in a specific region, including country and language
 * settings. The localized experience is determined by the store's settings and the customer's location.
 * Localization ensures that customers can access relevant content and options while browsing or purchasing
 * products in a store.
 */
export type Localization = {
  __typename?: 'Localization';
  /**
   * The country for which the store is customized, reflecting local preferences and regulations.
   * Localization might influence the language, currency, and product offerings available in a store to enhance
   * the shopping experience for customers in that region.
   */
  country: Country;
  /**
   * The language for which the store is customized, ensuring content is tailored to local customers.
   * This includes product descriptions and customer communications that resonate with the target audience.
   */
  language: Language;
  /**
   * The market of the active localized experience.
   * @deprecated This `market` field will be removed in a future version of the API.
   */
  market: Market;
};

/**
 * Represents the value captured by a localized field. Localized fields are
 * additional fields required by certain countries on international orders. For
 * example, some countries require additional fields for customs information or tax
 * identification numbers.
 */
export type LocalizedField = {
  __typename?: 'LocalizedField';
  /** The key of the localized field. */
  key: LocalizedFieldKey;
  /** The title of the localized field. */
  title: Scalars['String']['output'];
  /** The value of the localized field. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Unique key identifying localized fields. */
export enum LocalizedFieldKey {
  /** Localized field key 'shipping_credential_br' for country Brazil. */
  ShippingCredentialBr = 'SHIPPING_CREDENTIAL_BR',
  /** Localized field key 'shipping_credential_cl' for country Chile. */
  ShippingCredentialCl = 'SHIPPING_CREDENTIAL_CL',
  /** Localized field key 'shipping_credential_cn' for country China. */
  ShippingCredentialCn = 'SHIPPING_CREDENTIAL_CN',
  /** Localized field key 'shipping_credential_co' for country Colombia. */
  ShippingCredentialCo = 'SHIPPING_CREDENTIAL_CO',
  /** Localized field key 'shipping_credential_cr' for country Costa Rica. */
  ShippingCredentialCr = 'SHIPPING_CREDENTIAL_CR',
  /** Localized field key 'shipping_credential_ec' for country Ecuador. */
  ShippingCredentialEc = 'SHIPPING_CREDENTIAL_EC',
  /** Localized field key 'shipping_credential_es' for country Spain. */
  ShippingCredentialEs = 'SHIPPING_CREDENTIAL_ES',
  /** Localized field key 'shipping_credential_gt' for country Guatemala. */
  ShippingCredentialGt = 'SHIPPING_CREDENTIAL_GT',
  /** Localized field key 'shipping_credential_id' for country Indonesia. */
  ShippingCredentialId = 'SHIPPING_CREDENTIAL_ID',
  /** Localized field key 'shipping_credential_kr' for country South Korea. */
  ShippingCredentialKr = 'SHIPPING_CREDENTIAL_KR',
  /** Localized field key 'shipping_credential_mx' for country Mexico. */
  ShippingCredentialMx = 'SHIPPING_CREDENTIAL_MX',
  /** Localized field key 'shipping_credential_my' for country Malaysia. */
  ShippingCredentialMy = 'SHIPPING_CREDENTIAL_MY',
  /** Localized field key 'shipping_credential_pe' for country Peru. */
  ShippingCredentialPe = 'SHIPPING_CREDENTIAL_PE',
  /** Localized field key 'shipping_credential_pt' for country Portugal. */
  ShippingCredentialPt = 'SHIPPING_CREDENTIAL_PT',
  /** Localized field key 'shipping_credential_py' for country Paraguay. */
  ShippingCredentialPy = 'SHIPPING_CREDENTIAL_PY',
  /** Localized field key 'shipping_credential_tr' for country Turkey. */
  ShippingCredentialTr = 'SHIPPING_CREDENTIAL_TR',
  /** Localized field key 'shipping_credential_tw' for country Taiwan. */
  ShippingCredentialTw = 'SHIPPING_CREDENTIAL_TW',
  /** Localized field key 'shipping_credential_type_co' for country Colombia. */
  ShippingCredentialTypeCo = 'SHIPPING_CREDENTIAL_TYPE_CO',
  /** Localized field key 'tax_credential_br' for country Brazil. */
  TaxCredentialBr = 'TAX_CREDENTIAL_BR',
  /** Localized field key 'tax_credential_cl' for country Chile. */
  TaxCredentialCl = 'TAX_CREDENTIAL_CL',
  /** Localized field key 'tax_credential_co' for country Colombia. */
  TaxCredentialCo = 'TAX_CREDENTIAL_CO',
  /** Localized field key 'tax_credential_cr' for country Costa Rica. */
  TaxCredentialCr = 'TAX_CREDENTIAL_CR',
  /** Localized field key 'tax_credential_ec' for country Ecuador. */
  TaxCredentialEc = 'TAX_CREDENTIAL_EC',
  /** Localized field key 'tax_credential_es' for country Spain. */
  TaxCredentialEs = 'TAX_CREDENTIAL_ES',
  /** Localized field key 'tax_credential_gt' for country Guatemala. */
  TaxCredentialGt = 'TAX_CREDENTIAL_GT',
  /** Localized field key 'tax_credential_id' for country Indonesia. */
  TaxCredentialId = 'TAX_CREDENTIAL_ID',
  /** Localized field key 'tax_credential_it' for country Italy. */
  TaxCredentialIt = 'TAX_CREDENTIAL_IT',
  /** Localized field key 'tax_credential_mx' for country Mexico. */
  TaxCredentialMx = 'TAX_CREDENTIAL_MX',
  /** Localized field key 'tax_credential_my' for country Malaysia. */
  TaxCredentialMy = 'TAX_CREDENTIAL_MY',
  /** Localized field key 'tax_credential_pe' for country Peru. */
  TaxCredentialPe = 'TAX_CREDENTIAL_PE',
  /** Localized field key 'tax_credential_pt' for country Portugal. */
  TaxCredentialPt = 'TAX_CREDENTIAL_PT',
  /** Localized field key 'tax_credential_py' for country Paraguay. */
  TaxCredentialPy = 'TAX_CREDENTIAL_PY',
  /** Localized field key 'tax_credential_tr' for country Turkey. */
  TaxCredentialTr = 'TAX_CREDENTIAL_TR',
  /** Localized field key 'tax_credential_type_co' for country Colombia. */
  TaxCredentialTypeCo = 'TAX_CREDENTIAL_TYPE_CO',
  /** Localized field key 'tax_credential_type_mx' for country Mexico. */
  TaxCredentialTypeMx = 'TAX_CREDENTIAL_TYPE_MX',
  /** Localized field key 'tax_credential_use_mx' for country Mexico. */
  TaxCredentialUseMx = 'TAX_CREDENTIAL_USE_MX',
  /** Localized field key 'tax_email_it' for country Italy. */
  TaxEmailIt = 'TAX_EMAIL_IT'
}

/** Represents the location where the inventory resides. */
export type Location = HasMetafields & {
  __typename?: 'Location';
  /** The address of this location. */
  address: LocationAddress;
  /** The location handle. */
  handle: Scalars['Handle']['output'];
  /** The location id. */
  id: Scalars['ID']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
  /** The name of the location. */
  name: Scalars['String']['output'];
};


/** Represents the location where the inventory resides. */
export type LocationMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Represents the address of a location. */
export type LocationAddress = {
  __typename?: 'LocationAddress';
  /** The first line of the address for the location. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address for the location. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The city of the location. */
  city?: Maybe<Scalars['String']['output']>;
  /** The country of the location. */
  country?: Maybe<Scalars['String']['output']>;
  /** The country code of the location. */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** A formatted version of the address for the location. */
  formatted: Array<Scalars['String']['output']>;
  /** The approximate latitude coordinates of the location. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The approximate longitude coordinates of the location. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** The phone number of the location. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The province of the location. */
  province?: Maybe<Scalars['String']['output']>;
  /** The code for the province, state, or district of the address of the location. */
  provinceCode?: Maybe<Scalars['String']['output']>;
  /** The ZIP code of the location. */
  zip?: Maybe<Scalars['String']['output']>;
};

/** Represents a mailing address. */
export type MailingAddress = {
  __typename?: 'MailingAddress';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']['output']>;
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']['output']>;
  /** The two-letter code for the country of the address. For example, US. */
  countryCode?: Maybe<CountryCode>;
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The approximate latitude of the address. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The approximate longitude of the address. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /**
   * The market of the address.
   * @deprecated This `market` field will be removed in a future version of the API.
   */
  market?: Maybe<Market>;
  /** The full name of the customer, based on firstName and lastName. */
  name?: Maybe<Scalars['String']['output']>;
  /** A unique phone number for the customer. Formatted using E.164 standard. For example, +16135551111. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The alphanumeric code for the region. For example, ON. */
  provinceCode?: Maybe<Scalars['String']['output']>;
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']['output']>;
};

/**
 * A market is a group of one or more regions that you want to target for international sales.
 * By creating a market, you can configure a distinct, localized shopping experience for
 * customers from a specific area of the world. For example, you can
 * [change currency](https://shopify.dev/api/admin-graphql/current/mutations/marketCurrencySettingsUpdate),
 * [configure international pricing](https://shopify.dev/api/examples/product-price-lists),
 * or [add market-specific domains or subfolders](https://shopify.dev/api/admin-graphql/current/objects/MarketWebPresence).
 */
export type Market = HasMetafields & {
  __typename?: 'Market';
  /** A human-readable unique string for the market automatically generated from its title. */
  handle: Scalars['Handle']['output'];
  /** A globally-unique identifier. */
  id: Scalars['ID']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
  /** A geographic region which comprises a market. */
  regions: Array<MarketRegion>;
};


/**
 * A market is a group of one or more regions that you want to target for international sales.
 * By creating a market, you can configure a distinct, localized shopping experience for
 * customers from a specific area of the world. For example, you can
 * [change currency](https://shopify.dev/api/admin-graphql/current/mutations/marketCurrencySettingsUpdate),
 * [configure international pricing](https://shopify.dev/api/examples/product-price-lists),
 * or [add market-specific domains or subfolders](https://shopify.dev/api/admin-graphql/current/objects/MarketWebPresence).
 */
export type MarketMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a region. */
export type MarketRegion = {
  /** The name of the region in the language of the current localization. */
  name?: Maybe<Scalars['String']['output']>;
};

/** A country which comprises a market. */
export type MarketRegionCountry = MarketRegion & {
  __typename?: 'MarketRegionCountry';
  /** The two-letter code for the country. */
  code: CountryCode;
  /** The country name in the language of the current localization. */
  name: Scalars['String']['output'];
};

/**
 * The item that a customer intends to purchase. Merchandise can be a product variant or a custom
 * product.
 *
 * A product variant is a specific version of a product that comes in more than one option, such as size or color.
 * For example, if a merchant sells t-shirts with options for size and color, then a small, blue t-shirt would be
 * one product variant and a large, blue t-shirt would be another.
 *
 * A custom product represents a product that doesn't map to Shopify's
 * [standard product categories](https://help.shopify.com/manual/products/details/product-type).
 * For example, you can use a custom product to manage gift cards, shipping requirements, localized product
 * information, or weight measurements and conversions.
 */
export type Merchandise = CustomProduct | ProductVariant;

/**
 * [Custom fields](https://shopify.dev/docs/apps/build/custom-data) that store additional information
 * about a Shopify resource, such as products, orders, and
 * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
 * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
 * enables you to customize the checkout experience.
 */
export type Metafield = {
  __typename?: 'Metafield';
  /** The data that's stored in the metafield, using JSON format. */
  jsonValue: Scalars['JSON']['output'];
  /**
   * The [type of data](https://shopify.dev/apps/metafields/types) that the metafield stores in
   * the `value` field.
   */
  type: Scalars['String']['output'];
  /**
   * The data that's stored in the metafield. The data is always stored as a string,
   * regardless of the [metafield's type](https://shopify.dev/apps/metafields/types).
   */
  value: Scalars['String']['output'];
};

/**
 * A precise monetary value and its associated currency. Combines a decimal amount
 * with a three-letter currency code to express prices, costs, and other financial
 * values throughout the API. For example, 12.99 USD.
 */
export type MoneyV2 = {
  __typename?: 'MoneyV2';
  /**
   * A monetary value in decimal format, allowing for precise representation of cents or fractional
   * currency. For example, 12.99.
   */
  amount: Scalars['Decimal']['output'];
  /**
   * The three-letter currency code that represents a world currency used in a store. Currency codes
   * include standard [standard ISO 4217 codes](https://en.wikipedia.org/wiki/ISO_4217), legacy codes,
   * and non-standard codes. For example, USD.
   */
  currencyCode: CurrencyCode;
};

/** The root mutation for the API. */
export type MutationRoot = {
  __typename?: 'MutationRoot';
  /** Handles the Function result for the cart.delivery-options.discounts.generate.fetch target. */
  cartDeliveryOptionsDiscountsGenerateFetch: Scalars['Void']['output'];
  /** Handles the Function result for the cart.delivery-options.discounts.generate.run target. */
  cartDeliveryOptionsDiscountsGenerateRun: Scalars['Void']['output'];
  /** Handles the Function result for the cart.lines.discounts.generate.fetch target. */
  cartLinesDiscountsGenerateFetch: Scalars['Void']['output'];
  /** Handles the Function result for the cart.lines.discounts.generate.run target. */
  cartLinesDiscountsGenerateRun: Scalars['Void']['output'];
};


/** The root mutation for the API. */
export type MutationRootCartDeliveryOptionsDiscountsGenerateFetchArgs = {
  result: CartDeliveryOptionsDiscountsGenerateFetchResult;
};


/** The root mutation for the API. */
export type MutationRootCartDeliveryOptionsDiscountsGenerateRunArgs = {
  result: CartDeliveryOptionsDiscountsGenerateRunResult;
};


/** The root mutation for the API. */
export type MutationRootCartLinesDiscountsGenerateFetchArgs = {
  result: CartLinesDiscountsGenerateFetchResult;
};


/** The root mutation for the API. */
export type MutationRootCartLinesDiscountsGenerateRunArgs = {
  result: CartLinesDiscountsGenerateRunResult;
};

/** A discount candidate to be applied to an eligible order. */
export type OrderDiscountCandidate = {
  /**
   * An optional discount code associated with this discount candidate, for use
   * with automatic discounts. If a code discount is the function trigger, the
   * associated discount code will be overwritten by the triggering discount code.
   */
  associatedDiscountCode?: InputMaybe<AssociatedDiscountCode>;
  /** The conditions that must be satisfied for an order to be eligible for a discount candidate. */
  conditions?: InputMaybe<Array<Condition>>;
  /**
   * A notification on the **Cart** page informs customers about available
   * discounts. If an automatic discount applies, the notification displays this
   * message, such as "Save 20% on all t-shirts." If a discount code is entered,
   * the notification displays the code instead.
   */
  message?: InputMaybe<Scalars['String']['input']>;
  /** The targets of the order discount candidate. */
  targets: Array<OrderDiscountCandidateTarget>;
  /** The value of the order discount candidate. */
  value: OrderDiscountCandidateValue;
};

/** A target of an order to be eligible for a discount candidate. */
export type OrderDiscountCandidateTarget =
  /**
   * A method for applying a discount to the entire order subtotal. The subtotal is the total amount of the
   * order before any taxes, shipping fees, or discounts are applied. For example, if a customer places an order
   * for a t-shirt and a pair of shoes, then the subtotal is the sum of the prices of those items.
   */
  { orderSubtotal: OrderSubtotalTarget; };

/** The value of the order discount candidate. */
export type OrderDiscountCandidateValue =
  /** A fixed amount value. */
  { fixedAmount: FixedAmount; percentage?: never; }
  |  /** A percentage value. */
  { fixedAmount?: never; percentage: Percentage; };

/** The strategy that's applied to the list of order discount candidates. */
export enum OrderDiscountSelectionStrategy {
  /** Only apply the first order discount candidate with conditions that are satisfied. */
  First = 'FIRST',
  /** Only apply the order discount candidate that offers the maximum reduction. */
  Maximum = 'MAXIMUM'
}

/** An operation that applies order discounts to a cart that share a selection strategy. */
export type OrderDiscountsAddOperation = {
  /** The list of discounts that can be applied to an order. */
  candidates: Array<OrderDiscountCandidate>;
  /** The strategy that's applied to the list of discounts. */
  selectionStrategy: OrderDiscountSelectionStrategy;
};

/** The condition for checking the minimum subtotal amount of the order. */
export type OrderMinimumSubtotal = {
  /** Cart line IDs with a merchandise line price that's excluded to calculate the minimum subtotal amount of the order. */
  excludedCartLineIds: Array<Scalars['ID']['input']>;
  /** The minimum subtotal amount of the order to be eligible for the discount in the shop's currency. */
  minimumAmount: Scalars['Decimal']['input'];
};

/**
 * A method for applying a discount to the entire order subtotal. The subtotal is the total amount of the
 * order before any taxes, shipping fees, or discounts are applied. For example, if a customer places an order
 * for a t-shirt and a pair of shoes, then the subtotal is the sum of the prices of those items.
 */
export type OrderSubtotalTarget = {
  /**
   * The list of excluded cart line IDs. These cart lines are excluded from the order
   * subtotal calculation when calculating the maximum value of the discount.
   */
  excludedCartLineIds: Array<Scalars['ID']['input']>;
};

/** A percentage value. */
export type Percentage = {
  /**
   * The percentage value.
   *
   * The value is validated against: >= 0 and <= 100.
   */
  value: Scalars['Decimal']['input'];
};

/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export type Product = HasMetafields & {
  __typename?: 'Product';
  /**
   * A unique, human-readable string of the product's title. A handle can contain letters, hyphens (`-`), and
   * numbers, but not spaces. The handle is used in the online store URL for the product. For example, if a product
   * is titled "Black Sunglasses", then the handle is `black-sunglasses`.
   */
  handle: Scalars['Handle']['output'];
  /**
   * Whether the product is associated with any of the specified tags. The product must have at least one tag
   * from the list to return `true`.
   */
  hasAnyTag: Scalars['Boolean']['output'];
  /** Whether the product is associated with the specified tags. */
  hasTags: Array<HasTagResponse>;
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the product.
   */
  id: Scalars['ID']['output'];
  /**
   * Whether the product is in any of the specified collections. The product must be in at least one collection
   * from the list to return `true`.
   *
   * A collection is a group of products that can be displayed in online stores and other sales channels in
   * categories, which makes it easy for customers to find them. For example, an athletics store might create
   * different collections for running attire and accessories.
   */
  inAnyCollection: Scalars['Boolean']['output'];
  /**
   * Whether the product is in the specified collections. The product must be in all of the collections in the
   * list to return `true`.
   *
   * A collection is a group of products that can be displayed in online stores and other sales channels in
   * categories, which makes it easy for customers to find them. For example, an athletics store might create
   * different collections for running attire and accessories.
   */
  inCollections: Array<CollectionMembership>;
  /** Whether the product is a gift card. */
  isGiftCard: Scalars['Boolean']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
  /**
   * A custom category for a product. Product types allow merchants to define categories other than the
   * ones available in Shopify's
   * [standard product categories](https://help.shopify.com/manual/products/details/product-type).
   */
  productType?: Maybe<Scalars['String']['output']>;
  /**
   * The localized name for the product that displays to customers. The title is used to construct the product's
   * handle, which is a unique, human-readable string of the product's title. For example, if a product is titled
   * "Black Sunglasses", then the handle is `black-sunglasses`.
   */
  title: Scalars['String']['output'];
  /** The name of the product's vendor. */
  vendor?: Maybe<Scalars['String']['output']>;
};


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export type ProductHasAnyTagArgs = {
  tags?: Array<Scalars['String']['input']>;
};


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export type ProductHasTagsArgs = {
  tags?: Array<Scalars['String']['input']>;
};


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export type ProductInAnyCollectionArgs = {
  ids?: Array<Scalars['ID']['input']>;
};


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export type ProductInCollectionsArgs = {
  ids?: Array<Scalars['ID']['input']>;
};


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export type ProductMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** The target and value of the discount to be applied to a cart line. */
export type ProductDiscountCandidate = {
  /**
   * An optional discount code associated with this discount candidate, for use
   * with automatic discounts. If a code discount is the function trigger, the
   * associated discount code will be overwritten by the triggering discount code.
   */
  associatedDiscountCode?: InputMaybe<AssociatedDiscountCode>;
  /**
   * A notification on the **Cart** page informs customers about available
   * discounts. If an automatic discount applies, the notification displays this
   * message, such as "Save 20% on all t-shirts." If a discount code is entered,
   * the notification displays the code instead.
   */
  message?: InputMaybe<Scalars['String']['input']>;
  /** The targets of the discount to be applied to a cart line. */
  targets: Array<ProductDiscountCandidateTarget>;
  /**
   * The value of the discount to be applied to a cart line. For example, a fixed
   * amount of $5 off or percentage value of 20% off.
   */
  value: ProductDiscountCandidateValue;
};

/**
 * The [fixed-amount](https://help.shopify.com/manual/international/pricing/discounts)
 * value of the discount to be applied to a cart line. For example, if the cart
 * total is $100 and the discount is $10, then the fixed amount is $10.
 */
export type ProductDiscountCandidateFixedAmount = {
  /**
   * The [fixed-amount](https://help.shopify.com/manual/international/pricing/discounts) value of the discount to be applied to a cart line, in the currency of the
   * cart. The amount must be greater than or equal to 0.
   */
  amount: Scalars['Decimal']['input'];
  /**
   * Whether to apply the value of each eligible discount to each eligible cart line.
   *
   * The default value is `false`, which causes the value to be applied once across the entitled items.
   * When the value is `true`, the value will be applied to each of the entitled items.
   */
  appliesToEachItem?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Defines discount candidates, which are cart lines that may be eligible for
 * potential discounts. Use discount candidates to identify items in a customer's
 * cart that could receive discounts based on conditions in the selection strategy.
 *
 * When multiple cart lines share the same type and ID, the system treats them as a
 * single target and combines their quantities. The combined quantity becomes null
 * if any individual target has a `null` quantity.
 */
export type ProductDiscountCandidateTarget =
  /**
   * A method for applying a discount to a specific line item in the cart. A cart line is an entry in the
   * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
   * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
   */
  { cartLine: CartLineTarget; };

/** The value of the discount candidate to be applied to a cart line. */
export type ProductDiscountCandidateValue =
  /**
   * The [fixed-amount](https://help.shopify.com/manual/international/pricing/discounts) value of the discount to be applied to a cart line. For example, if the cart
   * total is $100 and the discount is $10, then the fixed amount is $10.
   */
  { fixedAmount: ProductDiscountCandidateFixedAmount; percentage?: never; }
  |  /** A percentage value. */
  { fixedAmount?: never; percentage: Percentage; };

/** The selection strategy that's applied to the list of discounts that are eligible for cart lines. */
export enum ProductDiscountSelectionStrategy {
  /** Apply all the discount candidates to eligible cart lines. This doesn't override discount combination or stacking rules. */
  All = 'ALL',
  /** Apply the first discount candidate to cart lines that satisfies conditions. */
  First = 'FIRST',
  /** Apply the discount to the cart line that offers the maximum reduction. */
  Maximum = 'MAXIMUM'
}

/** An operation that applies product discounts to a cart that share a selection strategy. */
export type ProductDiscountsAddOperation = {
  /** The list of products that are eligible for the discount. */
  candidates: Array<ProductDiscountCandidate>;
  /** The strategy that's applied to the list of products that are eligible for the cart line discount. */
  selectionStrategy: ProductDiscountSelectionStrategy;
};

/**
 * A specific version of a product that comes in more than one option, such as size or color. For example,
 * if a merchant sells t-shirts with options for size and color, then a small, blue t-shirt would be one
 * product variant and a large, blue t-shirt would be another.
 */
export type ProductVariant = HasMetafields & {
  __typename?: 'ProductVariant';
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the product variant.
   */
  id: Scalars['ID']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
  /**
   * The product associated with the product variant. For example, if a
   * merchant sells t-shirts with options for size and color, then a small,
   * blue t-shirt would be one product variant and a large, blue t-shirt would be another.
   * The product associated with the product variant would be the t-shirt itself.
   */
  product: Product;
  /**
   * Whether the item needs to be shipped to the customer. For example, a
   * digital gift card doesn't need to be shipped, but a t-shirt does
   * need to be shipped.
   */
  requiresShipping: Scalars['Boolean']['output'];
  /**
   * A case-sensitive identifier for the product variant in the merchant's store. For example, `"BBC-1"`.
   * A product variant must have a SKU to be connected to a
   * [fulfillment service](https://shopify.dev/docs/apps/build/orders-fulfillment/fulfillment-service-apps/build-for-fulfillment-services).
   */
  sku?: Maybe<Scalars['String']['output']>;
  /** The localized name for the product variant that displays to customers. */
  title?: Maybe<Scalars['String']['output']>;
  /** The product variant's weight, in the system of measurement set in the `weightUnit` field. */
  weight?: Maybe<Scalars['Float']['output']>;
  /** The unit of measurement for weight. */
  weightUnit: WeightUnit;
};


/**
 * A specific version of a product that comes in more than one option, such as size or color. For example,
 * if a merchant sells t-shirts with options for size and color, then a small, blue t-shirt would be one
 * product variant and a large, blue t-shirt would be another.
 */
export type ProductVariantMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/**
 * The company of a B2B customer that's interacting with the cart.
 * Used to manage and track purchases made by businesses rather than individual customers.
 */
export type PurchasingCompany = {
  __typename?: 'PurchasingCompany';
  /** The company associated to the order or draft order. */
  company: Company;
  /** The company contact associated to the order or draft order. */
  contact?: Maybe<CompanyContact>;
  /** The company location associated to the order or draft order. */
  location: CompanyLocation;
};

/** A discount code to be rejected. */
export type RejectedDiscountCode = {
  /** The discount code to reject. */
  code: Scalars['String']['input'];
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlan = HasMetafields & {
  __typename?: 'SellingPlan';
  /** The description of the selling plan. */
  description?: Maybe<Scalars['String']['output']>;
  /** A globally-unique identifier. */
  id: Scalars['ID']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
  /** The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'. */
  name: Scalars['String']['output'];
  /** Whether purchasing the selling plan will result in multiple deliveries. */
  recurringDeliveries: Scalars['Boolean']['output'];
};


/** Represents how products and variants can be sold and purchased. */
export type SellingPlanMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Represents an association between a variant and a selling plan. Selling plan
 * allocations describe the options offered for each variant, and the price of the
 * variant when purchased with a selling plan.
 */
export type SellingPlanAllocation = {
  __typename?: 'SellingPlanAllocation';
  /**
   * A list of price adjustments, with a maximum of two. When there are two, the
   * first price adjustment goes into effect at the time of purchase, while the
   * second one starts after a certain number of orders. A price adjustment
   * represents how a selling plan affects pricing when a variant is purchased with
   * a selling plan. Prices display in the customer's currency if the shop is
   * configured for it.
   */
  priceAdjustments: Array<SellingPlanAllocationPriceAdjustment>;
  /**
   * A representation of how products and variants can be sold and purchased. For
   * example, an individual selling plan could be '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  sellingPlan: SellingPlan;
};

/** The resulting prices for variants when they're purchased with a specific selling plan. */
export type SellingPlanAllocationPriceAdjustment = {
  __typename?: 'SellingPlanAllocationPriceAdjustment';
  /**
   * The effective price for a single delivery. For example, for a prepaid
   * subscription plan that includes 6 deliveries at the price of $48.00, the per
   * delivery price is $8.00.
   */
  perDeliveryPrice: MoneyV2;
  /**
   * The price of the variant when it's purchased with a selling plan For example,
   * for a prepaid subscription plan that includes 6 deliveries of $10.00 granola,
   * where the customer gets 20% off, the price is 6 x $10.00 x 0.80 = $48.00.
   */
  price: MoneyV2;
};

/**
 * Information about the store, including the store's timezone setting
 * and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 */
export type Shop = HasMetafields & {
  __typename?: 'Shop';
  /**
   * The current time based on the
   * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
   */
  localTime: LocalTime;
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield?: Maybe<Metafield>;
};


/**
 * Information about the store, including the store's timezone setting
 * and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 */
export type ShopMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Units of measurement for weight. */
export enum WeightUnit {
  /** Metric system unit of mass. */
  Grams = 'GRAMS',
  /** 1 kilogram equals 1000 grams. */
  Kilograms = 'KILOGRAMS',
  /** Imperial system unit of mass. */
  Ounces = 'OUNCES',
  /** 1 pound equals 16 ounces. */
  Pounds = 'POUNDS'
}

export type DeliveryInputVariables = Exact<{ [key: string]: never; }>;


export type DeliveryInput = { __typename?: 'Input', cart: { __typename?: 'Cart', deliveryGroups: Array<{ __typename?: 'CartDeliveryGroup', id: string }> }, discount: { __typename?: 'Discount', discountClasses: Array<DiscountClass> } };

export type CartInputVariables = Exact<{ [key: string]: never; }>;


export type CartInput = { __typename?: 'Input', cart: { __typename?: 'Cart', lines: Array<{ __typename?: 'CartLine', id: string, cost: { __typename?: 'CartLineCost', subtotalAmount: { __typename?: 'MoneyV2', amount: any } } }> }, discount: { __typename?: 'Discount', discountClasses: Array<DiscountClass> } };
