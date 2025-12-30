"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/services/product/categories";
import { Category } from "@/types/product.interface";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface CategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: Category;
}

export default function CategoryFormDialog({
  open,
  onClose,
  onSuccess,
  category,
}: CategoryFormDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!category;

  const [state, formAction, pending] = useActionState(
    createCategory,
    null
  );

  const prevStateRef = useRef(state);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(state.message || "Category saved successfully");
      formRef.current?.reset();
      onSuccess();
      onClose();
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent className="max-h-[90vh] flex flex-col p-0 bg-white">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="name">Category Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Electronics"
                defaultValue={
                  state?.formData?.name || category?.name || ""
                }
              />
              <InputFieldError state={state} field="name" />
            </Field>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 ">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEdit
                ? "Update"
                : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
