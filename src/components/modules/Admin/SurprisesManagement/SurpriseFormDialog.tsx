"use client";

import CategorySelect from "@/components/shared/CategorySelect";
import InputFieldError from "@/components/shared/InputFieldError";
import ItemsField from "@/components/shared/ItemsField";
import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/services/product/product";
import { Category, Product } from "@/types/product.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface SurpriseFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  surprise?: Product;
  categories?: Category[];
}

export default function SurpriseFormDialog({
  open,
  onClose,
  onSuccess,
  surprise,
  categories,
}: SurpriseFormProps) {
  const isEdit = !!surprise;
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedCategory, setSelectedCategory] = useState(
    isEdit ? surprise.categoryId! : ""
  );

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateProduct.bind(null, surprise!.productCode!) : createProduct,
    null
  );

  const prevStateRef = useRef(state);

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(state.message || "Product saved successfully");
      formRef.current?.reset();
      onSuccess()
      onClose();
    } else if (
      state &&
      !state.success &&
      state.message &&
      state.message != "Validation failed"
    ) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="w-[95vw] max-w-4xl max-h-[90vh] flex flex-col bg-white p-4 sm:p-6"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Surprise" : "Add New Surprise"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to {isEdit ? "update" : "create"} a
            surprise.
          </DialogDescription>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex-1 space-y-4 overflow-y-auto p-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            {/* Title */}
            <Field>
              <FieldLabel>
                Surprise Title <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                name="title"
                defaultValue={state?.formData?.title || surprise?.title || ""}
                disabled={isPending}
                placeholder="Surprise title"
              />
              <InputFieldError field="title" state={state} />
            </Field>

            {/* Category */}
            <Field>
              <CategorySelect
                selectedCategoryId={selectedCategory}
                availableCategories={categories || []}
                onCategoryChange={setSelectedCategory}
                disabled={isPending}
                name="categoryId"
              />
              <InputFieldError field="categoryId" state={state} />
            </Field>

            {/* Price */}
            <Field>
              <FieldLabel>
                Price <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                name="price"
                type="number"
                disabled={isPending}
                defaultValue={state?.formData?.price || surprise?.price || ""}
              />
              <InputFieldError field="price" state={state} />
            </Field>

            {/* Discount */}
            <Field>
              <FieldLabel>Discounted Price</FieldLabel>
              <Input
                name="discountedPrice"
                type="number"
                min="0"
                disabled={isPending}
                defaultValue={
                  state?.formData?.discountedPrice ||
                  surprise?.discountedPrice ||
                  0
                }
              />
              <InputFieldError field="discountedPrice" state={state} />
            </Field>

            {/* Delivery */}
            <Field className="md:col-span-2">
              <FieldLabel>Delivery Charge</FieldLabel>
              <Input
                name="deliveryCharge"
                type="number"
                min="0"
                disabled={isPending}
                defaultValue={
                  state?.formData?.deliveryCharge ||
                  surprise?.deliveryCharge ||
                  0
                }
              />
              <InputFieldError field="deliveryCharge" state={state} />
            </Field>

            {/* Description (FULL WIDTH) */}
            <Field className="md:col-span-1">
              <FieldLabel>Description</FieldLabel>
              <Textarea
                name="description"
                defaultValue={
                  state?.formData?.description || surprise?.description || ""
                }
                disabled={isPending}
                placeholder="Write description..."
                className="lg:h-52 md:h-52"
              />
              <InputFieldError field="description" state={state} />
            </Field>

            {/* Thumbnail */}
            <Field>
              <FieldLabel>Thumbnail</FieldLabel>
              <SingleImageUploader
                onChange={() => {}}
                preview={surprise?.thumbnail || null}
                name="thumbnail"
              />
              <InputFieldError field="thumbnail" state={state} />
            </Field>

            {/* Items (FULL WIDTH) */}
            <ItemsField
              defaultItems={state?.formData?.items || surprise?.items}
              isPending={isPending}
              state={state}
            />
          </div>

          {/* Submit */}
          <div className="sticky bottom-0 bg-white pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-linear-to-r from-pink-500 to-purple-500 text-white"
            >
              {isPending
                ? isEdit
                  ? "Updating..."
                  : "Adding..."
                : isEdit
                ? "Update Surprise"
                : "Add Surprise"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
