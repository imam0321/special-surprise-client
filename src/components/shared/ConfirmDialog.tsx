"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  setOpen: (val: boolean) => void;

  title: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  confirmVariant?: "default" | "destructive" | "outline";
  onConfirm: () => void;
  disabled?: boolean;
};

export default function ConfirmDialog({
  open,
  setOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  onConfirm,
  disabled = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    if (disabled) return;
    onConfirm();
  };

  const handleClose = () => {
    if (!disabled) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="rounded-xl bg-white"
        onInteractOutside={(e) => disabled && e.preventDefault()}
        onEscapeKeyDown={(e) => disabled && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={disabled}
          >
            {cancelText}
          </Button>

          <Button
            variant={confirmVariant}
            className={
              confirmVariant === "destructive"
                ? "bg-red-500 text-white hover:bg-red-600"
                : ""
            }
            onClick={handleConfirm}
            disabled={disabled}
          >
            {disabled ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
