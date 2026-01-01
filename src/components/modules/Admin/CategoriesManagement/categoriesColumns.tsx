"use client";
import { Column } from "@/components/shared/ManagementTable";
import { Category } from "@/types/product.interface";

export const categoriesColumns: Column<Category>[] = [
  {
    header: "Category",
    accessor: (category) => (
      <div className="flex flex-col">
        <span className="text-sm">{category.name}</span>
      </div>
    ),
  },
  {
    header: "Products",
    accessor: (category) => (
      <div className="flex flex-col">
        <span className="text-sm">{category?._count?.products || 0}</span>
      </div>
    ),
  },
];
