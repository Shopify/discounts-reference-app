import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { Collection, DiscountClass } from "app/types/admin.types";

import { DiscountForm } from "../components/DiscountForm/DiscountForm";
import { NotFoundPage } from "../components/NotFoundPage";
import { getCollectionsByIds } from "../models/collections.server";
import {
  getDiscount,
  updateAutomaticDiscount,
  updateCodeDiscount,
} from "../models/discounts.server";
import { DiscountMethod } from "../types/types";
import { returnToDiscounts } from "../utils/navigation";

interface ActionData {
  errors?: {
    code?: string;
    message: string;
    field?: string[];
  }[];
  success?: boolean;
}

interface LoaderData {
  discount: {
    title: string;
    method: DiscountMethod;
    code: string;
    combinesWith: {
      orderDiscounts: boolean;
      productDiscounts: boolean;
      shippingDiscounts: boolean;
    };
    discountClasses: DiscountClass[];
    usageLimit: number | null;
    appliesOncePerCustomer: boolean;
    startsAt: string;
    endsAt: string | null;
    configuration: {
      cartLinePercentage: number;
      orderPercentage: number;
      deliveryPercentage: number;
      metafieldId: string;
      collectionIds: string[];
    };
  } | null;
  collections: Collection[];
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { id, functionId } = params;
  if (!id) throw new Error("No discount ID provided");

  const formData = await request.formData();
  const discountData = formData.get("discount");
  if (!discountData || typeof discountData !== "string") {
    throw new Error("No discount data provided");
  }

  const {
    title,
    method,
    code,
    combinesWith,
    discountClasses,
    usageLimit,
    appliesOncePerCustomer,
    startsAt,
    endsAt,
    configuration,
  } = JSON.parse(discountData);

  const baseDiscount = {
    functionId,
    title,
    combinesWith,
    discountClasses,
    startsAt: new Date(startsAt),
    endsAt: endsAt && new Date(endsAt),
  };

  // Parse configuration values
  const parsedConfiguration = {
    metafieldId: configuration.metafieldId,
    cartLinePercentage: parseFloat(configuration.cartLinePercentage),
    orderPercentage: parseFloat(configuration.orderPercentage),
    deliveryPercentage: parseFloat(configuration.deliveryPercentage),
    collectionIds: configuration.collectionIds || [],
  };

  let result;

  if (method === DiscountMethod.Code) {
    result = await updateCodeDiscount(
      request,
      id,
      baseDiscount,
      code,
      usageLimit,
      appliesOncePerCustomer,
      parsedConfiguration,
    );
  } else {
    result = await updateAutomaticDiscount(
      request,
      id,
      baseDiscount,
      parsedConfiguration,
    );
  }
  if (result.errors?.length > 0) {
    return { errors: result.errors };
  }
  return { success: true };
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) throw new Error("No discount ID provided");

  const { discount } = await getDiscount(request, id);

  // Fetch collections if they exist in the configuration
  const collections = discount?.configuration?.collectionIds
    ? await getCollectionsByIds(
        request,
        discount.configuration.collectionIds.map((id: string) =>
          id.startsWith("gid://") ? id : `gid://shopify/Collection/${id}`,
        ),
      )
    : [];

  return { discount, collections };
};

export default function VolumeEdit() {
  const actionData = useActionData<ActionData>();
  const { discount: rawDiscount, collections } = useLoaderData<LoaderData>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const submitErrors =
    actionData?.errors?.map((error) => ({
      ...error,
      field: error.field || [],
    })) || [];

  if (!rawDiscount) {
    return <NotFoundPage />;
  }

  // Transform the discount data to match expected types
  const initialData = {
    ...rawDiscount,
    method: rawDiscount.method,
    discountClasses: rawDiscount.discountClasses,
    combinesWith: {
      orderDiscounts: rawDiscount.combinesWith.orderDiscounts,
      productDiscounts: rawDiscount.combinesWith.productDiscounts,
      shippingDiscounts: rawDiscount.combinesWith.shippingDiscounts,
    },
    usageLimit: rawDiscount.usageLimit,
    appliesOncePerCustomer: rawDiscount.appliesOncePerCustomer,
    startsAt: rawDiscount.startsAt,
    endsAt: rawDiscount.endsAt,
    configuration: {
      ...rawDiscount.configuration,
      cartLinePercentage: String(rawDiscount.configuration.cartLinePercentage),
      orderPercentage: String(rawDiscount.configuration.orderPercentage),
      deliveryPercentage: String(rawDiscount.configuration.deliveryPercentage),
      metafieldId: rawDiscount.configuration.metafieldId,
      collectionIds: rawDiscount.configuration.collectionIds || [],
    },
  };

  return (
    <Page>
      <ui-title-bar title={`Edit ${rawDiscount.title}`}>
        <button variant="breadcrumb" onClick={returnToDiscounts}>
          Discounts
        </button>
      </ui-title-bar>

      <DiscountForm
        initialData={initialData}
        collections={collections}
        isEditing={true}
        isLoading={isLoading}
        submitErrors={submitErrors}
        success={actionData?.success}
      />
    </Page>
  );
}
