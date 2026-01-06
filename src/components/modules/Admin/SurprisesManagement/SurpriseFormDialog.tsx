"use client";

import CategorySelect from "@/components/shared/CategorySelect";
import InputFieldError from "@/components/shared/InputFieldError";
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
import { Plus } from "lucide-react";
import Image from "next/image";
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
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!surprise;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState<string[]>([""]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateProduct.bind(null, surprise!.productCode!) : createProduct,
    null
  );

  const prevStateRef = useRef(state);
  const prevOpenRef = useRef(open);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when dialog opens/closes or surprise changes
  useEffect(() => {
    // Only update when dialog opens or surprise changes
    if (open && (!prevOpenRef.current || prevOpenRef.current !== open)) {
      setSelectedCategory(surprise?.categoryId || "");
      setItems(surprise?.items?.length ? surprise.items : [""]);
      setThumbnailFile(null);
    }
    prevOpenRef.current = open;
  }, [open, surprise?.productCode, surprise?.categoryId, surprise?.items]);

  const resetForm = () => {
    formRef.current?.reset();
    setSelectedCategory("");
    setItems([""]);
    setThumbnailFile(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const addItem = () => setItems((prev) => [...prev, ""]);

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, value: string) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    } else {
      setThumbnailFile(null);
    }
  };

  // Handle form submission result
  // useEffect(() => {
  //   if (state === prevStateRef.current) return;
  //   prevStateRef.current = state;

  //   if (state?.success) {
  //     toast.success(state.message || "Surprise saved successfully");
  //     // Schedule state updates after the current render
  //     setTimeout(() => {
  //       resetForm();
  //       onSuccess();
  //       onClose();
  //     }, 0);
  //   } else if (
  //     state &&
  //     !state.success &&
  //     state.message &&
  //     state.message !== "Validation failed"
  //   ) {
  //     toast.error(state.message);
  //   }
  // }, [state]);

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
      onSuccess();
        onClose();
    }
  }, [state, isEdit, onSuccess, onClose]);


  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className="w-[95vw] max-w-3xl max-h-[90vh] flex flex-col bg-white p-4 sm:p-6"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Title */}
            <Field>
              <FieldLabel>
                Surprise Title <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                name="title"
                placeholder="surprise title"
                defaultValue={state?.formData?.title || surprise?.title || ""}
                disabled={isPending}
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
                defaultValue={surprise?.price || state?.formData?.price}
                disabled={isPending}
                placeholder="00"
              />
              <InputFieldError field="price" state={state} />
            </Field>

            {/* Discount */}
            <Field>
              <FieldLabel>Discounted</FieldLabel>
              <Input
                name="discountedPrice"
                type="number"
                min="0"
                defaultValue={
                  surprise?.discountedPrice ||
                  state?.formData?.discountedPrice ||
                  0
                }
                placeholder="00%"
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
                min="0"
                defaultValue={
                  surprise?.deliveryCharge ||
                  state?.formData?.deliveryCharge ||
                  0
                }
                placeholder="00"
                disabled={isPending}
              />
              <InputFieldError field="deliveryCharge" state={state} />
            </Field>

            {/* Thumbnail */}
            <Field>
              <FieldLabel>
                Thumbnail {!isEdit && <span className="text-red-500">*</span>}
              </FieldLabel>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-10 border-2 border-dashed border-gray-300 rounded cursor-pointer flex items-center justify-center overflow-hidden hover:border-gray-400 transition"
              >
                {thumbnailFile ? (
                  <Image
                    src={URL.createObjectURL(thumbnailFile)}
                    alt="Preview"
                    fill
                    className="object-cover rounded"
                  />
                ) : isEdit && surprise?.thumbnail ? (
                  <Image
                    src={surprise.thumbnail}
                    alt="Current thumbnail"
                    fill
                    className="object-cover rounded"
                  />
                ) : (
                  <p className="text-gray-400">Drag or select photo</p>
                )}
              </div>

              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              <InputFieldError field="thumbnail" state={state} />
            </Field>

            {/* Description */}
            <Field className="md:col-span-2">
              <FieldLabel>Description</FieldLabel>
              <Textarea
                name="description"
                rows={4}
                defaultValue={
                  surprise?.description || state?.formData?.description || ""
                }
                placeholder="description"
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
                  <div key={index} className="flex flex-col sm:flex-row gap-2">
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
                        className="self-end sm:self-auto"
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

          {/* Sticky Submit */}
          <div className="sticky bottom-0 bg-white pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-surprise-pink to-surprise-purple text-white"
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
