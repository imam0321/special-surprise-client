"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Mail } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";
import { forgotPassword } from "@/services/auth/auth.service";

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null);

  useEffect(() => {
    if (state) {
      if (
        !state.success &&
        state.message &&
        state.message !== "Validation failed"
      ) {
        toast.error(state.message);
      } else if (state.success && state.message) {
        toast.success(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            defaultValue={state?.formData?.email || ""}
            className="pl-10"
          />
        </div>
        <InputFieldError field="email" state={state} />
      </Field>

      <Button
        type="submit"
        className="w-full text-white bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
