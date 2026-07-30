import type { Metadata } from "next";
import { Poppins, Pacifico } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-pacifico",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Special Surprise — Thoughtful & Personalized Gift Store",
    template: "%s | Special Surprise"
  },
  description: "Discover handcrafted, personalized surprise gift boxes and unforgettable gift experiences for your loved ones. Delivery available across Bangladesh.",
  keywords: ["surprise gift", "gift box Bangladesh", "personalized gifts", "birthday surprise", "anniversary gift"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${pacifico.variable} antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
        <Suspense fallback={null}>
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
