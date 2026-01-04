// CategorySelect.tsx
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types/product.interface";

interface CategorySelectProps {
  selectedCategoryId: string;
  availableCategories: Category[];
  onCategoryChange: (id: string) => void;
  disabled?: boolean;
}

export default function CategorySelect({
  selectedCategoryId,
  availableCategories,
  onCategoryChange,
  disabled,
}: CategorySelectProps) {
  return (
    <Field>
      <FieldLabel htmlFor="category">
        Category <span className="text-red-500">*</span>
      </FieldLabel>

      <Select value={selectedCategoryId} onValueChange={onCategoryChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {availableCategories.length > 0 ? (
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

      <Input type="hidden" name="categoryId" value={selectedCategoryId} />
    </Field>
  );
}
