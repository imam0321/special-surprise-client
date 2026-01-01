/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/shared/InputFieldError";
import { useActionState, useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { createProduct } from "@/services/product/product";
import { Product } from "@/types/product.interface";

interface SurpriseFormDialogProps {
  onSuccess?: () => void;
  surprise?: Product;
}

export default function AddSurpriseForm({
  onSuccess,
  surprise,
}: SurpriseFormDialogProps) {
  const [items, setItems] = useState<string[]>([""]);
  const [state, formAction, isPending] = useActionState(createProduct, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state?.success) {
      toast.success("Surprise added successfully 🎉");
      // Reset form and items
      formRef.current?.reset();
      setItems([""]);
    }
  }, [state]);

  const addItem = () => {
    setItems((prev) => [...prev, ""]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Title */}
        <Field>
          <FieldLabel>
            Surprise Title <span className="text-red-500">*</span>
          </FieldLabel>
          <Input name="title" placeholder="Enter title" required />
          <InputFieldError field="title" state={state} />
        </Field>

        {/* Category */}
        <Field className="md:col-span-1">
          <FieldLabel>
            Category <span className="text-red-500">*</span>
          </FieldLabel>
          <Input name="categoryId" placeholder="Category ID" required />
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
            step="0.01"
            min="0"
            placeholder="0.00"
            required
          />
          <InputFieldError field="price" state={state} />
        </Field>

        {/* Discounted Price */}
        <Field>
          <FieldLabel>Discounted Price</FieldLabel>
          <Input
            name="discountedPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="Optional"
          />
          <InputFieldError field="discountedPrice" state={state} />
        </Field>

        {/* Delivery Charge */}
        <Field>
          <FieldLabel>Delivery Charge</FieldLabel>
          <Input
            name="deliveryCharge"
            type="number"
            step="0.01"
            min="0"
            placeholder="Optional"
          />
          <InputFieldError field="deliveryCharge" state={state} />
        </Field>

        {/* Thumbnail */}
        <Field>
          <FieldLabel>
            Thumbnail URL <span className="text-red-500">*</span>
          </FieldLabel>
          <Input name="thumbnail" type="url" placeholder="https://..." required />
          <InputFieldError field="thumbnail" state={state} />
        </Field>

        {/* Description */}
        <Field className="md:col-span-2">
          <FieldLabel>Description</FieldLabel>
          <Textarea
            name="description"
            placeholder="Write description..."
            rows={4}
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
              + Add Item
            </Button>
          </div>

          <div className="space-y-2">
            {items.map((value, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Enter item"
                  value={value}
                  onChange={(e) => updateItem(index, e.target.value)}
                  disabled={isPending}
                />

                {items.length > 1 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => removeItem(index)}
                    disabled={isPending}
                    aria-label={`Remove item ${index + 1}`}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Server action compatible hidden field - only non-empty items */}
          <input
            type="hidden"
            name="items"
            value={items.filter((item) => item.trim()).join("||")}
          />
          <InputFieldError field="items" state={state} />
        </Field>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-linear-to-r from-surprise-pink to-surprise-purple text-white"
      >
        {isPending ? "Adding..." : "Add Surprise"}
      </Button>
    </form>
  );
}