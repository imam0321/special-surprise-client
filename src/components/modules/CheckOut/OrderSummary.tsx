"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/product.interface";
import { Package } from "lucide-react";

interface OrderSummaryProps {
  surprise: Product;
  isPending: boolean;
}

export default function OrderSummary({
  surprise,
  isPending,
}: OrderSummaryProps) {
  if (!surprise) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No product data available.
        </CardContent>
      </Card>
    );
  }

  const basePrice = Number(surprise.price) || 0;
  const discount = Number(surprise.discountedPrice) || 0;
  const deliveryCharge = Number(surprise.deliveryCharge) || 0;

  const discountAmount = discount > 0 ? (basePrice * discount) / 100 : 0;
  const priceAfterDiscount = basePrice - discountAmount;
  const total = priceAfterDiscount + deliveryCharge;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-surprise-pink" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
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
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-surprise-pink">৳{total.toFixed(2)}</span>
        </div>

        {/* Place Order Button */}
        <input type="hidden" name="productId" value={surprise.id} />
        <input type="hidden" name="amount" value={total} />
        <Button
          className="w-full text-white bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Place Order"}
        </Button>
      </CardContent>
    </Card>
  );
}
