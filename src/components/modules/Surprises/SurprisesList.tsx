import { getAllProduct } from "@/services/product/product";
import { Product } from "@/types/product.interface";
import { AlertCircle, XCircle } from "lucide-react";
import SurpriseCard from "./SurpriseCard";
import PaginationHelper from "@/components/shared/PaginationHelper";

export default async function SurprisesList({
  queryParams,
}: {
  queryParams: URLSearchParams;
}) {
  const surprises = await getAllProduct(queryParams.toString());

  if (!surprises?.data) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center text-muted-foreground my-10">
        <AlertCircle className="w-12 h-12 mb-4 text-yellow-500" />
        <p className="font-bold text-center text-lg">
          Failed to load surprises
        </p>
        <p className="text-sm text-center mt-2">Please try again later</p>
      </div>
    );
  }

  if (surprises.data.length === 0) {
    return (
      <div className="col-span-full">
        <div className="flex flex-col items-center justify-center text-muted-foreground my-10">
          <XCircle className="w-12 h-12 mb-4 text-red-400" />
          <p className="font-bold text-center text-lg">No surprise found</p>
          <p className="text-sm text-center mt-2">
            Try adjusting your filters or search term
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {surprises.data.map((surprise: Product) => (
          <SurpriseCard key={surprise.id} surprise={surprise} />
        ))}
      </div>

      {surprises?.meta?.totalPages > 1 && (
        <PaginationHelper
          currentPage={surprises.meta.page}
          totalPages={surprises.meta.totalPages}
        />
      )}
    </>
  );
}
