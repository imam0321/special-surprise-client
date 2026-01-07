"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { CreditCard, Globe, Home, MapPin } from "lucide-react";



export default function ShippingInfo() {
  const [paymentMethod] = useState("online-payment");

  return (
    <form
      className="lg:col-span-2 space-y-6"
    >
      {/* Delivery Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-surprise-pink" />
            Delivery Information
          </CardTitle>
          <CardDescription>Provide delivery details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Receiver Name *</FieldLabel>
              <Input name="receiverName" placeholder="Enter receiver name" required />
            </Field>

            <Field>
              <FieldLabel>Receiver Phone *</FieldLabel>
              <Input name="receiverPhone" type="tel" placeholder="01XXX-XXXXXX" required />
            </Field>
          </div>

          <Field>
            <FieldLabel>Email Address *</FieldLabel>
            <Input name="email" type="email" placeholder="your.email@example.com" required />
          </Field>

          <Field>
            <FieldLabel>Receiver Country *</FieldLabel>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input name="country" placeholder="Enter country" className="pl-10" required />
            </div>
          </Field>

          <Field>
            <FieldLabel>Receiver City *</FieldLabel>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input name="city" placeholder="Enter city" className="pl-10" required />
            </div>
          </Field>

          <Field>
            <FieldLabel>Receiver Address Detail *</FieldLabel>
            <div className="relative">
              <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                name="address_detail"
                placeholder="Enter street/house"
                rows={2}
                className="pl-10 w-full resize-none"
                required
              />
            </div>
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Delivery Date *</FieldLabel>
              <Input type="date" name="deliveryDate" required />
            </Field>
            <Field>
              <FieldLabel>Delivery Time *</FieldLabel>
              <Input type="time" name="deliveryTime" required />
            </Field>
          </div>

          <Field>
            <FieldLabel>Order Notes (Optional)</FieldLabel>
            <Textarea name="notes" rows={2} placeholder="Special instructions for delivery" />
          </Field>
        </CardContent>
      </Card>

      {/* Payment Method (Online only) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-surprise-pink" />
            Payment Method
          </CardTitle>
          <CardDescription>Online payment only</CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <FieldLabel>Payment Method</FieldLabel>
            <div className="flex items-center gap-3 p-4 border rounded-lg bg-surprise-pink/5">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <span className="font-medium">Online Payment (Cards, Mobile Banking, Net Banking)</span>
            </div>
            <Input type="hidden" name="paymentMethod" value={paymentMethod} />
          </Field>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="pt-4">
        <Button type="submit" className="w-full bg-linear-to-r from-pink-500 to-purple-500 text-white">
          Place Order
        </Button>
      </div>
    </form>
  );
}
