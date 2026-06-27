"use client";

import BasicInformation from "@/src/features/product/components/BasicInformation";
import StatusAndVisibility from "@/src/features/product/components/StatusAndVisibility";
import Pricing from "@/src/features/product/components/Pricing";
import Inventory from "@/src/features/product/components/Inventory";
import Images from "@/src/features/product/components/Images";
import Description from "@/src/features/product/components/Description";
import BottomBar from "@/src/features/product/components/BottomBar";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateProductFormInput,
  CreateProductInput,
  createProductSchema,
} from "./schemas/AddProductSchema";
import { apiFetch } from "@/src/lib/api-client";
import { handleFormError } from "@/src/lib/form-errors";
import { notify } from "@/src/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";

const AddProduct = () => {
  const methods = useForm<CreateProductFormInput>({
    resolver: zodResolver(createProductSchema),
    mode: "onBlur",
    defaultValues: {
      status: "Draft",
      isFeatured: false,
      categoryId: "",
    },
  });

  const onSubmit = async (formValues: CreateProductFormInput) => {
    const data = formValues as CreateProductInput;

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("categoryId", data.categoryId);
      formData.append("description", data.description);
      formData.append("status", data.status);
      formData.append("price", data.price.toString());
      formData.append("isFeatured", data.isFeatured.toString());
      formData.append("hasVariants", data.hasVariants.toString());

      if (data.sku) formData.append("sku", data.sku);
      if (data.stock !== undefined && data.stock !== null) {
        formData.append("stock", data.stock.toString());
      }
      if (
        data.lowStockThreshold !== undefined &&
        data.lowStockThreshold !== null
      ) {
        formData.append("lowStockThreshold", data.lowStockThreshold.toString());
      }
      if (data.compareAtPrice !== undefined && data.compareAtPrice !== null) {
        formData.append("compareAtPrice", data.compareAtPrice.toString());
      }
      if (data.costPrice !== undefined && data.costPrice !== null) {
        formData.append("costPrice", data.costPrice.toString());
      }

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      await apiFetch(`/api/product/`, {
        method: "POST",
        body: formData,
      });

      methods.reset();
      notify.success("Product created successfully!");
    } catch (err) {
      handleFormError(err, methods.setError);
    }
  };

  return (
    <div className="px-6 py-8">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.5fr_0.5fr]">
            {/* ════════════════════════
              LEFT COLUMN
          ════════════════════════ */}
            <div className="flex flex-col gap-6">
              <BasicInformation />

              <StatusAndVisibility />

              <Pricing />

              <Inventory />
            </div>

            {/* ════════════════════════
              RIGHT COLUMN
          ════════════════════════ */}
            <div className="flex flex-col gap-6">
              {/* Images — ICollection<ProductImage> */}
              <Images />

              {/* Description */}
              <Description />
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <BottomBar />
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
