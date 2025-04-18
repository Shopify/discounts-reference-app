import { DiscountClass } from "./admin.types";
import { DiscountMethod } from "./types";

interface CombinesWith {
  orderDiscounts: boolean;
  productDiscounts: boolean;
  shippingDiscounts: boolean;
}

interface DiscountConfiguration {
  quantity: string;
  productPercentage: string;
  orderPercentage: string;
  deliveryPercentage: string;
  metafieldId?: string;
}

export interface FormState {
  title: string;
  method: DiscountMethod;
  code: string;
  combinesWith: CombinesWith;
  discountClasses: DiscountClass[];
  usageLimit: string;
  appliesOncePerCustomer: boolean;
  startDate: Date | string;
  endDate: Date | string | null;
  configuration: DiscountConfiguration;
}
