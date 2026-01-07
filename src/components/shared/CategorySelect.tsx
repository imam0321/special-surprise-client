import { FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/product.interface";

interface CategorySelectProps {
  selectedCategoryId: string;
  availableCategories: Category[];
  onCategoryChange: (id: string) => void;
  disabled?: boolean;
  name?: string;
}

export default function CategorySelect({
  selectedCategoryId,
  availableCategories,
  onCategoryChange,
  disabled,
  name = "categoryId",
}: CategorySelectProps) {
  return (
    <>
      <FieldLabel>
        Category <span className="text-red-500">*</span>
      </FieldLabel>

      <Select
        value={selectedCategoryId || undefined}
        onValueChange={onCategoryChange}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>

        <SelectContent>
          {availableCategories?.length > 0 ? (
            availableCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="none" disabled>
              No categories available
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Form submit এর জন্য hidden input */}
      <input type="hidden" name={name} value={selectedCategoryId || ""} />
    </>
  );
}
