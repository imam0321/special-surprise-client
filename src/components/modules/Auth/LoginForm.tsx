/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const demoUsers = {
  admin: {
    email: "admin@gmail.com",
    password: "123456789",
  },
  user: {
    email: "imam.hossain0321@gmail.com",
    password: "123456789",
  },
  moderator: {
    email: "moderator@gmail.com",
    password: "123456789",
  },
};

export default function LoginForm({ redirectPath }: { redirectPath?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state) {
      if (
        !state.success &&
        state.message &&
        state.message != "Validation failed"
      ) {
        toast.error(state.message);
      }
    }
  }, [state]);

  useEffect(() => {
    if (state?.formData) {
      setEmail(state.formData.email || "");
      setPassword(state.formData.password || "");
    }
  }, [state]);

  const fillDemoUser = (role: "admin" | "user" | "moderator") => {
    setEmail(demoUsers[role].email);
    setPassword(demoUsers[role].password);
  };

  return (
    <form action={formAction} className="space-y-4">
      <div className="mb-4">
        <p className="mb-2 text-sm text-muted-foreground text-center">
          Demo Login
        </p>

        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => fillDemoUser("admin")}
          >
            Admin
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => fillDemoUser("user")}
          >
            User
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => fillDemoUser("moderator")}
          >
            Moderator
          </Button>
        </div>
      </div>

      {redirectPath && (
        <Input type="hidden" name="redirectPath" value={redirectPath} />
      )}
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // defaultValue={state?.formData?.email || ""}
            className="pl-10"
            disabled={isPending}
          />
        </div>
        <InputFieldError field="email" state={state} />
      </Field>

      <Field>
        <FieldLabel>Password</FieldLabel>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            // defaultValue={state?.formData?.password || ""}
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
        <InputFieldError field="password" state={state} />
      </Field>

      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline hover:text-surprise-pink"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-white bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <LogIn className="mr-2 h-4 w-4" />
        {isPending ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
}
