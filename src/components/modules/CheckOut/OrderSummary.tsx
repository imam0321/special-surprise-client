"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/product.interface";
import { Package, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface OrderSummaryProps {
  surprise: Product;
}

export default function OrderSummary({ surprise }: OrderSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!surprise) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No product data available.
        </CardContent>
      </Card>
    );
  }

  // Calculate prices
  const basePrice = Number(surprise.price) || 0;
  const discount = Number(surprise.discountedPrice) || 0;
  const deliveryCharge = Number(surprise.deliveryCharge) || 0;

  // Calculate discounted price if discount exists
  const discountAmount = discount > 0 ? (basePrice * discount) / 100 : 0;
  const priceAfterDiscount = basePrice - discountAmount;
  const total = priceAfterDiscount + deliveryCharge;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Order placed successfully!");
    } catch (error) {
      console.error("Order placement failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-surprise-pink" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Product Info */}
        <div className="space-y-2">
          <p className="font-medium line-clamp-2">{surprise.title}</p>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Product Code</span>
            <span className="font-semibold text-foreground">
              {surprise.productCode}
            </span>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Price</span>
            <span
              className={
                discount > 0 ? "line-through text-muted-foreground" : ""
              }
            >
              ৳{basePrice.toFixed(2)}
            </span>
          </div>

          {discount > 0 && (
            <>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount ({discount}%)</span>
                <span>-৳{discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">
                  ৳{priceAfterDiscount.toFixed(2)}
                </span>
              </div>
            </>
          )}

          <div className="flex justify-between text-sm">
            <span>Delivery Charge</span>
            <span>৳{deliveryCharge.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-surprise-pink">৳{total.toFixed(2)}</span>
        </div>

        {/* Place Order Button */}
        <Button
          className="w-full"
          style={{
            background:
              "linear-gradient(to right, var(--surprise-pink, #ec4899), var(--surprise-purple, #a855f7))",
          }}
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </Button>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure Checkout</span>
        </div>
      </CardContent>
    </Card>
  );
}
