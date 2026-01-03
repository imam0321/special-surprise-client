"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, MapPin } from "lucide-react";
import { useState } from "react";

interface ShippingInfoProps {
  onPaymentMethodChange?: (method: string) => void;
}

export default function ShippingInfo({ onPaymentMethodChange }: ShippingInfoProps) {
  const [paymentMethod, setPaymentMethod] = useState("online-payment");

  const handlePaymentChange = (value: string) => {
    setPaymentMethod(value);
    onPaymentMethodChange?.(value);
  };

  return (
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
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" name="firstName" placeholder="Enter first name" required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" name="lastName" placeholder="Enter last name" required />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input 
              id="phone" 
              name="phone"
              type="tel"
              placeholder="01XXX-XXXXXX" 
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Full Address *</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="House no, Road no, Area, City"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input id="city" name="city" placeholder="e.g. Dhaka" required />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" name="zipCode" placeholder="1200" />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
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
            onValueChange={handlePaymentChange}
            className="space-y-4"
          >
            {/* Online Payment */}
            <div
              className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                paymentMethod === "online-payment"
                  ? "border-surprise-pink bg-surprise-pink/5"
                  : "border-border hover:border-surprise-pink/50"
              }`}
              onClick={() => handlePaymentChange("online-payment")}
            >
              <RadioGroupItem value="online-payment" id="online-payment" />
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
  );
}