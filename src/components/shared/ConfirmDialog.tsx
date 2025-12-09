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
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-xl bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {cancelText}
          </Button>

          <Button
            variant={confirmVariant}
            className={
              confirmVariant === "destructive"
                ? "bg-red-500 text-white hover:bg-red-600"
                : ""
            }
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
