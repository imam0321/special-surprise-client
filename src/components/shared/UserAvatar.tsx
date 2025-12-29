"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getInitials = (name?: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export default function UserAvatar({
  name,
  image,
  size = "lg",
}: {
  name?: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = {
    sm: "h-10 w-10 text-sm",
    md: "h-16 w-16 text-lg",
    lg: "h-24 w-24 text-2xl",
  };

  return (
    <Avatar className={`${sizeMap[size]} border shadow`}>
      {image ? <AvatarImage src={image} alt={name} /> : null}
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
