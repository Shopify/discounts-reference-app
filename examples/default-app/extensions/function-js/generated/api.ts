export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /**
   * Represents an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-encoded date string.
   * For example, September 7, 2019 is represented as `"2019-07-16"`.
   */
  Date: { input: any; output: any };
  /**
   * Represents an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-encoded date and time string.
   * For example, 3:50 pm on September 7, 2019 in the time zone of UTC (Coordinated Universal Time) is
   * represented as `"2019-09-07T15:50:00Z`".
   */
  DateTime: { input: any; output: any };
  /**
   * A subset of the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format that
   * includes the date and time but not the timezone which is determined from context.
   *
   * For example, "2018-01-01T00:00:00".
   */
  DateTimeWithoutTimezone: { input: any; output: any };
  /**
   * A signed decimal number, which supports arbitrary precision and is serialized as a string.
   *
   * Example values: `"29.99"`, `"29.999"`.
   */
  Decimal: { input: any; output: any };
  /**
   * A function-scoped handle to a refer a resource.
   * The Handle type appears in a JSON response as a String, but it is not intended to be human-readable.
   * Example value: `"10079785100"`
   */
  Handle: { input: any; output: any };
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
  JSON: { input: any; output: any };
  /**
   * A subset of the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format that
   * includes the time but not the date or timezone which is determined from context.
   * For example, "05:43:21".
   */
  TimeWithoutTimezone: { input: any; output: any };
  /**
   * Represents an [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) and
   * [RFC 3987](https://datatracker.ietf.org/doc/html/rfc3987)-compliant URI string.
   *
   * For example, `"https://example.myshopify.com"` is a valid URL. It includes a scheme (`https`) and a host
   * (`example.myshopify.com`).
   */
  URL: { input: any; output: any };
  /** A void type that can be used to return a null value from a mutation. */
  Void: { input: any; output: any };
};

/** A discount code that is associated with a discount candidate. */
export type AssociatedDiscountCode = {
  /** The discount code. */
  code: Scalars["String"]["input"];
};

/** Represents a generic custom attribute, such as whether an order is a customer's first. */
export type Attribute = {
  __typename?: "Attribute";
  /** The key or name of the attribute. For example, `"customersFirstOrder"`. */
  key: Scalars["String"]["output"];
  /** The value of the attribute. For example, `"true"`. */
  value?: Maybe<Scalars["String"]["output"]>;
};

/** Represents information about the buyer that is interacting with the cart. */
export type BuyerIdentity = {
  __typename?: "BuyerIdentity";
  /** The customer associated with the cart. */
  customer?: Maybe<Customer>;
  /** The email address of the buyer that's interacting with the cart. */
  email?: Maybe<Scalars["String"]["output"]>;
  /** Whether the buyer authenticated with a customer account. */
  isAuthenticated: Scalars["Boolean"]["output"];
  /** The phone number of the buyer that's interacting with the cart. */
  phone?: Maybe<Scalars["String"]["output"]>;
  /** The purchasing company associated with the cart. */
  purchasingCompany?: Maybe<PurchasingCompany>;
  /**
   * Represents the [Shop User](https://help.shopify.com/en/manual/online-sales-channels/shop/sign-in-features)
   *  corresponding to the customer within the shop, if the buyer is a Shop User. Can be used to request [Shop User
   *  metafields](https://shopify.dev/docs/api/shop-user-custom-data).
   */
  shopUser?: Maybe<ShopUser>;
};

/** A cart represents the merchandise that a buyer intends to purchase, and the cost associated with the cart. */
export type Cart = HasMetafields & {
  __typename?: "Cart";
  /** The attributes associated with the cart. Attributes are represented as key-value pairs. */
  attribute?: Maybe<Attribute>;
  /** Information about the buyer that is interacting with the cart. */
  buyerIdentity?: Maybe<BuyerIdentity>;
  /** The costs that the buyer will pay at checkout. */
  cost: CartCost;
  /** A list of lines containing information about the items that can be delivered. */
  deliverableLines: Array<DeliverableCartLine>;
  /** The delivery groups available for the cart based on the buyer's shipping address. */
  deliveryGroups: Array<CartDeliveryGroup>;
  /** A list of lines containing information about the items the customer intends to purchase. */
  lines: Array<CartLine>;
  /** The localized fields available for the cart. */
  localizedFields: Array<LocalizedField>;
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
};

/** A cart represents the merchandise that a buyer intends to purchase, and the cost associated with the cart. */
export type CartAttributeArgs = {
  key?: InputMaybe<Scalars["String"]["input"]>;
};

/** A cart represents the merchandise that a buyer intends to purchase, and the cost associated with the cart. */
export type CartLocalizedFieldsArgs = {
  keys?: Array<LocalizedFieldKey>;
};

/** A cart represents the merchandise that a buyer intends to purchase, and the cost associated with the cart. */
export type CartMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** The cost that the buyer will pay at checkout. */
export type CartCost = {
  __typename?: "CartCost";
  /** The amount, before taxes and discounts, for the customer to pay. */
  subtotalAmount: MoneyV2;
  /** The total amount for the customer to pay. */
  totalAmount: MoneyV2;
  /** The duty amount for the customer to pay at checkout. */
  totalDutyAmount?: Maybe<MoneyV2>;
  /** The tax amount for the customer to pay at checkout. */
  totalTaxAmount?: Maybe<MoneyV2>;
};

/** Information about the options available for one or more line items to be delivered to a specific address. */
export type CartDeliveryGroup = {
  __typename?: "CartDeliveryGroup";
  /** A list of cart lines for the delivery group. */
  cartLines: Array<CartLine>;
  /** The destination address for the delivery group. */
  deliveryAddress?: Maybe<MailingAddress>;
  /** The delivery options available for the delivery group. */
  deliveryOptions: Array<CartDeliveryOption>;
  /** Unique identifier for the delivery group. */
  id: Scalars["ID"]["output"];
  /** Information about the delivery option the buyer has selected. */
  selectedDeliveryOption?: Maybe<CartDeliveryOption>;
};

/** Information about a delivery option. */
export type CartDeliveryOption = {
  __typename?: "CartDeliveryOption";
  /** The code of the delivery option. */
  code?: Maybe<Scalars["String"]["output"]>;
  /** The cost for the delivery option. */
  cost: MoneyV2;
  /** The method for the delivery option. */
  deliveryMethodType: DeliveryMethod;
  /** The description of the delivery option. */
  description?: Maybe<Scalars["String"]["output"]>;
  /** The unique identifier of the delivery option. */
  handle: Scalars["Handle"]["output"];
  /** The title of the delivery option. */
  title?: Maybe<Scalars["String"]["output"]>;
};

/** Represents information about the merchandise in the cart. */
export type CartLine = {
  __typename?: "CartLine";
  /**
   * Retrieve a cart line attribute by key.
   *
   * Cart line attributes are also known as line item properties in Liquid.
   */
  attribute?: Maybe<Attribute>;
  /** The cost of the merchandise line that the buyer will pay at checkout. */
  cost: CartLineCost;
  /** The ID of the cart line. */
  id: Scalars["ID"]["output"];
  /** The merchandise that the buyer intends to purchase. */
  merchandise: Merchandise;
  /** The quantity of the merchandise that the customer intends to purchase. */
  quantity: Scalars["Int"]["output"];
  /**
   * The selling plan associated with the cart line and the effect that each
   * selling plan has on variants when they're purchased.
   */
  sellingPlanAllocation?: Maybe<SellingPlanAllocation>;
};

/** Represents information about the merchandise in the cart. */
export type CartLineAttributeArgs = {
  key?: InputMaybe<Scalars["String"]["input"]>;
};

/** The cost of the merchandise line that the buyer will pay at checkout. */
export type CartLineCost = {
  __typename?: "CartLineCost";
  /** The amount of the merchandise line. */
  amountPerQuantity: MoneyV2;
  /**
   * The compare at amount of the merchandise line. This value varies depending on
   * the buyer's identity, and is null when the value is hidden to buyers.
   */
  compareAtAmountPerQuantity?: Maybe<MoneyV2>;
  /** The cost of the merchandise line before line-level discounts. */
  subtotalAmount: MoneyV2;
  /** The total cost of the merchandise line. */
  totalAmount: MoneyV2;
};

/** The condition for checking the minimum quantity of products across a group of cart lines. */
export type CartLineMinimumQuantity = {
  /**
   * Cart line IDs with a merchandise line price that's included to calculate the
   * minimum quantity purchased to receive the discount.
   */
  ids: Array<Scalars["ID"]["input"]>;
  /** The minimum quantity of a product. */
  minimumQuantity: Scalars["Int"]["input"];
};

/** The condition for checking the minimum subtotal of products across a group of cart lines. */
export type CartLineMinimumSubtotal = {
  /**
   * Cart line IDs with a merchandise line price that's included to calculate the
   * minimum subtotal purchased to receive the discount.
   */
  ids: Array<Scalars["ID"]["input"]>;
  /** The minimum subtotal amount of the product. */
  minimumAmount: Scalars["Decimal"]["input"];
};

/** A discount [Target](https://shopify.dev/api/functions/reference/product-discounts/graphql/common-objects/target) that applies to a specific cart line, up to an optional quantity limit. */
export type CartLineTarget = {
  /** The ID of the targeted cart line. */
  id: Scalars["ID"]["input"];
  /**
   * The number of line items that are being discounted.
   * The default value is `null`, which represents the quantity of the matching line items.
   *
   * The value is validated against: > 0.
   */
  quantity?: InputMaybe<Scalars["Int"]["input"]>;
};

/** The operations that can be performed to apply discounts to the cart. */
export type CartOperation =
  /** A group of order discounts that share a selection strategy. */
  | {
      addOrderDiscounts: OrderDiscounts;
      addProductDiscounts?: never;
      addValidDiscountCodes?: never;
    } /** A group of product discounts that share a selection strategy. */
  | {
      addOrderDiscounts?: never;
      addProductDiscounts: ProductDiscounts;
      addValidDiscountCodes?: never;
    } /**
   * A list of valid discount codes that correspond to external discounts. This can
   * only be used by Functions with network access.
   */
  | {
      addOrderDiscounts?: never;
      addProductDiscounts?: never;
      addValidDiscountCodes: ValidDiscountCodes;
    };

/** Represents whether the product is a member of the given collection. */
export type CollectionMembership = {
  __typename?: "CollectionMembership";
  /** The ID of the collection. */
  collectionId: Scalars["ID"]["output"];
  /** Whether the product is a member of the collection. */
  isMember: Scalars["Boolean"]["output"];
};

/** Represents information about a company which is also a customer of the shop. */
export type Company = HasMetafields & {
  __typename?: "Company";
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was created in Shopify. */
  createdAt: Scalars["DateTime"]["output"];
  /** A unique externally-supplied ID for the company. */
  externalId?: Maybe<Scalars["String"]["output"]>;
  /** The ID of the company. */
  id: Scalars["ID"]["output"];
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The name of the company. */
  name: Scalars["String"]["output"];
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was last modified. */
  updatedAt: Scalars["DateTime"]["output"];
};

/** Represents information about a company which is also a customer of the shop. */
export type CompanyMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** A company's main point of contact. */
export type CompanyContact = {
  __typename?: "CompanyContact";
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company contact was created in Shopify.
   */
  createdAt: Scalars["DateTime"]["output"];
  /** The ID of the company. */
  id: Scalars["ID"]["output"];
  /** The company contact's locale (language). */
  locale?: Maybe<Scalars["String"]["output"]>;
  /** The company contact's job title. */
  title?: Maybe<Scalars["String"]["output"]>;
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company contact was last modified.
   */
  updatedAt: Scalars["DateTime"]["output"];
};

/** A company's location. */
export type CompanyLocation = HasMetafields & {
  __typename?: "CompanyLocation";
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company location was created in Shopify.
   */
  createdAt: Scalars["DateTime"]["output"];
  /** A unique externally-supplied ID for the company. */
  externalId?: Maybe<Scalars["String"]["output"]>;
  /** The ID of the company. */
  id: Scalars["ID"]["output"];
  /** The preferred locale of the company location. */
  locale?: Maybe<Scalars["String"]["output"]>;
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The name of the company location. */
  name: Scalars["String"]["output"];
  /** The number of orders placed at this company location. */
  orderCount: Scalars["Int"]["output"];
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company location was last modified.
   */
  updatedAt: Scalars["DateTime"]["output"];
};

/** A company's location. */
export type CompanyLocationMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** The condition to apply the discount candidate. */
export type Condition =
  /** The condition for checking the minimum quantity of products across a group of cart lines. */
  | {
      cartLineMinimumQuantity: CartLineMinimumQuantity;
      cartLineMinimumSubtotal?: never;
      orderMinimumSubtotal?: never;
    } /** The condition for checking the minimum subtotal of products across a group of cart lines. */
  | {
      cartLineMinimumQuantity?: never;
      cartLineMinimumSubtotal: CartLineMinimumSubtotal;
      orderMinimumSubtotal?: never;
    } /** The condition for checking the minimum subtotal amount of the order. */
  | {
      cartLineMinimumQuantity?: never;
      cartLineMinimumSubtotal?: never;
      orderMinimumSubtotal: OrderMinimumSubtotal;
    };

/** A country. */
export type Country = {
  __typename?: "Country";
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
  Ac = "AC",
  /** Andorra. */
  Ad = "AD",
  /** United Arab Emirates. */
  Ae = "AE",
  /** Afghanistan. */
  Af = "AF",
  /** Antigua & Barbuda. */
  Ag = "AG",
  /** Anguilla. */
  Ai = "AI",
  /** Albania. */
  Al = "AL",
  /** Armenia. */
  Am = "AM",
  /** Netherlands Antilles. */
  An = "AN",
  /** Angola. */
  Ao = "AO",
  /** Argentina. */
  Ar = "AR",
  /** Austria. */
  At = "AT",
  /** Australia. */
  Au = "AU",
  /** Aruba. */
  Aw = "AW",
  /** Åland Islands. */
  Ax = "AX",
  /** Azerbaijan. */
  Az = "AZ",
  /** Bosnia & Herzegovina. */
  Ba = "BA",
  /** Barbados. */
  Bb = "BB",
  /** Bangladesh. */
  Bd = "BD",
  /** Belgium. */
  Be = "BE",
  /** Burkina Faso. */
  Bf = "BF",
  /** Bulgaria. */
  Bg = "BG",
  /** Bahrain. */
  Bh = "BH",
  /** Burundi. */
  Bi = "BI",
  /** Benin. */
  Bj = "BJ",
  /** St. Barthélemy. */
  Bl = "BL",
  /** Bermuda. */
  Bm = "BM",
  /** Brunei. */
  Bn = "BN",
  /** Bolivia. */
  Bo = "BO",
  /** Caribbean Netherlands. */
  Bq = "BQ",
  /** Brazil. */
  Br = "BR",
  /** Bahamas. */
  Bs = "BS",
  /** Bhutan. */
  Bt = "BT",
  /** Bouvet Island. */
  Bv = "BV",
  /** Botswana. */
  Bw = "BW",
  /** Belarus. */
  By = "BY",
  /** Belize. */
  Bz = "BZ",
  /** Canada. */
  Ca = "CA",
  /** Cocos (Keeling) Islands. */
  Cc = "CC",
  /** Congo - Kinshasa. */
  Cd = "CD",
  /** Central African Republic. */
  Cf = "CF",
  /** Congo - Brazzaville. */
  Cg = "CG",
  /** Switzerland. */
  Ch = "CH",
  /** Côte d’Ivoire. */
  Ci = "CI",
  /** Cook Islands. */
  Ck = "CK",
  /** Chile. */
  Cl = "CL",
  /** Cameroon. */
  Cm = "CM",
  /** China. */
  Cn = "CN",
  /** Colombia. */
  Co = "CO",
  /** Costa Rica. */
  Cr = "CR",
  /** Cuba. */
  Cu = "CU",
  /** Cape Verde. */
  Cv = "CV",
  /** Curaçao. */
  Cw = "CW",
  /** Christmas Island. */
  Cx = "CX",
  /** Cyprus. */
  Cy = "CY",
  /** Czechia. */
  Cz = "CZ",
  /** Germany. */
  De = "DE",
  /** Djibouti. */
  Dj = "DJ",
  /** Denmark. */
  Dk = "DK",
  /** Dominica. */
  Dm = "DM",
  /** Dominican Republic. */
  Do = "DO",
  /** Algeria. */
  Dz = "DZ",
  /** Ecuador. */
  Ec = "EC",
  /** Estonia. */
  Ee = "EE",
  /** Egypt. */
  Eg = "EG",
  /** Western Sahara. */
  Eh = "EH",
  /** Eritrea. */
  Er = "ER",
  /** Spain. */
  Es = "ES",
  /** Ethiopia. */
  Et = "ET",
  /** Finland. */
  Fi = "FI",
  /** Fiji. */
  Fj = "FJ",
  /** Falkland Islands. */
  Fk = "FK",
  /** Faroe Islands. */
  Fo = "FO",
  /** France. */
  Fr = "FR",
  /** Gabon. */
  Ga = "GA",
  /** United Kingdom. */
  Gb = "GB",
  /** Grenada. */
  Gd = "GD",
  /** Georgia. */
  Ge = "GE",
  /** French Guiana. */
  Gf = "GF",
  /** Guernsey. */
  Gg = "GG",
  /** Ghana. */
  Gh = "GH",
  /** Gibraltar. */
  Gi = "GI",
  /** Greenland. */
  Gl = "GL",
  /** Gambia. */
  Gm = "GM",
  /** Guinea. */
  Gn = "GN",
  /** Guadeloupe. */
  Gp = "GP",
  /** Equatorial Guinea. */
  Gq = "GQ",
  /** Greece. */
  Gr = "GR",
  /** South Georgia & South Sandwich Islands. */
  Gs = "GS",
  /** Guatemala. */
  Gt = "GT",
  /** Guinea-Bissau. */
  Gw = "GW",
  /** Guyana. */
  Gy = "GY",
  /** Hong Kong SAR. */
  Hk = "HK",
  /** Heard & McDonald Islands. */
  Hm = "HM",
  /** Honduras. */
  Hn = "HN",
  /** Croatia. */
  Hr = "HR",
  /** Haiti. */
  Ht = "HT",
  /** Hungary. */
  Hu = "HU",
  /** Indonesia. */
  Id = "ID",
  /** Ireland. */
  Ie = "IE",
  /** Israel. */
  Il = "IL",
  /** Isle of Man. */
  Im = "IM",
  /** India. */
  In = "IN",
  /** British Indian Ocean Territory. */
  Io = "IO",
  /** Iraq. */
  Iq = "IQ",
  /** Iran. */
  Ir = "IR",
  /** Iceland. */
  Is = "IS",
  /** Italy. */
  It = "IT",
  /** Jersey. */
  Je = "JE",
  /** Jamaica. */
  Jm = "JM",
  /** Jordan. */
  Jo = "JO",
  /** Japan. */
  Jp = "JP",
  /** Kenya. */
  Ke = "KE",
  /** Kyrgyzstan. */
  Kg = "KG",
  /** Cambodia. */
  Kh = "KH",
  /** Kiribati. */
  Ki = "KI",
  /** Comoros. */
  Km = "KM",
  /** St. Kitts & Nevis. */
  Kn = "KN",
  /** North Korea. */
  Kp = "KP",
  /** South Korea. */
  Kr = "KR",
  /** Kuwait. */
  Kw = "KW",
  /** Cayman Islands. */
  Ky = "KY",
  /** Kazakhstan. */
  Kz = "KZ",
  /** Laos. */
  La = "LA",
  /** Lebanon. */
  Lb = "LB",
  /** St. Lucia. */
  Lc = "LC",
  /** Liechtenstein. */
  Li = "LI",
  /** Sri Lanka. */
  Lk = "LK",
  /** Liberia. */
  Lr = "LR",
  /** Lesotho. */
  Ls = "LS",
  /** Lithuania. */
  Lt = "LT",
  /** Luxembourg. */
  Lu = "LU",
  /** Latvia. */
  Lv = "LV",
  /** Libya. */
  Ly = "LY",
  /** Morocco. */
  Ma = "MA",
  /** Monaco. */
  Mc = "MC",
  /** Moldova. */
  Md = "MD",
  /** Montenegro. */
  Me = "ME",
  /** St. Martin. */
  Mf = "MF",
  /** Madagascar. */
  Mg = "MG",
  /** North Macedonia. */
  Mk = "MK",
  /** Mali. */
  Ml = "ML",
  /** Myanmar (Burma). */
  Mm = "MM",
  /** Mongolia. */
  Mn = "MN",
  /** Macao SAR. */
  Mo = "MO",
  /** Martinique. */
  Mq = "MQ",
  /** Mauritania. */
  Mr = "MR",
  /** Montserrat. */
  Ms = "MS",
  /** Malta. */
  Mt = "MT",
  /** Mauritius. */
  Mu = "MU",
  /** Maldives. */
  Mv = "MV",
  /** Malawi. */
  Mw = "MW",
  /** Mexico. */
  Mx = "MX",
  /** Malaysia. */
  My = "MY",
  /** Mozambique. */
  Mz = "MZ",
  /** Namibia. */
  Na = "NA",
  /** New Caledonia. */
  Nc = "NC",
  /** Niger. */
  Ne = "NE",
  /** Norfolk Island. */
  Nf = "NF",
  /** Nigeria. */
  Ng = "NG",
  /** Nicaragua. */
  Ni = "NI",
  /** Netherlands. */
  Nl = "NL",
  /** Norway. */
  No = "NO",
  /** Nepal. */
  Np = "NP",
  /** Nauru. */
  Nr = "NR",
  /** Niue. */
  Nu = "NU",
  /** New Zealand. */
  Nz = "NZ",
  /** Oman. */
  Om = "OM",
  /** Panama. */
  Pa = "PA",
  /** Peru. */
  Pe = "PE",
  /** French Polynesia. */
  Pf = "PF",
  /** Papua New Guinea. */
  Pg = "PG",
  /** Philippines. */
  Ph = "PH",
  /** Pakistan. */
  Pk = "PK",
  /** Poland. */
  Pl = "PL",
  /** St. Pierre & Miquelon. */
  Pm = "PM",
  /** Pitcairn Islands. */
  Pn = "PN",
  /** Palestinian Territories. */
  Ps = "PS",
  /** Portugal. */
  Pt = "PT",
  /** Paraguay. */
  Py = "PY",
  /** Qatar. */
  Qa = "QA",
  /** Réunion. */
  Re = "RE",
  /** Romania. */
  Ro = "RO",
  /** Serbia. */
  Rs = "RS",
  /** Russia. */
  Ru = "RU",
  /** Rwanda. */
  Rw = "RW",
  /** Saudi Arabia. */
  Sa = "SA",
  /** Solomon Islands. */
  Sb = "SB",
  /** Seychelles. */
  Sc = "SC",
  /** Sudan. */
  Sd = "SD",
  /** Sweden. */
  Se = "SE",
  /** Singapore. */
  Sg = "SG",
  /** St. Helena. */
  Sh = "SH",
  /** Slovenia. */
  Si = "SI",
  /** Svalbard & Jan Mayen. */
  Sj = "SJ",
  /** Slovakia. */
  Sk = "SK",
  /** Sierra Leone. */
  Sl = "SL",
  /** San Marino. */
  Sm = "SM",
  /** Senegal. */
  Sn = "SN",
  /** Somalia. */
  So = "SO",
  /** Suriname. */
  Sr = "SR",
  /** South Sudan. */
  Ss = "SS",
  /** São Tomé & Príncipe. */
  St = "ST",
  /** El Salvador. */
  Sv = "SV",
  /** Sint Maarten. */
  Sx = "SX",
  /** Syria. */
  Sy = "SY",
  /** Eswatini. */
  Sz = "SZ",
  /** Tristan da Cunha. */
  Ta = "TA",
  /** Turks & Caicos Islands. */
  Tc = "TC",
  /** Chad. */
  Td = "TD",
  /** French Southern Territories. */
  Tf = "TF",
  /** Togo. */
  Tg = "TG",
  /** Thailand. */
  Th = "TH",
  /** Tajikistan. */
  Tj = "TJ",
  /** Tokelau. */
  Tk = "TK",
  /** Timor-Leste. */
  Tl = "TL",
  /** Turkmenistan. */
  Tm = "TM",
  /** Tunisia. */
  Tn = "TN",
  /** Tonga. */
  To = "TO",
  /** Türkiye. */
  Tr = "TR",
  /** Trinidad & Tobago. */
  Tt = "TT",
  /** Tuvalu. */
  Tv = "TV",
  /** Taiwan. */
  Tw = "TW",
  /** Tanzania. */
  Tz = "TZ",
  /** Ukraine. */
  Ua = "UA",
  /** Uganda. */
  Ug = "UG",
  /** U.S. Outlying Islands. */
  Um = "UM",
  /** Unknown country code. */
  Unknown = "UNKNOWN__",
  /** United States. */
  Us = "US",
  /** Uruguay. */
  Uy = "UY",
  /** Uzbekistan. */
  Uz = "UZ",
  /** Vatican City. */
  Va = "VA",
  /** St. Vincent & Grenadines. */
  Vc = "VC",
  /** Venezuela. */
  Ve = "VE",
  /** British Virgin Islands. */
  Vg = "VG",
  /** Vietnam. */
  Vn = "VN",
  /** Vanuatu. */
  Vu = "VU",
  /** Wallis & Futuna. */
  Wf = "WF",
  /** Samoa. */
  Ws = "WS",
  /** Kosovo. */
  Xk = "XK",
  /** Yemen. */
  Ye = "YE",
  /** Mayotte. */
  Yt = "YT",
  /** South Africa. */
  Za = "ZA",
  /** Zambia. */
  Zm = "ZM",
  /** Zimbabwe. */
  Zw = "ZW",
  /** Unknown Region. */
  Zz = "ZZ",
}

/**
 * The three-letter currency codes that represent the world currencies used in
 * stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 */
export enum CurrencyCode {
  /** United Arab Emirates Dirham (AED). */
  Aed = "AED",
  /** Afghan Afghani (AFN). */
  Afn = "AFN",
  /** Albanian Lek (ALL). */
  All = "ALL",
  /** Armenian Dram (AMD). */
  Amd = "AMD",
  /** Netherlands Antillean Guilder. */
  Ang = "ANG",
  /** Angolan Kwanza (AOA). */
  Aoa = "AOA",
  /** Argentine Pesos (ARS). */
  Ars = "ARS",
  /** Australian Dollars (AUD). */
  Aud = "AUD",
  /** Aruban Florin (AWG). */
  Awg = "AWG",
  /** Azerbaijani Manat (AZN). */
  Azn = "AZN",
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  Bam = "BAM",
  /** Barbadian Dollar (BBD). */
  Bbd = "BBD",
  /** Bangladesh Taka (BDT). */
  Bdt = "BDT",
  /** Bulgarian Lev (BGN). */
  Bgn = "BGN",
  /** Bahraini Dinar (BHD). */
  Bhd = "BHD",
  /** Burundian Franc (BIF). */
  Bif = "BIF",
  /** Bermudian Dollar (BMD). */
  Bmd = "BMD",
  /** Brunei Dollar (BND). */
  Bnd = "BND",
  /** Bolivian Boliviano (BOB). */
  Bob = "BOB",
  /** Brazilian Real (BRL). */
  Brl = "BRL",
  /** Bahamian Dollar (BSD). */
  Bsd = "BSD",
  /** Bhutanese Ngultrum (BTN). */
  Btn = "BTN",
  /** Botswana Pula (BWP). */
  Bwp = "BWP",
  /** Belarusian Ruble (BYN). */
  Byn = "BYN",
  /**
   * Belarusian Ruble (BYR).
   * @deprecated `BYR` is deprecated. Use `BYN` available from version `2021-01` onwards instead.
   */
  Byr = "BYR",
  /** Belize Dollar (BZD). */
  Bzd = "BZD",
  /** Canadian Dollars (CAD). */
  Cad = "CAD",
  /** Congolese franc (CDF). */
  Cdf = "CDF",
  /** Swiss Francs (CHF). */
  Chf = "CHF",
  /** Chilean Peso (CLP). */
  Clp = "CLP",
  /** Chinese Yuan Renminbi (CNY). */
  Cny = "CNY",
  /** Colombian Peso (COP). */
  Cop = "COP",
  /** Costa Rican Colones (CRC). */
  Crc = "CRC",
  /** Cape Verdean escudo (CVE). */
  Cve = "CVE",
  /** Czech Koruny (CZK). */
  Czk = "CZK",
  /** Djiboutian Franc (DJF). */
  Djf = "DJF",
  /** Danish Kroner (DKK). */
  Dkk = "DKK",
  /** Dominican Peso (DOP). */
  Dop = "DOP",
  /** Algerian Dinar (DZD). */
  Dzd = "DZD",
  /** Egyptian Pound (EGP). */
  Egp = "EGP",
  /** Eritrean Nakfa (ERN). */
  Ern = "ERN",
  /** Ethiopian Birr (ETB). */
  Etb = "ETB",
  /** Euro (EUR). */
  Eur = "EUR",
  /** Fijian Dollars (FJD). */
  Fjd = "FJD",
  /** Falkland Islands Pounds (FKP). */
  Fkp = "FKP",
  /** United Kingdom Pounds (GBP). */
  Gbp = "GBP",
  /** Georgian Lari (GEL). */
  Gel = "GEL",
  /** Ghanaian Cedi (GHS). */
  Ghs = "GHS",
  /** Gibraltar Pounds (GIP). */
  Gip = "GIP",
  /** Gambian Dalasi (GMD). */
  Gmd = "GMD",
  /** Guinean Franc (GNF). */
  Gnf = "GNF",
  /** Guatemalan Quetzal (GTQ). */
  Gtq = "GTQ",
  /** Guyanese Dollar (GYD). */
  Gyd = "GYD",
  /** Hong Kong Dollars (HKD). */
  Hkd = "HKD",
  /** Honduran Lempira (HNL). */
  Hnl = "HNL",
  /** Croatian Kuna (HRK). */
  Hrk = "HRK",
  /** Haitian Gourde (HTG). */
  Htg = "HTG",
  /** Hungarian Forint (HUF). */
  Huf = "HUF",
  /** Indonesian Rupiah (IDR). */
  Idr = "IDR",
  /** Israeli New Shekel (NIS). */
  Ils = "ILS",
  /** Indian Rupees (INR). */
  Inr = "INR",
  /** Iraqi Dinar (IQD). */
  Iqd = "IQD",
  /** Iranian Rial (IRR). */
  Irr = "IRR",
  /** Icelandic Kronur (ISK). */
  Isk = "ISK",
  /** Jersey Pound. */
  Jep = "JEP",
  /** Jamaican Dollars (JMD). */
  Jmd = "JMD",
  /** Jordanian Dinar (JOD). */
  Jod = "JOD",
  /** Japanese Yen (JPY). */
  Jpy = "JPY",
  /** Kenyan Shilling (KES). */
  Kes = "KES",
  /** Kyrgyzstani Som (KGS). */
  Kgs = "KGS",
  /** Cambodian Riel. */
  Khr = "KHR",
  /** Kiribati Dollar (KID). */
  Kid = "KID",
  /** Comorian Franc (KMF). */
  Kmf = "KMF",
  /** South Korean Won (KRW). */
  Krw = "KRW",
  /** Kuwaiti Dinar (KWD). */
  Kwd = "KWD",
  /** Cayman Dollars (KYD). */
  Kyd = "KYD",
  /** Kazakhstani Tenge (KZT). */
  Kzt = "KZT",
  /** Laotian Kip (LAK). */
  Lak = "LAK",
  /** Lebanese Pounds (LBP). */
  Lbp = "LBP",
  /** Sri Lankan Rupees (LKR). */
  Lkr = "LKR",
  /** Liberian Dollar (LRD). */
  Lrd = "LRD",
  /** Lesotho Loti (LSL). */
  Lsl = "LSL",
  /** Lithuanian Litai (LTL). */
  Ltl = "LTL",
  /** Latvian Lati (LVL). */
  Lvl = "LVL",
  /** Libyan Dinar (LYD). */
  Lyd = "LYD",
  /** Moroccan Dirham. */
  Mad = "MAD",
  /** Moldovan Leu (MDL). */
  Mdl = "MDL",
  /** Malagasy Ariary (MGA). */
  Mga = "MGA",
  /** Macedonia Denar (MKD). */
  Mkd = "MKD",
  /** Burmese Kyat (MMK). */
  Mmk = "MMK",
  /** Mongolian Tugrik. */
  Mnt = "MNT",
  /** Macanese Pataca (MOP). */
  Mop = "MOP",
  /** Mauritanian Ouguiya (MRU). */
  Mru = "MRU",
  /** Mauritian Rupee (MUR). */
  Mur = "MUR",
  /** Maldivian Rufiyaa (MVR). */
  Mvr = "MVR",
  /** Malawian Kwacha (MWK). */
  Mwk = "MWK",
  /** Mexican Pesos (MXN). */
  Mxn = "MXN",
  /** Malaysian Ringgits (MYR). */
  Myr = "MYR",
  /** Mozambican Metical. */
  Mzn = "MZN",
  /** Namibian Dollar. */
  Nad = "NAD",
  /** Nigerian Naira (NGN). */
  Ngn = "NGN",
  /** Nicaraguan Córdoba (NIO). */
  Nio = "NIO",
  /** Norwegian Kroner (NOK). */
  Nok = "NOK",
  /** Nepalese Rupee (NPR). */
  Npr = "NPR",
  /** New Zealand Dollars (NZD). */
  Nzd = "NZD",
  /** Omani Rial (OMR). */
  Omr = "OMR",
  /** Panamian Balboa (PAB). */
  Pab = "PAB",
  /** Peruvian Nuevo Sol (PEN). */
  Pen = "PEN",
  /** Papua New Guinean Kina (PGK). */
  Pgk = "PGK",
  /** Philippine Peso (PHP). */
  Php = "PHP",
  /** Pakistani Rupee (PKR). */
  Pkr = "PKR",
  /** Polish Zlotych (PLN). */
  Pln = "PLN",
  /** Paraguayan Guarani (PYG). */
  Pyg = "PYG",
  /** Qatari Rial (QAR). */
  Qar = "QAR",
  /** Romanian Lei (RON). */
  Ron = "RON",
  /** Serbian dinar (RSD). */
  Rsd = "RSD",
  /** Russian Rubles (RUB). */
  Rub = "RUB",
  /** Rwandan Franc (RWF). */
  Rwf = "RWF",
  /** Saudi Riyal (SAR). */
  Sar = "SAR",
  /** Solomon Islands Dollar (SBD). */
  Sbd = "SBD",
  /** Seychellois Rupee (SCR). */
  Scr = "SCR",
  /** Sudanese Pound (SDG). */
  Sdg = "SDG",
  /** Swedish Kronor (SEK). */
  Sek = "SEK",
  /** Singapore Dollars (SGD). */
  Sgd = "SGD",
  /** Saint Helena Pounds (SHP). */
  Shp = "SHP",
  /** Sierra Leonean Leone (SLL). */
  Sll = "SLL",
  /** Somali Shilling (SOS). */
  Sos = "SOS",
  /** Surinamese Dollar (SRD). */
  Srd = "SRD",
  /** South Sudanese Pound (SSP). */
  Ssp = "SSP",
  /**
   * Sao Tome And Principe Dobra (STD).
   * @deprecated `STD` is deprecated. Use `STN` available from version `2022-07` onwards instead.
   */
  Std = "STD",
  /** Sao Tome And Principe Dobra (STN). */
  Stn = "STN",
  /** Syrian Pound (SYP). */
  Syp = "SYP",
  /** Swazi Lilangeni (SZL). */
  Szl = "SZL",
  /** Thai baht (THB). */
  Thb = "THB",
  /** Tajikistani Somoni (TJS). */
  Tjs = "TJS",
  /** Turkmenistani Manat (TMT). */
  Tmt = "TMT",
  /** Tunisian Dinar (TND). */
  Tnd = "TND",
  /** Tongan Pa'anga (TOP). */
  Top = "TOP",
  /** Turkish Lira (TRY). */
  Try = "TRY",
  /** Trinidad and Tobago Dollars (TTD). */
  Ttd = "TTD",
  /** Taiwan Dollars (TWD). */
  Twd = "TWD",
  /** Tanzanian Shilling (TZS). */
  Tzs = "TZS",
  /** Ukrainian Hryvnia (UAH). */
  Uah = "UAH",
  /** Ugandan Shilling (UGX). */
  Ugx = "UGX",
  /** United States Dollars (USD). */
  Usd = "USD",
  /** Uruguayan Pesos (UYU). */
  Uyu = "UYU",
  /** Uzbekistan som (UZS). */
  Uzs = "UZS",
  /** Venezuelan Bolivares (VED). */
  Ved = "VED",
  /**
   * Venezuelan Bolivares (VEF).
   * @deprecated `VEF` is deprecated. Use `VES` available from version `2020-10` onwards instead.
   */
  Vef = "VEF",
  /** Venezuelan Bolivares Soberanos (VES). */
  Ves = "VES",
  /** Vietnamese đồng (VND). */
  Vnd = "VND",
  /** Vanuatu Vatu (VUV). */
  Vuv = "VUV",
  /** Samoan Tala (WST). */
  Wst = "WST",
  /** Central African CFA Franc (XAF). */
  Xaf = "XAF",
  /** East Caribbean Dollar (XCD). */
  Xcd = "XCD",
  /** West African CFA franc (XOF). */
  Xof = "XOF",
  /** CFP Franc (XPF). */
  Xpf = "XPF",
  /** Unrecognized currency. */
  Xxx = "XXX",
  /** Yemeni Rial (YER). */
  Yer = "YER",
  /** South African Rand (ZAR). */
  Zar = "ZAR",
  /** Zambian Kwacha (ZMW). */
  Zmw = "ZMW",
}

/** A custom product. */
export type CustomProduct = {
  __typename?: "CustomProduct";
  /** Whether the merchandise is a gift card. */
  isGiftCard: Scalars["Boolean"]["output"];
  /** Whether the merchandise requires shipping. */
  requiresShipping: Scalars["Boolean"]["output"];
  /** The localized title of the product in the customer’s locale. */
  title: Scalars["String"]["output"];
  /** The weight of the product variant in the unit system specified with `weight_unit`. */
  weight?: Maybe<Scalars["Float"]["output"]>;
  /** Unit of measurement for weight. */
  weightUnit: WeightUnit;
};

/** Represents a customer with the shop. */
export type Customer = HasMetafields & {
  __typename?: "Customer";
  /**
   * The total amount of money spent by the customer. Converted from the shop's
   * currency to the currency of the cart using a market rate.
   */
  amountSpent: MoneyV2;
  /** The customer’s name, email or phone number. */
  displayName: Scalars["String"]["output"];
  /** The customer’s email address. */
  email?: Maybe<Scalars["String"]["output"]>;
  /** The customer's first name. */
  firstName?: Maybe<Scalars["String"]["output"]>;
  /** Whether the customer has any of the given tags. */
  hasAnyTag: Scalars["Boolean"]["output"];
  /** Whether the customer has the given tags. */
  hasTags: Array<HasTagResponse>;
  /** A unique identifier for the customer. */
  id: Scalars["ID"]["output"];
  /** The customer's last name. */
  lastName?: Maybe<Scalars["String"]["output"]>;
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The number of orders made by the customer. */
  numberOfOrders: Scalars["Int"]["output"];
};

/** Represents a customer with the shop. */
export type CustomerHasAnyTagArgs = {
  tags?: Array<Scalars["String"]["input"]>;
};

/** Represents a customer with the shop. */
export type CustomerHasTagsArgs = {
  tags?: Array<Scalars["String"]["input"]>;
};

/** Represents a customer with the shop. */
export type CustomerMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents information about the merchandise in the cart. */
export type DeliverableCartLine = {
  __typename?: "DeliverableCartLine";
  /**
   * Retrieve a cart line attribute by key.
   *
   * Cart line attributes are also known as line item properties in Liquid.
   */
  attribute?: Maybe<Attribute>;
  /** The ID of the cart line. */
  id: Scalars["ID"]["output"];
  /** The merchandise that the buyer intends to purchase. */
  merchandise: Merchandise;
  /** The quantity of the merchandise that the customer intends to purchase. */
  quantity: Scalars["Int"]["output"];
};

/** Represents information about the merchandise in the cart. */
export type DeliverableCartLineAttributeArgs = {
  key?: InputMaybe<Scalars["String"]["input"]>;
};

/** The delivery discount candidate to be applied. */
export type DeliveryDiscountCandidate = {
  /** The discount code associated with this discount candidate, for code-based discounts. */
  associatedDiscountCode?: InputMaybe<AssociatedDiscountCode>;
  /** The discount message. */
  message?: InputMaybe<Scalars["String"]["input"]>;
  /** The targets of the delivery discount candidate. */
  targets: Array<DeliveryDiscountCandidateTarget>;
  /** The value of the delivery discount candidate. */
  value: DeliveryDiscountCandidateValue;
};

/** The target of the delivery discount candidate. */
export type DeliveryDiscountCandidateTarget =
  /** The target delivery group. */
  | {
      deliveryGroup: DeliveryGroupTarget;
      deliveryOption?: never;
    } /** The target delivery option. */
  | { deliveryGroup?: never; deliveryOption: DeliveryOptionTarget };

/** The delivery discount candidate value. */
export type DeliveryDiscountCandidateValue =
  /** A fixed amount value. */
  | { fixedAmount: FixedAmount; percentage?: never } /** A percentage value. */
  | { fixedAmount?: never; percentage: Percentage };

/** The strategy that's applied to the list of delivery discount candidates. */
export enum DeliveryDiscountSelectionStrategy {
  /**
   * Apply all delivery discount candidates with conditions that are satisfied. This does not override
   * discount combination or stacking rules.
   */
  All = "ALL",
}

/** A group of delivery discounts that share a selection strategy. */
export type DeliveryDiscounts = {
  /** The list of delivery discount candidates to be applied. */
  candidates: Array<DeliveryDiscountCandidate>;
  /** The strategy that's applied to the list of discounts. */
  selectionStrategy: DeliveryDiscountSelectionStrategy;
};

/** The target delivery group. */
export type DeliveryGroupTarget = {
  /** The ID of the target delivery group. */
  id: Scalars["ID"]["input"];
};

/** List of different delivery method types. */
export enum DeliveryMethod {
  /** Local Delivery. */
  Local = "LOCAL",
  /** None. */
  None = "NONE",
  /** Shipping to a Pickup Point. */
  PickupPoint = "PICKUP_POINT",
  /** Local Pickup. */
  PickUp = "PICK_UP",
  /** Retail. */
  Retail = "RETAIL",
  /** Shipping. */
  Shipping = "SHIPPING",
}

/** The operations that can be performed to apply discounts to the delivery lines. */
export type DeliveryOperation =
  /** A group of delivery discounts that share a selection strategy. */
  | {
      addDeliveryDiscounts: DeliveryDiscounts;
      addValidDiscountCodes?: never;
    } /**
   * A list of valid discount codes that correspond to external discounts. This can
   * only be used by Functions with network access.
   */
  | { addDeliveryDiscounts?: never; addValidDiscountCodes: ValidDiscountCodes };

/** The target delivery option. */
export type DeliveryOptionTarget = {
  /** The handle of the target delivery option. */
  handle: Scalars["Handle"]["input"];
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
  Order = "ORDER",
  /**
   * The discount is combined with a
   * [product discount](https://help.shopify.com/manual/discounts/combining-discounts/discount-combinations)
   * class.
   */
  Product = "PRODUCT",
  /**
   * The discount is combined with a
   * [shipping discount](https://help.shopify.com/manual/discounts/combining-discounts/discount-combinations)
   * class.
   */
  Shipping = "SHIPPING",
}

/** A discount wrapper node. */
export type DiscountNode = HasMetafields & {
  __typename?: "DiscountNode";
  /** The discount classes supported by the discount node. */
  discountClasses: Array<DiscountClass>;
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
};

/** A discount wrapper node. */
export type DiscountNodeMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** A fixed amount value. */
export type FixedAmount = {
  /**
   * The fixed amount value of the discount, in the currency of the cart.
   *
   * The amount must be greater than or equal to 0.
   */
  amount: Scalars["Decimal"]["input"];
};

/**
 * The cart.fetch target result. Refer to [network access]
 * (https://shopify.dev/apps/build/functions/input-output/network-access/graphql) for Shopify Functions.
 */
export type FunctionCartFetchResult = {
  /** The http request. */
  request?: InputMaybe<HttpRequest>;
};

/** The cart.run target result. */
export type FunctionCartRunResult = {
  /** The list of operations to apply discounts to the cart. */
  operations: Array<CartOperation>;
};

/**
 * The delivery.fetch target result. Refer to
 * [network access](https://shopify.dev/apps/build/functions/input-output/network-access/graphql) for Shopify Functions.
 */
export type FunctionDeliveryFetchResult = {
  /** The http request. */
  request?: InputMaybe<HttpRequest>;
};

/** The delivery.run target result. */
export type FunctionDeliveryRunResult = {
  /** The list of operations to apply discounts to the delivery lines. */
  operations: Array<DeliveryOperation>;
};

/** Represents a gate configuration. */
export type GateConfiguration = HasMetafields & {
  __typename?: "GateConfiguration";
  /** An optional string identifier. */
  appId?: Maybe<Scalars["String"]["output"]>;
  /** A non-unique string used to group gate configurations. */
  handle?: Maybe<Scalars["Handle"]["output"]>;
  /** The ID of the gate configuration. */
  id: Scalars["ID"]["output"];
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
};

/** Represents a gate configuration. */
export type GateConfigurationMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents a connection from a subject to a gate configuration. */
export type GateSubject = {
  __typename?: "GateSubject";
  /** The bound gate configuration. */
  configuration: GateConfiguration;
  /** The ID of the gate subject. */
  id: Scalars["ID"]["output"];
};

/** Represents a connection from a subject to a gate configuration. */
export type GateSubjectConfigurationArgs = {
  appId?: InputMaybe<Scalars["String"]["input"]>;
};

/** Gate subjects associated to the specified resource. */
export type HasGates = {
  /** Returns active gate subjects bound to the resource. */
  gates: Array<GateSubject>;
};

/** Gate subjects associated to the specified resource. */
export type HasGatesGatesArgs = {
  handle?: InputMaybe<Scalars["Handle"]["input"]>;
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafields = {
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafieldsMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents whether the current object has the given tag. */
export type HasTagResponse = {
  __typename?: "HasTagResponse";
  /** Whether the current object has the tag. */
  hasTag: Scalars["Boolean"]["output"];
  /** The tag. */
  tag: Scalars["String"]["output"];
};

/** The attributes associated with an HTTP request. */
export type HttpRequest = {
  /**
   * The HTTP request body as a plain string.
   * Use this field when the body isn't in JSON format.
   */
  body?: InputMaybe<Scalars["String"]["input"]>;
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
  jsonBody?: InputMaybe<Scalars["JSON"]["input"]>;
  /** The HTTP method. */
  method: HttpRequestMethod;
  /** Policy attached to the HTTP request. */
  policy: HttpRequestPolicy;
  /** The HTTP url (eg.: https://example.com). The scheme needs to be HTTPS. */
  url: Scalars["URL"]["input"];
};

/** The attributes associated with an HTTP request header. */
export type HttpRequestHeader = {
  /** Header name. */
  name: Scalars["String"]["input"];
  /** Header value. */
  value: Scalars["String"]["input"];
};

/** The HTTP request available methods. */
export enum HttpRequestMethod {
  /** Http GET. */
  Get = "GET",
  /** Http POST. */
  Post = "POST",
}

/** The attributes associated with an HTTP request policy. */
export type HttpRequestPolicy = {
  /** Read timeout in milliseconds. */
  readTimeoutMs: Scalars["Int"]["input"];
};

/** The attributes associated with an HTTP response. */
export type HttpResponse = {
  __typename?: "HttpResponse";
  /**
   * The HTTP response body as a plain string.
   * Use this field when the body is not in JSON format.
   */
  body?: Maybe<Scalars["String"]["output"]>;
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
  jsonBody?: Maybe<Scalars["JSON"]["output"]>;
  /** The HTTP status code. */
  status: Scalars["Int"]["output"];
};

/** The attributes associated with an HTTP response. */
export type HttpResponseHeaderArgs = {
  name: Scalars["String"]["input"];
};

/** The attributes associated with an HTTP response header. */
export type HttpResponseHeader = {
  __typename?: "HttpResponseHeader";
  /** Header name. */
  name: Scalars["String"]["output"];
  /** Header value. */
  value: Scalars["String"]["output"];
};

/** The input object for the Function. */
export type Input = {
  __typename?: "Input";
  /** The cart. */
  cart: Cart;
  /** The discount node executing the Function. */
  discountNode: DiscountNode;
  /**
   * Discount codes entered by the buyer as an array of strings, excluding gift cards.
   * Codes are not validated in any way other than gift card filtering.
   */
  enteredDiscountCodes: Array<Scalars["String"]["output"]>;
  /**
   * The result of the fetch target. Refer to [network access](https://shopify.dev/apps/build/functions/input-output/network-access/graphql)
   * for Shopify Functions.
   */
  fetchResult?: Maybe<HttpResponse>;
  /** The localization of the Function execution context. */
  localization: Localization;
  /** The conversion rate between the shop's currency and the currency of the cart. */
  presentmentCurrencyRate: Scalars["Decimal"]["output"];
  /** Information about the shop. */
  shop: Shop;
};

/** A language. */
export type Language = {
  __typename?: "Language";
  /** The ISO code. */
  isoCode: LanguageCode;
};

/** Language codes supported by Shopify. */
export enum LanguageCode {
  /** Afrikaans. */
  Af = "AF",
  /** Akan. */
  Ak = "AK",
  /** Amharic. */
  Am = "AM",
  /** Arabic. */
  Ar = "AR",
  /** Assamese. */
  As = "AS",
  /** Azerbaijani. */
  Az = "AZ",
  /** Belarusian. */
  Be = "BE",
  /** Bulgarian. */
  Bg = "BG",
  /** Bambara. */
  Bm = "BM",
  /** Bangla. */
  Bn = "BN",
  /** Tibetan. */
  Bo = "BO",
  /** Breton. */
  Br = "BR",
  /** Bosnian. */
  Bs = "BS",
  /** Catalan. */
  Ca = "CA",
  /** Chechen. */
  Ce = "CE",
  /** Central Kurdish. */
  Ckb = "CKB",
  /** Czech. */
  Cs = "CS",
  /** Church Slavic. */
  Cu = "CU",
  /** Welsh. */
  Cy = "CY",
  /** Danish. */
  Da = "DA",
  /** German. */
  De = "DE",
  /** Dzongkha. */
  Dz = "DZ",
  /** Ewe. */
  Ee = "EE",
  /** Greek. */
  El = "EL",
  /** English. */
  En = "EN",
  /** Esperanto. */
  Eo = "EO",
  /** Spanish. */
  Es = "ES",
  /** Estonian. */
  Et = "ET",
  /** Basque. */
  Eu = "EU",
  /** Persian. */
  Fa = "FA",
  /** Fulah. */
  Ff = "FF",
  /** Finnish. */
  Fi = "FI",
  /** Filipino. */
  Fil = "FIL",
  /** Faroese. */
  Fo = "FO",
  /** French. */
  Fr = "FR",
  /** Western Frisian. */
  Fy = "FY",
  /** Irish. */
  Ga = "GA",
  /** Scottish Gaelic. */
  Gd = "GD",
  /** Galician. */
  Gl = "GL",
  /** Gujarati. */
  Gu = "GU",
  /** Manx. */
  Gv = "GV",
  /** Hausa. */
  Ha = "HA",
  /** Hebrew. */
  He = "HE",
  /** Hindi. */
  Hi = "HI",
  /** Croatian. */
  Hr = "HR",
  /** Hungarian. */
  Hu = "HU",
  /** Armenian. */
  Hy = "HY",
  /** Interlingua. */
  Ia = "IA",
  /** Indonesian. */
  Id = "ID",
  /** Igbo. */
  Ig = "IG",
  /** Sichuan Yi. */
  Ii = "II",
  /** Icelandic. */
  Is = "IS",
  /** Italian. */
  It = "IT",
  /** Japanese. */
  Ja = "JA",
  /** Javanese. */
  Jv = "JV",
  /** Georgian. */
  Ka = "KA",
  /** Kikuyu. */
  Ki = "KI",
  /** Kazakh. */
  Kk = "KK",
  /** Kalaallisut. */
  Kl = "KL",
  /** Khmer. */
  Km = "KM",
  /** Kannada. */
  Kn = "KN",
  /** Korean. */
  Ko = "KO",
  /** Kashmiri. */
  Ks = "KS",
  /** Kurdish. */
  Ku = "KU",
  /** Cornish. */
  Kw = "KW",
  /** Kyrgyz. */
  Ky = "KY",
  /** Luxembourgish. */
  Lb = "LB",
  /** Ganda. */
  Lg = "LG",
  /** Lingala. */
  Ln = "LN",
  /** Lao. */
  Lo = "LO",
  /** Lithuanian. */
  Lt = "LT",
  /** Luba-Katanga. */
  Lu = "LU",
  /** Latvian. */
  Lv = "LV",
  /** Malagasy. */
  Mg = "MG",
  /** Māori. */
  Mi = "MI",
  /** Macedonian. */
  Mk = "MK",
  /** Malayalam. */
  Ml = "ML",
  /** Mongolian. */
  Mn = "MN",
  /** Marathi. */
  Mr = "MR",
  /** Malay. */
  Ms = "MS",
  /** Maltese. */
  Mt = "MT",
  /** Burmese. */
  My = "MY",
  /** Norwegian (Bokmål). */
  Nb = "NB",
  /** North Ndebele. */
  Nd = "ND",
  /** Nepali. */
  Ne = "NE",
  /** Dutch. */
  Nl = "NL",
  /** Norwegian Nynorsk. */
  Nn = "NN",
  /** Norwegian. */
  No = "NO",
  /** Oromo. */
  Om = "OM",
  /** Odia. */
  Or = "OR",
  /** Ossetic. */
  Os = "OS",
  /** Punjabi. */
  Pa = "PA",
  /** Polish. */
  Pl = "PL",
  /** Pashto. */
  Ps = "PS",
  /** Portuguese. */
  Pt = "PT",
  /** Portuguese (Brazil). */
  PtBr = "PT_BR",
  /** Portuguese (Portugal). */
  PtPt = "PT_PT",
  /** Quechua. */
  Qu = "QU",
  /** Romansh. */
  Rm = "RM",
  /** Rundi. */
  Rn = "RN",
  /** Romanian. */
  Ro = "RO",
  /** Russian. */
  Ru = "RU",
  /** Kinyarwanda. */
  Rw = "RW",
  /** Sanskrit. */
  Sa = "SA",
  /** Sardinian. */
  Sc = "SC",
  /** Sindhi. */
  Sd = "SD",
  /** Northern Sami. */
  Se = "SE",
  /** Sango. */
  Sg = "SG",
  /** Sinhala. */
  Si = "SI",
  /** Slovak. */
  Sk = "SK",
  /** Slovenian. */
  Sl = "SL",
  /** Shona. */
  Sn = "SN",
  /** Somali. */
  So = "SO",
  /** Albanian. */
  Sq = "SQ",
  /** Serbian. */
  Sr = "SR",
  /** Sundanese. */
  Su = "SU",
  /** Swedish. */
  Sv = "SV",
  /** Swahili. */
  Sw = "SW",
  /** Tamil. */
  Ta = "TA",
  /** Telugu. */
  Te = "TE",
  /** Tajik. */
  Tg = "TG",
  /** Thai. */
  Th = "TH",
  /** Tigrinya. */
  Ti = "TI",
  /** Turkmen. */
  Tk = "TK",
  /** Tongan. */
  To = "TO",
  /** Turkish. */
  Tr = "TR",
  /** Tatar. */
  Tt = "TT",
  /** Uyghur. */
  Ug = "UG",
  /** Ukrainian. */
  Uk = "UK",
  /** Urdu. */
  Ur = "UR",
  /** Uzbek. */
  Uz = "UZ",
  /** Vietnamese. */
  Vi = "VI",
  /** Volapük. */
  Vo = "VO",
  /** Wolof. */
  Wo = "WO",
  /** Xhosa. */
  Xh = "XH",
  /** Yiddish. */
  Yi = "YI",
  /** Yoruba. */
  Yo = "YO",
  /** Chinese. */
  Zh = "ZH",
  /** Chinese (Simplified). */
  ZhCn = "ZH_CN",
  /** Chinese (Traditional). */
  ZhTw = "ZH_TW",
  /** Zulu. */
  Zu = "ZU",
}

/** Represents limited information about the current time relative to the parent object. */
export type LocalTime = {
  __typename?: "LocalTime";
  /** The current date relative to the parent object. */
  date: Scalars["Date"]["output"];
  /** Returns true if the current date and time is at or past the given date and time, and false otherwise. */
  dateTimeAfter: Scalars["Boolean"]["output"];
  /** Returns true if the current date and time is before the given date and time, and false otherwise. */
  dateTimeBefore: Scalars["Boolean"]["output"];
  /** Returns true if the current date and time is between the two given date and times, and false otherwise. */
  dateTimeBetween: Scalars["Boolean"]["output"];
  /** Returns true if the current time is at or past the given time, and false otherwise. */
  timeAfter: Scalars["Boolean"]["output"];
  /** Returns true if the current time is at or past the given time, and false otherwise. */
  timeBefore: Scalars["Boolean"]["output"];
  /** Returns true if the current time is between the two given times, and false otherwise. */
  timeBetween: Scalars["Boolean"]["output"];
};

/** Represents limited information about the current time relative to the parent object. */
export type LocalTimeDateTimeAfterArgs = {
  dateTime: Scalars["DateTimeWithoutTimezone"]["input"];
};

/** Represents limited information about the current time relative to the parent object. */
export type LocalTimeDateTimeBeforeArgs = {
  dateTime: Scalars["DateTimeWithoutTimezone"]["input"];
};

/** Represents limited information about the current time relative to the parent object. */
export type LocalTimeDateTimeBetweenArgs = {
  endDateTime: Scalars["DateTimeWithoutTimezone"]["input"];
  startDateTime: Scalars["DateTimeWithoutTimezone"]["input"];
};

/** Represents limited information about the current time relative to the parent object. */
export type LocalTimeTimeAfterArgs = {
  time: Scalars["TimeWithoutTimezone"]["input"];
};

/** Represents limited information about the current time relative to the parent object. */
export type LocalTimeTimeBeforeArgs = {
  time: Scalars["TimeWithoutTimezone"]["input"];
};

/** Represents limited information about the current time relative to the parent object. */
export type LocalTimeTimeBetweenArgs = {
  endTime: Scalars["TimeWithoutTimezone"]["input"];
  startTime: Scalars["TimeWithoutTimezone"]["input"];
};

/** Information about the localized experiences configured for the shop. */
export type Localization = {
  __typename?: "Localization";
  /** The country of the active localized experience. */
  country: Country;
  /** The language of the active localized experience. */
  language: Language;
  /** The market of the active localized experience. */
  market: Market;
};

/**
 * Represents the value captured by a localized field. Localized fields are
 * additional fields required by certain countries on international orders. For
 * example, some countries require additional fields for customs information or tax
 * identification numbers.
 */
export type LocalizedField = {
  __typename?: "LocalizedField";
  /** The key of the localized field. */
  key: LocalizedFieldKey;
  /** The title of the localized field. */
  title: Scalars["String"]["output"];
  /** The value of the localized field. */
  value?: Maybe<Scalars["String"]["output"]>;
};

/** Unique key identifying localized fields. */
export enum LocalizedFieldKey {
  /** Localized field key 'shipping_credential_br' for country Brazil. */
  ShippingCredentialBr = "SHIPPING_CREDENTIAL_BR",
  /** Localized field key 'shipping_credential_cl' for country Chile. */
  ShippingCredentialCl = "SHIPPING_CREDENTIAL_CL",
  /** Localized field key 'shipping_credential_cn' for country China. */
  ShippingCredentialCn = "SHIPPING_CREDENTIAL_CN",
  /** Localized field key 'shipping_credential_co' for country Colombia. */
  ShippingCredentialCo = "SHIPPING_CREDENTIAL_CO",
  /** Localized field key 'shipping_credential_cr' for country Costa Rica. */
  ShippingCredentialCr = "SHIPPING_CREDENTIAL_CR",
  /** Localized field key 'shipping_credential_ec' for country Ecuador. */
  ShippingCredentialEc = "SHIPPING_CREDENTIAL_EC",
  /** Localized field key 'shipping_credential_es' for country Spain. */
  ShippingCredentialEs = "SHIPPING_CREDENTIAL_ES",
  /** Localized field key 'shipping_credential_gt' for country Guatemala. */
  ShippingCredentialGt = "SHIPPING_CREDENTIAL_GT",
  /** Localized field key 'shipping_credential_id' for country Indonesia. */
  ShippingCredentialId = "SHIPPING_CREDENTIAL_ID",
  /** Localized field key 'shipping_credential_kr' for country South Korea. */
  ShippingCredentialKr = "SHIPPING_CREDENTIAL_KR",
  /** Localized field key 'shipping_credential_mx' for country Mexico. */
  ShippingCredentialMx = "SHIPPING_CREDENTIAL_MX",
  /** Localized field key 'shipping_credential_my' for country Malaysia. */
  ShippingCredentialMy = "SHIPPING_CREDENTIAL_MY",
  /** Localized field key 'shipping_credential_pe' for country Peru. */
  ShippingCredentialPe = "SHIPPING_CREDENTIAL_PE",
  /** Localized field key 'shipping_credential_pt' for country Portugal. */
  ShippingCredentialPt = "SHIPPING_CREDENTIAL_PT",
  /** Localized field key 'shipping_credential_py' for country Paraguay. */
  ShippingCredentialPy = "SHIPPING_CREDENTIAL_PY",
  /** Localized field key 'shipping_credential_tr' for country Turkey. */
  ShippingCredentialTr = "SHIPPING_CREDENTIAL_TR",
  /** Localized field key 'shipping_credential_tw' for country Taiwan. */
  ShippingCredentialTw = "SHIPPING_CREDENTIAL_TW",
  /** Localized field key 'shipping_credential_type_co' for country Colombia. */
  ShippingCredentialTypeCo = "SHIPPING_CREDENTIAL_TYPE_CO",
  /** Localized field key 'tax_credential_br' for country Brazil. */
  TaxCredentialBr = "TAX_CREDENTIAL_BR",
  /** Localized field key 'tax_credential_cl' for country Chile. */
  TaxCredentialCl = "TAX_CREDENTIAL_CL",
  /** Localized field key 'tax_credential_co' for country Colombia. */
  TaxCredentialCo = "TAX_CREDENTIAL_CO",
  /** Localized field key 'tax_credential_cr' for country Costa Rica. */
  TaxCredentialCr = "TAX_CREDENTIAL_CR",
  /** Localized field key 'tax_credential_ec' for country Ecuador. */
  TaxCredentialEc = "TAX_CREDENTIAL_EC",
  /** Localized field key 'tax_credential_es' for country Spain. */
  TaxCredentialEs = "TAX_CREDENTIAL_ES",
  /** Localized field key 'tax_credential_gt' for country Guatemala. */
  TaxCredentialGt = "TAX_CREDENTIAL_GT",
  /** Localized field key 'tax_credential_id' for country Indonesia. */
  TaxCredentialId = "TAX_CREDENTIAL_ID",
  /** Localized field key 'tax_credential_it' for country Italy. */
  TaxCredentialIt = "TAX_CREDENTIAL_IT",
  /** Localized field key 'tax_credential_mx' for country Mexico. */
  TaxCredentialMx = "TAX_CREDENTIAL_MX",
  /** Localized field key 'tax_credential_my' for country Malaysia. */
  TaxCredentialMy = "TAX_CREDENTIAL_MY",
  /** Localized field key 'tax_credential_pe' for country Peru. */
  TaxCredentialPe = "TAX_CREDENTIAL_PE",
  /** Localized field key 'tax_credential_pt' for country Portugal. */
  TaxCredentialPt = "TAX_CREDENTIAL_PT",
  /** Localized field key 'tax_credential_py' for country Paraguay. */
  TaxCredentialPy = "TAX_CREDENTIAL_PY",
  /** Localized field key 'tax_credential_tr' for country Turkey. */
  TaxCredentialTr = "TAX_CREDENTIAL_TR",
  /** Localized field key 'tax_credential_type_co' for country Colombia. */
  TaxCredentialTypeCo = "TAX_CREDENTIAL_TYPE_CO",
  /** Localized field key 'tax_credential_type_mx' for country Mexico. */
  TaxCredentialTypeMx = "TAX_CREDENTIAL_TYPE_MX",
  /** Localized field key 'tax_credential_use_mx' for country Mexico. */
  TaxCredentialUseMx = "TAX_CREDENTIAL_USE_MX",
  /** Localized field key 'tax_email_it' for country Italy. */
  TaxEmailIt = "TAX_EMAIL_IT",
}

/** Represents a mailing address. */
export type MailingAddress = {
  __typename?: "MailingAddress";
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars["String"]["output"]>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars["String"]["output"]>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars["String"]["output"]>;
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars["String"]["output"]>;
  /** The two-letter code for the country of the address. For example, US. */
  countryCode?: Maybe<CountryCode>;
  /** The first name of the customer. */
  firstName?: Maybe<Scalars["String"]["output"]>;
  /** The last name of the customer. */
  lastName?: Maybe<Scalars["String"]["output"]>;
  /** The approximate latitude of the address. */
  latitude?: Maybe<Scalars["Float"]["output"]>;
  /** The approximate longitude of the address. */
  longitude?: Maybe<Scalars["Float"]["output"]>;
  /** The market of the address. */
  market?: Maybe<Market>;
  /** The full name of the customer, based on firstName and lastName. */
  name?: Maybe<Scalars["String"]["output"]>;
  /** A unique phone number for the customer. Formatted using E.164 standard. For example, +16135551111. */
  phone?: Maybe<Scalars["String"]["output"]>;
  /** The alphanumeric code for the region. For example, ON. */
  provinceCode?: Maybe<Scalars["String"]["output"]>;
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars["String"]["output"]>;
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
  __typename?: "Market";
  /** A human-readable unique string for the market automatically generated from its title. */
  handle: Scalars["Handle"]["output"];
  /** A globally-unique identifier. */
  id: Scalars["ID"]["output"];
  /** The manager of the market, if the accessing app is the market’s manager. Otherwise, this will be null. */
  manager?: Maybe<MarketManager>;
  /** Returns a metafield by namespace and key that belongs to the resource. */
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
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** The entity that manages a particular market. */
export type MarketManager = {
  __typename?: "MarketManager";
  /**
   * The identity of the manager. This can either be `merchant` if the market is
   * manually managed by the merchant or an ID of the app responsible for managing the market.
   */
  identifier: Scalars["String"]["output"];
};

/** Represents a region. */
export type MarketRegion = {
  /** The name of the region in the language of the current localization. */
  name?: Maybe<Scalars["String"]["output"]>;
};

/** A country which comprises a market. */
export type MarketRegionCountry = MarketRegion & {
  __typename?: "MarketRegionCountry";
  /** The two-letter code for the country. */
  code: CountryCode;
  /** The country name in the language of the current localization. */
  name: Scalars["String"]["output"];
};

/** The merchandise to be purchased at checkout. */
export type Merchandise = CustomProduct | ProductVariant;

/**
 * [Metafields](https://shopify.dev/apps/metafields)
 * enable you to attach additional information to a
 * Shopify resource, such as a [Product](https://shopify.dev/api/admin-graphql/latest/objects/product)
 * or a [Collection](https://shopify.dev/api/admin-graphql/latest/objects/collection).
 * For more information about the Shopify resources that you can attach metafields to, refer to
 * [HasMetafields](https://shopify.dev/api/admin/graphql/reference/common-objects/HasMetafields).
 */
export type Metafield = {
  __typename?: "Metafield";
  /** The data stored in the metafield in JSON format. */
  jsonValue: Scalars["JSON"]["output"];
  /**
   * The type of data that the metafield stores in the `value` field.
   * Refer to the list of [supported types](https://shopify.dev/apps/metafields/types).
   */
  type: Scalars["String"]["output"];
  /** The data stored in the metafield. Always stored as a string, regardless of the metafield's type. */
  value: Scalars["String"]["output"];
};

/** A monetary value with currency. */
export type MoneyV2 = {
  __typename?: "MoneyV2";
  /** Decimal money amount. */
  amount: Scalars["Decimal"]["output"];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/** The root mutation for the API. */
export type MutationRoot = {
  __typename?: "MutationRoot";
  /** Handles the Function result for the purchase.discount.cart_fetch target. */
  cartFetch: Scalars["Void"]["output"];
  /** Handles the Function result for the purchase.discount.cart_run target. */
  cartRun: Scalars["Void"]["output"];
  /** Handles the Function result for the purchase.discount.delivery_fetch target. */
  deliveryFetch: Scalars["Void"]["output"];
  /** Handles the Function result for the purchase.discount.delivery_run target. */
  deliveryRun: Scalars["Void"]["output"];
};

/** The root mutation for the API. */
export type MutationRootCartFetchArgs = {
  result: FunctionCartFetchResult;
};

/** The root mutation for the API. */
export type MutationRootCartRunArgs = {
  result: FunctionCartRunResult;
};

/** The root mutation for the API. */
export type MutationRootDeliveryFetchArgs = {
  result: FunctionDeliveryFetchResult;
};

/** The root mutation for the API. */
export type MutationRootDeliveryRunArgs = {
  result: FunctionDeliveryRunResult;
};

/** The order discount candidate to be applied. */
export type OrderDiscountCandidate = {
  /** The discount code associated with this discount candidate, for code-based discounts. */
  associatedDiscountCode?: InputMaybe<AssociatedDiscountCode>;
  /** The conditions that must be satisfied to apply the order discount candidate. */
  conditions?: InputMaybe<Array<Condition>>;
  /** The discount message. */
  message?: InputMaybe<Scalars["String"]["input"]>;
  /** The targets of the order discount candidate. */
  targets: Array<OrderDiscountCandidateTarget>;
  /** The value of the order discount candidate. */
  value: OrderDiscountCandidateValue;
};

/** A target of a order discount candidate. */
export type OrderDiscountCandidateTarget =
  /** If used, the discount targets the entire order subtotal after product discounts are applied. */
  { orderSubtotal: OrderSubtotalTarget };

/** The order discount candidate value. */
export type OrderDiscountCandidateValue =
  /** A fixed amount value. */
  | { fixedAmount: FixedAmount; percentage?: never } /** A percentage value. */
  | { fixedAmount?: never; percentage: Percentage };

/** The strategy that's applied to the list of order discount candidates. */
export enum OrderDiscountSelectionStrategy {
  /** Only apply the first order discount candidate with conditions that are satisfied. */
  First = "FIRST",
  /** Only apply the order discount candidate that offers the maximum reduction. */
  Maximum = "MAXIMUM",
}

/** A group of order discounts that share a selection strategy. */
export type OrderDiscounts = {
  /** The list of order discount candidates to be applied. */
  candidates: Array<OrderDiscountCandidate>;
  /** The strategy that's applied to the list of discounts. */
  selectionStrategy: OrderDiscountSelectionStrategy;
};

/** The condition for checking the minimum subtotal amount of the order. */
export type OrderMinimumSubtotal = {
  /** Cart line IDs with a merchandise line price that's excluded to calculate the minimum subtotal amount of the order. */
  excludedCartLineIds: Array<Scalars["ID"]["input"]>;
  /** The minimum subtotal amount of the order. */
  minimumAmount: Scalars["Decimal"]["input"];
};

/** If used, the discount targets the entire order subtotal after product discounts are applied. */
export type OrderSubtotalTarget = {
  /**
   * The list of excluded cart line IDs. These cart lines are excluded from the order
   * subtotal calculation when calculating the maximum value of the discount.
   */
  excludedCartLineIds: Array<Scalars["ID"]["input"]>;
};

/** A percentage value. */
export type Percentage = {
  /**
   * The percentage value.
   *
   * The value is validated against: >= 0 and <= 100.
   */
  value: Scalars["Decimal"]["input"];
};

/** Represents a product. */
export type Product = HasGates &
  HasMetafields & {
    __typename?: "Product";
    /** Returns active gate subjects bound to the resource. */
    gates: Array<GateSubject>;
    /** A unique human-friendly string of the product's title. */
    handle: Scalars["Handle"]["output"];
    /** Whether the product has any of the given tags. */
    hasAnyTag: Scalars["Boolean"]["output"];
    /** Whether the product has the given tags. */
    hasTags: Array<HasTagResponse>;
    /** A globally-unique identifier. */
    id: Scalars["ID"]["output"];
    /** Whether the product is in any of the given collections. */
    inAnyCollection: Scalars["Boolean"]["output"];
    /** Whether the product is in the given collections. */
    inCollections: Array<CollectionMembership>;
    /** Whether the product is a gift card. */
    isGiftCard: Scalars["Boolean"]["output"];
    /** Returns a metafield by namespace and key that belongs to the resource. */
    metafield?: Maybe<Metafield>;
    /** The product type specified by the merchant. */
    productType?: Maybe<Scalars["String"]["output"]>;
    /** The localized title of the product in the customer’s locale. */
    title: Scalars["String"]["output"];
    /** The name of the product's vendor. */
    vendor?: Maybe<Scalars["String"]["output"]>;
  };

/** Represents a product. */
export type ProductGatesArgs = {
  handle?: InputMaybe<Scalars["Handle"]["input"]>;
};

/** Represents a product. */
export type ProductHasAnyTagArgs = {
  tags?: Array<Scalars["String"]["input"]>;
};

/** Represents a product. */
export type ProductHasTagsArgs = {
  tags?: Array<Scalars["String"]["input"]>;
};

/** Represents a product. */
export type ProductInAnyCollectionArgs = {
  ids?: Array<Scalars["ID"]["input"]>;
};

/** Represents a product. */
export type ProductInCollectionsArgs = {
  ids?: Array<Scalars["ID"]["input"]>;
};

/** Represents a product. */
export type ProductMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** The product discount candidate to be applied. */
export type ProductDiscountCandidate = {
  /** The discount code associated with this discount candidate, for code-based discounts. */
  associatedDiscountCode?: InputMaybe<AssociatedDiscountCode>;
  /** The discount message. */
  message?: InputMaybe<Scalars["String"]["input"]>;
  /** The targets of the product discount candidate. */
  targets: Array<ProductDiscountCandidateTarget>;
  /** The value of the product discount candidate. */
  value: ProductDiscountCandidateValue;
};

/** A product discount candidate fixed amount value. */
export type ProductDiscountCandidateFixedAmount = {
  /**
   * The fixed amount value of the product discount candidate, in the currency of the cart.
   *
   * The amount must be greater than or equal to 0.
   */
  amount: Scalars["Decimal"]["input"];
  /**
   * Whether to apply the value to each entitled item.
   *
   * The default value is `false`, which causes the value to be applied once across the entitled items.
   * When the value is `true`, the value will be applied to each of the entitled items.
   */
  appliesToEachItem?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * A target of a product discount candidate, which determines which cart line(s) the discount will affect.
 *
 * Multiple targets with the same type and ID are the same as a single target of that type and ID with their
 * quantities added together, or `null` if any of those targets have a quantity of `null`.
 *
 * See the [Discounts API reference](https://shopify.dev/docs/api/functions/reference/product-discounts/graphql#functionrunresult) for examples.
 */
export type ProductDiscountCandidateTarget =
  /** A discount [Target](https://shopify.dev/api/functions/reference/product-discounts/graphql/common-objects/target) that applies to a specific cart line, up to an optional quantity limit. */
  { cartLine: CartLineTarget };

/** The value of the product discount candidate. */
export type ProductDiscountCandidateValue =
  /** A product discount candidate fixed amount value. */
  | {
      fixedAmount: ProductDiscountCandidateFixedAmount;
      percentage?: never;
    } /** A percentage value. */
  | { fixedAmount?: never; percentage: Percentage };

/** The strategy that's applied to the list of product discount candidates. */
export enum ProductDiscountSelectionStrategy {
  /**
   * Apply all product discount candidates with conditions that are satisfied. This
   * does not override discount combination or stacking rules.
   */
  All = "ALL",
  /** Only apply the first product discount candidate with conditions that are satisfied. */
  First = "FIRST",
  /** Only apply the product discount candidate that offers the maximum reduction. */
  Maximum = "MAXIMUM",
}

/** A group of product discounts that share a selection strategy. */
export type ProductDiscounts = {
  /** The list of product discount candidates to be applied. */
  candidates: Array<ProductDiscountCandidate>;
  /** The strategy that's applied to the list of product discount candidates. */
  selectionStrategy: ProductDiscountSelectionStrategy;
};

/** Represents a product variant. */
export type ProductVariant = HasMetafields & {
  __typename?: "ProductVariant";
  /** A globally-unique identifier. */
  id: Scalars["ID"]["output"];
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The product that this variant belongs to. */
  product: Product;
  /** Whether the merchandise requires shipping. */
  requiresShipping: Scalars["Boolean"]["output"];
  /** An identifier for the product variant in the shop. Required in order to connect to a fulfillment service. */
  sku?: Maybe<Scalars["String"]["output"]>;
  /** The localized title of the product variant in the customer’s locale. */
  title?: Maybe<Scalars["String"]["output"]>;
  /** The weight of the product variant in the unit system specified with `weight_unit`. */
  weight?: Maybe<Scalars["Float"]["output"]>;
  /** Unit of measurement for weight. */
  weightUnit: WeightUnit;
};

/** Represents a product variant. */
export type ProductVariantMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents information about the buyer that is interacting with the cart. */
export type PurchasingCompany = {
  __typename?: "PurchasingCompany";
  /** The company associated to the order or draft order. */
  company: Company;
  /** The company contact associated to the order or draft order. */
  contact?: Maybe<CompanyContact>;
  /** The company location associated to the order or draft order. */
  location: CompanyLocation;
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlan = HasMetafields & {
  __typename?: "SellingPlan";
  /** The description of the selling plan. */
  description?: Maybe<Scalars["String"]["output"]>;
  /** A globally-unique identifier. */
  id: Scalars["ID"]["output"];
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'. */
  name: Scalars["String"]["output"];
  /** Whether purchasing the selling plan will result in multiple deliveries. */
  recurringDeliveries: Scalars["Boolean"]["output"];
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlanMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * Represents an association between a variant and a selling plan. Selling plan
 * allocations describe the options offered for each variant, and the price of the
 * variant when purchased with a selling plan.
 */
export type SellingPlanAllocation = {
  __typename?: "SellingPlanAllocation";
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
  __typename?: "SellingPlanAllocationPriceAdjustment";
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

/** Information about the shop. */
export type Shop = HasMetafields & {
  __typename?: "Shop";
  /** Information about the current time relative to the shop's timezone setting. */
  localTime: LocalTime;
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
};

/** Information about the shop. */
export type ShopMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents information about the buyer that is interacting with the cart. */
export type ShopUser = HasMetafields & {
  __typename?: "ShopUser";
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
};

/** Represents information about the buyer that is interacting with the cart. */
export type ShopUserMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace?: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * A discount code that corresponds to a valid external discount.
 * This can only be used by Functions with network access.
 */
export type ValidDiscountCode = {
  /** The discount code. */
  code: Scalars["String"]["input"];
};

/**
 * A list of valid discount codes that correspond to external discounts. This can
 * only be used by Functions with network access.
 */
export type ValidDiscountCodes = {
  /** The list of valid discount codes. */
  codes: Array<ValidDiscountCode>;
};

/** Units of measurement for weight. */
export enum WeightUnit {
  /** Metric system unit of mass. */
  Grams = "GRAMS",
  /** 1 kilogram equals 1000 grams. */
  Kilograms = "KILOGRAMS",
  /** Imperial system unit of mass. */
  Ounces = "OUNCES",
  /** 1 pound equals 16 ounces. */
  Pounds = "POUNDS",
}

export type CartInputVariables = Exact<{ [key: string]: never }>;

export type CartInput = {
  __typename?: "Input";
  cart: {
    __typename?: "Cart";
    lines: Array<{
      __typename?: "CartLine";
      id: string;
      cost: {
        __typename?: "CartLineCost";
        subtotalAmount: { __typename?: "MoneyV2"; amount: any };
      };
    }>;
  };
};

export type DeliveryInputVariables = Exact<{ [key: string]: never }>;

export type DeliveryInput = {
  __typename?: "Input";
  cart: {
    __typename?: "Cart";
    deliveryGroups: Array<{ __typename?: "CartDeliveryGroup"; id: string }>;
  };
};
