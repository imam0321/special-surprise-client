"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { registerModerator } from "@/services/auth/registerModerator";
import {
  Mail,
  UserPlus,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Globe,
  MapPin,
  Home,
  Key,
  IdCard,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";


export default function ModeratorRegisterForm() {
   const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, isPending] = useActionState(registerModerator, null);

  useEffect(() => {
    if (
      state &&
      !state.success &&
      state.message &&
      state.message != "Validation failed"
    ) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Name */}
        <Field>
          <FieldLabel>Full Name</FieldLabel>
          <div className="relative">
            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="name"
              type="text"
              placeholder="Enter full name"
              defaultValue={state?.formData?.name || ""}
              className="pl-10"
              disabled={isPending}
            />
          </div>
          <InputFieldError field="name" state={state} />
        </Field>

        <Field>
          <FieldLabel>Phone</FieldLabel>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              defaultValue={state?.formData?.phone || ""}
              className="pl-10"
              disabled={isPending}
            />
          </div>
          <InputFieldError field="phone" state={state} />
        </Field>

        {/* Email */}
        <div className="md:col-span-1">
          <Field>
            <FieldLabel>Email Address</FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                name="email"
                type="email"
                placeholder="Enter email"
                defaultValue={state?.formData?.email || ""}
                className="pl-10"
                disabled={isPending}
              />
            </div>
            <InputFieldError field="email" state={state} />
          </Field>
        </div>

         <Field>
          <FieldLabel>NID Number</FieldLabel>
          <div className="relative">
           <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="nid"
              type="tel"
              placeholder="Enter NID number"
              defaultValue={state?.formData?.nid || ""}
              className="pl-10"
              disabled={isPending}
            />
          </div>
          <InputFieldError field="nid" state={state} />
        </Field>


        {/* Password */}
        <Field>
          <FieldLabel>Password</FieldLabel>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              defaultValue={state?.formData?.password || ""}
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

        {/* Confirm Password */}
        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="confirm_password"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              defaultValue={state?.formData?.confirm_password || ""}
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
          <InputFieldError field="confirm_password" state={state} />
        </Field>

        {/* Country */}
        <Field>
          <FieldLabel>Country</FieldLabel>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="country"
              type="text"
              placeholder="Enter country"
              defaultValue={state?.formData?.address?.country || ""}
              className="pl-10"
              disabled={isPending}
            />
          </div>
          <InputFieldError field="address.country" state={state} />
        </Field>

        {/* City */}
        <Field>
          <FieldLabel>City</FieldLabel>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="city"
              type="text"
              placeholder="Enter city"
              defaultValue={state?.formData?.address?.city || ""}
              className="pl-10"
              disabled={isPending}
            />
          </div>
          <InputFieldError field="address.city" state={state} />
        </Field>

        {/* Address Detail - Full width */}
        <div className="md:col-span-2">
          <Field className="md:col-span-2">
            <FieldLabel>Address Detail</FieldLabel>
            <div className="relative">
              <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                name="address_detail"
                placeholder="Enter street/house"
                className="pl-10 w-full resize-none"
                defaultValue={state?.formData?.address?.address_detail || ""}
                disabled={isPending}
                rows={1}
              />
            </div>
            <InputFieldError field="address.address_detail" state={state} />
          </Field>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-white bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        {isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
