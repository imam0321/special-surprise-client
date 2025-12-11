import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/product.interface";

export default function SurpriseFilters({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-4">Price Range</h3>
          <div className="mt-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs mb-1">Min</Label>
                <Input type="number" min="0" defaultValue={0} />
              </div>
              <div>
                <Label className="text-xs mb-1">Max</Label>
                <Input type="number" min="0" defaultValue={0} />
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full">
              Apply
            </Button>
          </div>
        </div>

        <Separator />

        {/* Occasion */}
        <div>
          <h3 className="font-medium mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category: Category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={`desktop-${category.id}`} />
                <Label htmlFor={`desktop-${category.id}`} className="text-sm">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />

        {/* Reset Filters */}
        <Button variant="outline" size="sm" className="w-full">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
