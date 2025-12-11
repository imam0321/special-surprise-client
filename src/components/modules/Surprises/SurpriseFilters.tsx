"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/product.interface";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

export default function SurpriseFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectCategory, setSelectCategory] = useState<string>("");

  const memoizedCategories = useMemo(() => categories, [categories]);

  const handleCategoryChange = (value: string) => {
    setSelectCategory(value);

    const query = new URLSearchParams(searchParams.toString());
    query.set("category", value);

    router.push(`?${query.toString()}`);
  };

  const handlePriceRangeClick = (min: string, max: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("min", min);
    query.set("max", max);

    router.push(`?${query.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* PRICE RANGE */}
        <div>
          <h3 className="font-medium mb-4">Price Range</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs mb-1 block">Min</label>
              <Input id="min" type="number" min="0" defaultValue={0} />
            </div>
            <div>
              <label className="text-xs mb-1 block">Max</label>
              <Input id="max" type="number" min="0" defaultValue={0} />
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="w-full mt-3 hover:bg-surprise-purple/15"
            onClick={() => {
              const min = (document.getElementById("min") as HTMLInputElement)
                ?.value;
              const max = (document.getElementById("max") as HTMLInputElement)
                ?.value;

              handlePriceRangeClick(min, max);
            }}
          >
            Apply
          </Button>
        </div>

        <Separator />

        {/* CATEGORY SELECT */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Category
          </label>

          <Select
            onValueChange={handleCategoryChange}
            value={selectCategory}
            disabled={!memoizedCategories}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            {/* Scroll after 4 items */}
            <SelectContent className="max-h-48 overflow-y-auto">
              {memoizedCategories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* RESET */}
        <Button
          variant="outline"
          size="sm"
          className="w-full hover:bg-surprise-purple/15"
          onClick={() => {
            setSelectCategory("");
            router.push("?");
          }}
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
