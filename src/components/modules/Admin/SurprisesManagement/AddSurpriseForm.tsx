"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/shared/InputFieldError";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/services/product/product";
import { Category, Product } from "@/types/product.interface";
import { Plus } from "lucide-react";
import CategorySelect from "@/components/shared/CategorySelect";
import Image from "next/image";

interface SurpriseFormProps {
  surprise?: Product;
  categories?: Category[];
}

export default function AddSurpriseForm({
  surprise,
  categories = [],
}: SurpriseFormProps) {
  const isEdit = !!surprise;

  // Initialize with surprise data in edit mode
  const [selectedCategory, setSelectedCategory] = useState<string>(
    surprise?.categoryId || ""
  );
  const [items, setItems] = useState<string[]>(
    surprise?.items && surprise.items.length > 0 ? surprise.items : [""]
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateProduct.bind(null, surprise.productCode!) : createProduct,
    null
  );

  const addItem = () => setItems((prev) => [...prev, ""]);
  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));
  const updateItem = (index: number, value: string) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  useEffect(() => {
    if (state) {
      if (
        !state.success &&
        state.message &&
        state.message !== "Validation failed"
      ) {
        toast.error(state.message);
      }
    }
    if (state?.success) {
      toast.success(
        isEdit
          ? "Surprise updated successfully 🎉"
          : "Surprise added successfully 🎉"
      );
    }
  }, [state, isEdit]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <Field>
          <FieldLabel>
            Surprise Title <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            name="title"
            defaultValue={
              isEdit ? surprise?.title || "" : state?.formData?.title || ""
            }
            disabled={isPending}
          />
          <InputFieldError field="title" state={state} />
        </Field>

        {/* Category */}
        <CategorySelect
          selectedCategoryId={selectedCategory}
          availableCategories={categories}
          onCategoryChange={setSelectedCategory}
          disabled={isPending}
        />
        {/* Hidden input to submit category */}
        <input type="hidden" name="categoryId" value={selectedCategory} />

        {/* Price */}
        <Field>
          <FieldLabel>
            Price <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            name="price"
            type="number"
            step="0.01"
            defaultValue={surprise?.price ?? ""}
            disabled={isPending}
          />
          <InputFieldError field="price" state={state} />
        </Field>

        {/* Discount */}
        <Field>
          <FieldLabel>Discounted Price</FieldLabel>
          <Input
            name="discountedPrice"
            type="number"
            step="0.01"
            defaultValue={surprise?.discountedPrice ?? ""}
            disabled={isPending}
          />
          <InputFieldError field="discountedPrice" state={state} />
        </Field>

        {/* Delivery */}
        <Field>
          <FieldLabel>Delivery Charge</FieldLabel>
          <Input
            name="deliveryCharge"
            type="number"
            step="0.01"
            defaultValue={surprise?.deliveryCharge ?? ""}
            disabled={isPending}
          />
          <InputFieldError field="deliveryCharge" state={state} />
        </Field>

        {/* Thumbnail */}
        <Field>
          <FieldLabel>
            Thumbnail {!isEdit && <span className="text-red-500">*</span>}
          </FieldLabel>

          <Input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isPending}
          />

          {/* Edit mode existing image */}
          {isEdit && surprise?.thumbnail && !thumbnailFile && (
            <p className="text-sm text-gray-500 mt-1">
              Current: {surprise.thumbnail.split("/").pop()}
            </p>
          )}

          {/* Preview new image */}
          {thumbnailFile && (
            <div className="mt-2">
              <Image
                src={URL.createObjectURL(thumbnailFile)}
                alt="Preview"
                width={80}
                height={80}
                className="rounded object-cover"
              />
            </div>
          )}

          <InputFieldError field="thumbnail" state={state} />
        </Field>

        {/* Description */}
        <Field className="md:col-span-2">
          <FieldLabel>Description</FieldLabel>
          <Textarea
            name="description"
            rows={4}
            defaultValue={surprise?.description ?? ""}
            disabled={isPending}
          />
          <InputFieldError field="description" state={state} />
        </Field>

        {/* Items */}
        <Field className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <FieldLabel>
              Items <span className="text-red-500">*</span>
            </FieldLabel>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addItem}
              disabled={isPending}
            >
              <Plus size={16} />
            </Button>
          </div>

          <div className="space-y-2">
            {items.map((value, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={value}
                  placeholder="Enter item"
                  onChange={(e) => updateItem(index, e.target.value)}
                  disabled={isPending}
                />
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={isPending}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
          </div>

          <input
            type="hidden"
            name="items"
            value={items.filter((i) => i.trim()).join("||")}
          />
          <InputFieldError field="items" state={state} />
        </Field>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-linear-to-r from-surprise-pink to-surprise-purple text-white"
      >
        {isPending
          ? isEdit
            ? "Updating..."
            : "Adding..."
          : isEdit
          ? "Update Surprise"
          : "Add Surprise"}
      </Button>
    </form>
  );
}
