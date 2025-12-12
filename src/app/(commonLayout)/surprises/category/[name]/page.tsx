import SurpriseCard from "@/components/modules/Surprises/SurpriseCard";
import SurpriseCardSkeleton from "@/components/modules/Surprises/SurpriseCardSkeleton";
import PaginationHelper from "@/components/shared/PaginationHelper";
import { getAllProduct } from "@/services/product/product";
import { Product } from "@/types/product.interface";

export default async function CategoryByNamePage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;

  const { data: surprises } = await getAllProduct({
    category: name,
  });

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-6">Surprises category by {name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {!surprises
          ? [1, 2, 3, 4].map((i) => <SurpriseCardSkeleton key={i} />)
          : surprises.map((surprise: Product) => (
              <SurpriseCard key={surprise.id} surprise={surprise} />
            ))}
      </div>

      {surprises?.meta?.totalPages > 1 && (
        <PaginationHelper
          currentPage={surprises?.meta?.page}
          totalPages={surprises?.meta?.totalPages}
        />
      )}
    </div>
  );
}
