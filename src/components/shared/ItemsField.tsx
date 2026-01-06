/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/InputFieldError";

interface ItemsFieldProps {
  state?: any;
  isPending?: boolean;
  defaultItems?: string[];
}

export default function ItemsField({
  state,
  isPending = false,
  defaultItems = [""],
}: ItemsFieldProps) {
  const [items, setItems] = useState<string[]>(
    defaultItems.length ? defaultItems : [""]
  );

  const addItem = () => setItems((prev) => [...prev, ""]);
  const updateItem = (index: number, value: string) =>
    setItems((prev) => prev.map((v, i) => (i === index ? value : v)));
  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  return (
    <Field className="md:col-span-2 space-y-2">
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
          className="flex items-center gap-1"
        >
          <Plus size={16} /> Add
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((value, index) => (
          <div key={index} className="flex gap-2">
            <Input
              name={`item-${index}`}
              value={value}
              placeholder={`Item ${index + 1}`}
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
                <X size={14} />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Hidden inputs for proper form submission */}
      {items.map((value, index) => (
        <input
          key={`hidden-${index}`}
          type="hidden"
          name="items[]"
          value={value}
        />
      ))}

      <InputFieldError field="items" state={state} />
    </Field>
  );
}
