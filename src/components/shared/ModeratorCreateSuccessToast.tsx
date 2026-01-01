"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ModeratorCreateSuccessToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("createModerator") === "true") {
      toast.success("Moderator created successfully.");

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("createModerator");
      router.replace(newUrl.toString());
    }
  }, [searchParams, router]);
  return null;
}
