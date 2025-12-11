import SurpriseCard from "@/components/modules/Surprises/SurpriseCard";
import SurpriseFilters from "@/components/modules/Surprises/SurpriseFilters";
import PaginationHelper from "@/components/shared/PaginationHelper";
import { getAllCategories } from "@/services/product/categories";
import { getAllProduct } from "@/services/product/product";
import { Product } from "@/types/product.interface";

export default async function SurprisesPage() {
  const surprises = await getAllProduct();
  const categories = await getAllCategories();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-6">All Surprises Gift</h1>

        {/* Filter and Products Grid */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 shrink">
            <SurpriseFilters categories={categories?.data} />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Products sorting and view options */}
            <div className="flex flex-wrap items-center justify-between gap-y-4 mb-6 pb-4 border-b">
              {/* search and filter */}
            </div>

            {/* Products Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {surprises &&
                surprises.data.map((surprise: Product) => (
                  <SurpriseCard key={surprise.id} surprise={surprise} />
                ))}
            </div>

            {/* Pagination */}
            <PaginationHelper />
          </div>
        </div>
      </div>
    </div>
  );
}
