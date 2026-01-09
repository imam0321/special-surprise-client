"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/services/auth/auth.service";
import { UserPlus, Lock, Eye, EyeOff, Key } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, isPending] = useActionState(changePassword, null);

  useEffect(() => {
    if (
      state &&
      !state.success &&
      state.message &&
      state.message != "Validation failed"
    ) {
      toast.error(state.message);
    }
    if (state && state.success) {
      toast.success(state.message);
    }
  }, [state]);
  return (
    <form action={formAction} className="space-y-4">
      <Field>
        <FieldLabel>Old Password</FieldLabel>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="oldPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            defaultValue={state?.formData?.oldPassword || ""}
            className="pl-10 pr-10"
            disabled={isPending}
          />
          <button
            type="button"
            aria-label="Toggle password visibility"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <InputFieldError field="oldPassword" state={state} />
      </Field>

      <Field>
        <FieldLabel>New Password</FieldLabel>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="newPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="New password"
            defaultValue={state?.formData?.newPassword || ""}
            className="pl-10 pr-10"
            disabled={isPending}
          />
          <button
            type="button"
            aria-label="Toggle confirm password visibility"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            onClick={() => setShowConfirm(!showConfirm)}
            tabIndex={-1}
          >
            {showConfirm ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <InputFieldError field="newPassword" state={state} />
      </Field>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-white bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        {isPending ? "Resetting..." : "Change Password"}
      </Button>
    </form>
  );
}
