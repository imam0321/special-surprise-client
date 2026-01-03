/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/shared/InputFieldError";
import { useActionState, useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { createProduct } from "@/services/product/product";
import { Category, Product } from "@/types/product.interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface SurpriseFormDialogProps {
  onSuccess?: () => void;
  surprise?: Product;
  categories?: Category[];
}

export default function AddSurpriseForm({
  onSuccess,
  surprise,
  categories,
}: SurpriseFormDialogProps) {
  const [items, setItems] = useState<string[]>([""]);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [state, formAction, isPending] = useActionState(createProduct, null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  useEffect(() => {
    if (
      state &&
      !state.success &&
      state.message &&
      state.message != "Validation failed"
    ) {
      toast.error(state.message);
    }
    if (state?.success) {
      toast.success("Surprise added successfully 🎉");
      formRef.current?.reset();
      setItems([""]);
      setSelectedCategory("");
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onSuccess?.();
    }
  }, [state]);

  const addItem = () => {
    setItems((prev) => [...prev, ""]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Title */}
        <Field>
          <FieldLabel>
            Surprise Title <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            name="title"
            type="text"
            placeholder="Enter title"
            defaultValue={state?.formData?.title || ""}
            disabled={isPending}
          />
          <InputFieldError field="title" state={state} />
        </Field>

        {/* Category */}
        <Field className="md:col-span-1">
          <FieldLabel>
            Category <span className="text-red-500">*</span>
          </FieldLabel>

          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            disabled={isPending}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="categoryId" value={selectedCategory} />
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
            disabled={isPending}
          />
          <InputFieldError field="price" state={state} />
        </Field>

        {/* Discounted Percentage */}
        <Field>
          <FieldLabel>Discounted %</FieldLabel>
          <Input
            name="discountedPrice"
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="Optional"
            disabled={isPending}
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
            placeholder="0.00"
            disabled={isPending}
          />
          <InputFieldError field="deliveryCharge" state={state} />
        </Field>

        {/* Thumbnail */}
        <Field>
          <FieldLabel htmlFor="thumbnail">
            Thumbnail <span className="text-red-500">*</span>
          </FieldLabel>

          <Input
            ref={fileInputRef}
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isPending}
          />

          <InputFieldError field="thumbnail" state={state} />
        </Field>

        {/* Description */}
        <Field className="md:col-span-2">
          <FieldLabel>
            Description 
          </FieldLabel>
          <Textarea
            name="description"
            placeholder="Write description..."
            rows={4}
            disabled={isPending}
          />
          <InputFieldError field="description" state={state} />
        </Field>

        {/* Items */}
        <Field className="md:col-span-2">
          <div className="flex justify-between items-center">
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
                    className="shrink-0"
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
