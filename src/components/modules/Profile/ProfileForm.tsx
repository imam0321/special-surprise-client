"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShieldCheck, ShieldX } from "lucide-react";
import UserAvatar from "@/components/shared/UserAvatar";
import { formatDateTime } from "@/lib/formatters";
import { UserInfo } from "@/types/user.interface";

const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  nid: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm({ userInfo }: { userInfo: UserInfo }) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userInfo.name ?? "",
      phone: userInfo.phone ?? "",
      nid: userInfo.nid ?? "",
    },
  });

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Profile header */}
          <div className="md:col-span-2 flex items-center gap-4">
            <UserAvatar
              name={userInfo.name}
              image={userInfo.profile}
              size="lg"
            />

            <div>
              <p className="text-lg font-semibold">{userInfo.name}</p>
              <div className="flex gap-2 mt-1">
                <Badge >{userInfo.role}</Badge>
                <Badge
                  className={cn(
                    userInfo.status === "ACTIVE"
                      ? "bg-green-500"
                      : "bg-red-500",
                    "text-white"
                  )}
                >
                  {userInfo.status === "ACTIVE" ? (
                    <ShieldCheck className="h-3 w-3 mr-1" />
                  ) : (
                    <ShieldX className="h-3 w-3 mr-1" />
                  )}
                  {userInfo.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Joined {formatDateTime(userInfo.createdAt)}
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input disabled={!isEditing} {...form.register("name")} />
          </div>

          {/* Phone */}
          <div>
            <Label>Phone</Label>
            <Input disabled={!isEditing} {...form.register("phone")} />
          </div>

          {/* NID */}
          {userInfo.role === "MODERATOR" && (
            <div>
              <Label>NID</Label>
              <Input disabled={!isEditing} {...form.register("nid")} />
            </div>
          )}

          {/* Email */}
          <div className="md:col-span-2">
            <Label>Email</Label>
            <Input disabled value={userInfo.email} />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-2">
            {!isEditing ? (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <>
                {/* Save button later */}
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
