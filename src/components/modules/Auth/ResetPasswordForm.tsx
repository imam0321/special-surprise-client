"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/services/auth/auth.service";
import { UserPlus, Lock, Eye, EyeOff, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  redirect?: string;
  id?: string;
  token?: string;
}

export default function ResetPasswordForm({
  redirect,
  id,
  token,
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(resetPassword, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }

    if (state && state.success && state.redirectToLogin) {
      toast.success(state.message);
      setTimeout(() => {
        router.push(redirect || "/login");
      }, 1500);
    }
  }, [state, router, redirect]);

  return (
    <form action={formAction} className="space-y-4">
      {id && <Input type="hidden" name="id" value={id} />}
      {redirect && <Input type="hidden" name="redirect" value={redirect} />}
      {token && <Input type="hidden" name="token" value={token} />}

      <Field>
        <FieldLabel>New Password</FieldLabel>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            defaultValue={state?.formData?.newPassword || ""}
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
        <InputFieldError field="newPassword" state={state} />
      </Field>

      <Field>
        <FieldLabel>Confirm Password</FieldLabel>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            defaultValue={state?.formData?.confirmPassword || ""}
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
        <InputFieldError field="confirmPassword" state={state} />
      </Field>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-white bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        {isPending ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
