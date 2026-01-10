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
import { Pencil } from "lucide-react";

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
      // File size check (5MB)
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
    <form action={formAction} className="space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="relative group">
          <Avatar
            className={`w-24 h-24 border shadow transition-all ${
              isEditing ? "cursor-pointer hover:opacity-80" : ""
            }`}
            onClick={handleAvatarClick}
          >
            {avatarPreview ? (
              <AvatarImage src={avatarPreview} alt={userInfo.name} />
            ) : (
              <AvatarFallback>{userInfo.name?.[0] || "U"}</AvatarFallback>
            )}
          </Avatar>

          {isEditing && (
            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          )}

          {isEditing && (
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={isPending}
              className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
              title="Change avatar"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
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
        <div>
          <p className="text-lg font-semibold">{userInfo.name}</p>
          <p className="text-sm text-muted-foreground">{userInfo.email}</p>
          {isEditing && (
            <p className="text-xs text-muted-foreground mt-1">
              Click avatar to change photo
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Full Name</FieldLabel>
          <Input
            name="name"
            defaultValue={userInfo.name || ""}
            disabled={!isEditing || isPending}
          />
          <InputFieldError field="name" state={state} />
        </Field>
        <Field>
          <FieldLabel>Phone</FieldLabel>
          <Input
            name="phone"
            defaultValue={userInfo.phone || ""}
            disabled={!isEditing || isPending}
          />
          <InputFieldError field="phone" state={state} />
        </Field>
        {userInfo.role === "MODERATOR" && (
          <Field>
            <FieldLabel>NID</FieldLabel>
            <Input
              name="nid"
              defaultValue={userInfo.nid || ""}
              disabled={!isEditing || isPending}
            />
            <InputFieldError field="nid" state={state} />
          </Field>
        )}
        <Field>
          <FieldLabel>City</FieldLabel>
          <Input
            name="city"
            defaultValue={userInfo.address?.city || ""}
            disabled={!isEditing || isPending}
          />
          <InputFieldError field="city" state={state} />
        </Field>
        <Field>
          <FieldLabel>Country</FieldLabel>
          <Input
            name="country"
            defaultValue={userInfo.address?.country || ""}
            disabled={!isEditing || isPending}
          />
          <InputFieldError field="country" state={state} />
        </Field>
        <div className="md:col-span-2">
          <Field>
            <FieldLabel>Address Detail</FieldLabel>
            <Textarea
              name="address_detail"
              defaultValue={userInfo.address?.address_detail || ""}
              disabled={!isEditing || isPending}
              rows={3}
              className="resize-none"
            />
            <InputFieldError field="address_detail" state={state} />
          </Field>
        </div>
      </div>
      <div className="flex gap-2 pt-4">
        {!isEditing ? (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
