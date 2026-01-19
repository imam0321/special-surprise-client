import { getAllCategories } from "@/services/product/categories";
import SurpriseFilters from "./SurpriseFilters";

export default async function SurpriseFiltersLoader() {
  const categories = await getAllCategories("");
  return <SurpriseFilters categories={categories?.data || []} />;
}
