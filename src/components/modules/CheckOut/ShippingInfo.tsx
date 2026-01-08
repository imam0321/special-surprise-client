/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { MapPin, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, addDays } from "date-fns";
import InputFieldError from "@/components/shared/InputFieldError";

export default function ShippingInfo({ state }: any) {
  const [deliveryDate, setDeliveryDate] = useState<string>(state?.formData?.deliveryDate || "");
  const [dateOpen, setDateOpen] = useState(false);
  const minDate = addDays(new Date(), 2);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const isoDate = format(date, "yyyy-MM-dd");
      setDeliveryDate(isoDate);
      setDateOpen(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-1 text-xl">
          <MapPin className="h-5 w-5 text-surprise-pink" /> Delivery Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Receiver Name *</FieldLabel>
            <Input
              name="receiverName"
              placeholder="Receiver name"
              defaultValue={state?.formData?.receiverName || ""}
            />
            <InputFieldError field="receiverName" state={state} />
          </Field>

          <Field>
            <FieldLabel>Receiver Phone *</FieldLabel>
            <Input
              name="receiverPhone"
              type="tel"
              placeholder="01XXX-XXXXXX"
              defaultValue={state?.formData?.receiverPhone || ""}
            />
            <InputFieldError field="receiverPhone" state={state} />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Delivery Date *</FieldLabel>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start pl-3 h-11 font-normal">
                  {deliveryDate ? format(new Date(deliveryDate), "PPP") : "Select delivery date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deliveryDate ? new Date(deliveryDate) : undefined}
                  onSelect={handleDateChange}
                  disabled={(date) => date < minDate}
                />
              </PopoverContent>
            </Popover>
            <input type="hidden" name="deliveryDate" value={deliveryDate} />
            <InputFieldError field="deliveryDate" state={state} />
          </Field>

          <Field>
            <FieldLabel>Delivery Time *</FieldLabel>
            <Input
              type="time"
              name="deliveryTime"
              defaultValue={state?.formData?.deliveryTime || ""}
            />
            <InputFieldError field="deliveryTime" state={state} />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Country *</FieldLabel>
            <Input
              name="country"
              placeholder="e.g., BD"
              defaultValue={state?.formData?.orderAddress?.country || ""}
            />
            <InputFieldError field="orderAddress.country" state={state} />
          </Field>

          <Field>
            <FieldLabel>City *</FieldLabel>
            <Input
              name="city"
              placeholder="e.g., Dhaka"
              defaultValue={state?.formData?.orderAddress?.city || ""}
            />
            <InputFieldError field="orderAddress.city" state={state} />
          </Field>
        </div>

        <Field>
          <FieldLabel>Street Address *</FieldLabel>
          <Textarea
            name="address_detail"
            placeholder="House/Flat number, Street name..."
            defaultValue={state?.formData?.orderAddress?.address_detail || ""}
          />
          <InputFieldError field="orderAddress.address_detail" state={state} />
        </Field>
      </CardContent>
    </Card>
  );
}