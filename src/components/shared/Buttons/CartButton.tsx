"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label="Shopping Cart"
    >
      <ShoppingCart className="h-5 w-5" />

      <span className="absolute -top-1 -right-1 bg-surprise-pink text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
        {cartCount}
      </span>
    </Button>
  );
}
