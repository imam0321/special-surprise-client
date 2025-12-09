"use client";

import { useState } from "react";
import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";
import ConfirmDialog from "./ConfirmDialog";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="border-surprise-pink text-surprise-pink hover:bg-surprise-pink hover:text-white"
      >
        Logout
      </Button>

      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title="Confirm Logout"
        description="Are you sure you want to log out? You will need to login again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        confirmVariant="destructive"
        onConfirm={async () => {
          await logoutUser();
        }}
      />
    </>
  );
}
