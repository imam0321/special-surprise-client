"use client";

import InfoItem from "@/components/shared/InfoItem";
import UserAvatar from "@/components/shared/UserAvatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "@/types/user.interface";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  moderator: UserInfo | null;
}

export default function ModeratorViewDetailDialog({
  open,
  onClose,
  moderator,
}: Props) {
  if (!moderator) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl max-h-[95vh] bg-white overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-2xl">
            Moderator Details
          </DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start bg-muted p-4 sm:p-6 rounded-lg">
          <UserAvatar
            name={moderator.name}
            image={moderator.profile}
            size="lg"
          />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">{moderator.name}</h2>
            <p className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mt-1">
              <Mail size={16} /> {moderator.email}
            </p>

            <div className="flex gap-2 mt-2 justify-center sm:justify-start flex-wrap">
              <Badge>{moderator?.role}</Badge>
              <Badge variant={moderator?.isDeleted ? "destructive" : "default"}>
                {moderator?.isDeleted ? "Deleted" : "Active"}
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem
            icon={<Phone size={16} />}
            label="Phone"
            value={moderator.phone || "N/A"}
          />
          {moderator.role === "MODERATOR" && (
            <InfoItem
              icon={<User size={16} />}
              label="NID"
              value={moderator.nid || "N/A"}
            />
          )}
          <InfoItem
            icon={<Calendar size={16} />}
            label="Joined"
            value={new Date(moderator.createdAt!).toLocaleDateString()}
          />
        </div>

        <Separator className="my-4" />

        {/* Address */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
            <MapPin size={18} /> Address
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            {moderator.address?.address_detail}, {moderator.address?.city},{" "}
            {moderator.address?.country}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
