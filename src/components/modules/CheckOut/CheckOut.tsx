"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck, ShieldCheck, MapPin, Package } from "lucide-react";

export default function CheckOut() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart items
  const cartItems = [
    { id: 1, name: "Birthday Balloon Surprise", price: 3500, quantity: 1 },
    { id: 2, name: "Anniversary Rose Box", price: 5500, quantity: 1 },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 100;
  const total = subtotal + deliveryCharge;

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      // toast({
      //   title: "Order Placed Successfully! 🎉",
      //   description: `Your order has been confirmed. Payment method: ${paymentMethod.toUpperCase()}`,
      // });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-surprise-pink" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="01XXX-XXXXXX" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    placeholder="House no, Road no, Area, City"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="e.g. Dhaka" />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" placeholder="1200" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Special instructions for delivery"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-surprise-pink" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  {/* Cash on Delivery */}
                  <div
                    className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "cod"
                        ? "border-surprise-pink bg-surprise-pink/5"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="cod" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Truck className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Pay when you receive your order
                        </p>
                      </div>
                    </Label>
                  </div>

                  {/* Online Payment */}
                  <div
                    className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "online-payment"
                        ? "border-surprise-pink bg-surprise-pink/5"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem
                      value="online-payment"
                      id="online-payment"
                    />
                    <Label
                      htmlFor="online-payment"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Online Payment</p>
                        <p className="text-sm text-muted-foreground">
                          Cards, Mobile Banking, Net Banking
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-surprise-pink" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">৳{item.price}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Charge</span>
                    <span>৳{deliveryCharge}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-surprise-pink">৳{total}</span>
                </div>

                <Button
                  className="w-full bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure Checkout</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
