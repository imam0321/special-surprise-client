import SurpriseFilters from "@/components/modules/Surprises/SurpriseFilters";
import SurprisesList from "@/components/modules/Surprises/SurprisesList";
import SurprisesLoading from "@/components/modules/Surprises/SurprisesLoading";
import SurprisesSearch from "@/components/modules/Surprises/SurprisesSearch";
import { getAllCategories } from "@/services/product/categories";
import { Suspense } from "react";

export default async function SurprisesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;

  const queryParams = new URLSearchParams();
  const validParams = ["searchTerm", "category", "min", "max", "page"];

  validParams.forEach((param) => {
    if (searchParamsObj[param]) {
      queryParams.set(param, String(searchParamsObj[param]));
    }
  });

  const categories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-6">All Surprises Gift</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filter - Sticky */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-4">
            <SurpriseFilters categories={categories?.data} />
          </div>
        </aside>

        {/* Products Section */}
        <div className="flex-1 min-w-0">
          {/* Search Bar */}
          <div className="flex justify-end gap-y-4 mb-6 pb-4 border-b">
            <SurprisesSearch />
          </div>

          {/* Products Grid with Suspense */}
          <Suspense
            key={queryParams.toString()}
            fallback={<SurprisesLoading />}
          >
            <SurprisesList queryParams={queryParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
