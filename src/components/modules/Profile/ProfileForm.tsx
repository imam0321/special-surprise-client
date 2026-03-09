/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useActionState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/InputFieldError";
import { toast } from "sonner";
import { UserInfo } from "@/types/user.interface";
import { updateProfile } from "@/services/auth/getUserInfo";
import {
  Pencil,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Camera,
  Save,
  X,
  CreditCard,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ProfileFormProps {
  userInfo: UserInfo;
}

export default function ProfileForm({ userInfo }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    userInfo.profile || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, isPending] = useActionState(updateProfile, null);

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(userInfo.profile || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    if (isEditing && !isPending) {
      fileInputRef.current?.click();
    }
  };

  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message || "Profile updated successfully!");
      setIsEditing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="-mt-10">
      <Card className="overflow-hidden border-none shadow-md bg-white/50 backdrop-blur-sm">
        <div className="relative h-48 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20">
          {!isEditing && (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 bg-white/40 hover:bg-white/60 text-surprise-purple border-0 backdrop-blur-md"
              size="sm"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
          {isEditing && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                type="button"
                onClick={handleCancel}
                variant="destructive"
                size="sm"
                className="bg-red-500/80 hover:bg-red-600/90 backdrop-blur-md border-0"
                disabled={isPending}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-emerald-500/80 hover:bg-emerald-600/90 text-white backdrop-blur-md border-0"
                disabled={isPending}
              >
                <Save className="w-4 h-4 mr-2" />
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </div>

        <CardContent className="relative lg:px-8 lg:pb-8">
          {/* Avatar Section - Negative Margin to Overlap */}
          <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="relative group">
              <div
                className={`relative p-1 bg-white rounded-full ${isEditing ? "cursor-pointer" : ""
                  }`}
                onClick={handleAvatarClick}
              >
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  {avatarPreview ? (
                    <AvatarImage
                      src={avatarPreview}
                      alt={userInfo.name}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-4xl bg-surprise-purple/10 text-surprise-purple">
                      {userInfo.name?.[0] || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>

                {isEditing && (
                  <div className="absolute bottom-2 right-2 bg-surprise-pink text-white rounded-full p-2 shadow-lg hover:bg-surprise-pink/90 transition-all z-10 cursor-pointer">
                    <Camera className="w-5 h-5" />
                  </div>
                )}

                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
                    <span className="text-white font-medium text-sm">
                      Change
                    </span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                name="profile"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={isPending}
                className="hidden"
              />
            </div>

            <div className="flex-1 mb-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {userInfo.name}
                </h2>
                <Badge
                  variant="secondary"
                  className="w-fit bg-surprise-purple/20 text-surprise-purple hover:bg-surprise-purple/20"
                >
                  {userInfo.role}
                </Badge>
              </div>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" /> {userInfo.email}
              </p>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 gap-4">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-surprise-pink" />
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>

              <div className="space-y-4">
                <Field>
                  <FieldLabel className="text-gray-500 font-normal">Full Name</FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="name"
                      defaultValue={userInfo.name || ""}
                      disabled={!isEditing || isPending}
                      className="pl-10"
                      placeholder="Your full name"
                    />
                  </div>
                  <InputFieldError field="name" state={state} />
                </Field>

                <Field>
                  <FieldLabel className="text-gray-500 font-normal">Phone Number</FieldLabel>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="phone"
                      defaultValue={userInfo.phone || ""}
                      disabled={!isEditing || isPending}
                      className="pl-10"
                      placeholder="Your phone number"
                    />
                  </div>
                  <InputFieldError field="phone" state={state} />
                </Field>

                {userInfo.role === "MODERATOR" && (
                  <Field>
                    <FieldLabel className="text-gray-500 font-normal">National ID (NID)</FieldLabel>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        name="nid"
                        defaultValue={userInfo.nid || ""}
                        disabled
                        className="pl-10 bg-gray-50"
                      />
                    </div>
                    <InputFieldError field="nid" state={state} />
                  </Field>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-surprise-purple" />
                <h3 className="text-lg font-semibold">Address Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel className="text-gray-500 font-normal">City</FieldLabel>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="city"
                      defaultValue={userInfo.address?.city || ""}
                      disabled={!isEditing || isPending}
                      className="pl-10"
                      placeholder="City"
                    />
                  </div>
                  <InputFieldError field="city" state={state} />
                </Field>

                <Field>
                  <FieldLabel className="text-gray-500 font-normal">Country</FieldLabel>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="country"
                      defaultValue={userInfo.address?.country || ""}
                      disabled={!isEditing || isPending}
                      className="pl-10"
                      placeholder="Country"
                    />
                  </div>
                  <InputFieldError field="country" state={state} />
                </Field>
              </div>

              <Field>
                <FieldLabel className="text-gray-500 font-normal">Full Address</FieldLabel>
                <Textarea
                  name="address_detail"
                  defaultValue={userInfo.address?.address_detail || ""}
                  disabled={!isEditing || isPending}
                  rows={4}
                  className="resize-none"
                  placeholder="Enter your full street address here..."
                />
                <InputFieldError field="address_detail" state={state} />
              </Field>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}