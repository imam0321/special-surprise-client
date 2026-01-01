"use client";
import { Column } from "@/components/shared/ManagementTable";
import UserAvatar from "@/components/shared/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product.interface";

export const surprisesColumns: Column<Product>[] = [
  {
    header: "Image",
    accessor: (surprise) => (
      <UserAvatar name={surprise.title} image={surprise.thumbnail} size="sm" />
    ),
  },

  {
    header: "Title",
    accessor: (surprise) => (
      <div className="w-52">
        <span className="text-sm w-52 text-wrap">{surprise.title}</span>
      </div>
    ),
  },
  {
    header: "Code",
    accessor: (surprise) => (
      <div className="flex flex-col">
        <span className="text-sm">{surprise.productCode}</span>
      </div>
    ),
  },
  {
    header: "Price",
    accessor: (surprise) => (
      <div className="flex flex-col">
        <span className="text-sm">{surprise.price}</span>
      </div>
    ),
  },
  {
    header: "Delivery",
    accessor: (surprise) => (
      <div className="flex flex-col">
        <span className="text-sm">{surprise.deliveryCharge}</span>
      </div>
    ),
  },
  {
    header: "Discounted",
    accessor: (surprise) => (
      <div className="flex flex-col">
        <span className="text-sm">{surprise.discountedPrice}%</span>
      </div>
    ),
  },
  {
    header: "Category",
    accessor: (surprise) => (
      <Badge className="bg-surprise-pink text-white">
        {surprise.category.name}
      </Badge>
    ),
  },
];
