"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";
import { useState } from "react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  let isPending;

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <Field>
          <FieldLabel>Full Name</FieldLabel>
          <div className="relative">
            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter full name"
              className="pl-10"
              disabled={isPending}
            />
          </div>
        </Field>

        <Field>
          <FieldLabel>Phone</FieldLabel>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Enter phone number"
              className="pl-10"
              disabled={isPending}
            />
          </div>
        </Field>

        {/* Email */}
        <div className="md:col-span-2">
          <Field>
            <FieldLabel>Email Address</FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter email"
                className="pl-10"
                disabled={isPending}
              />
            </div>
          </Field>
        </div>
        {/* Password */}
        <Field>
          <FieldLabel>Password</FieldLabel>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter password"
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
        </Field>

        {/* Confirm Password */}
        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="confirm_password"
              name="confirm_password"
              type={showConfirm ? "text" : "password"}
              required
              placeholder="Confirm password"
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
        </Field>

        {/* Country */}
        <Field>
          <FieldLabel>Country</FieldLabel>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="country"
              name="address[country]"
              type="text"
              required
              placeholder="Enter country"
              className="pl-10"
              disabled={isPending}
            />
          </div>
        </Field>

        {/* City */}
        <Field>
          <FieldLabel>City</FieldLabel>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="city"
              name="address[city]"
              type="text"
              required
              placeholder="Enter city"
              className="pl-10"
              disabled={isPending}
            />
          </div>
        </Field>

        {/* Address Detail - Full width */}
        <div className="md:col-span-2">
          <Field className="md:col-span-2">
            <FieldLabel>Address Detail</FieldLabel>
            <div className="relative">
              <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="address_detail"
                name="address[address_detail]"
                required
                placeholder="Enter street/house"
                className="pl-10 w-full resize-none"
                disabled={isPending}
                rows={1}
              />
            </div>
          </Field>
        </div>
      </div>

      {/* Submit Button */}
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
