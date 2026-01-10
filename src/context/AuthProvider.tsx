"use client";

import { ReactNode } from "react";
import { AuthContext, AuthUser } from "./AuthContext";

export default function AuthProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: AuthUser | null;
}) {
  return (
    <AuthContext.Provider value={{ user, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}
