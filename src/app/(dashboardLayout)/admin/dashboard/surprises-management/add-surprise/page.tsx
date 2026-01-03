import AddSurpriseForm from "@/components/modules/Admin/SurprisesManagement/AddSurpriseForm";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCategories } from "@/services/product/categories";

export default async function AddSurprisePage() {
  const categories = await getAllCategories("");
  return (
    <div className="space-y-1">
      <ManagementPageHeader
        title="Create Surprise"
        description="This is a Create Surprise"
      />

      <Card className="w-full max-w-3xl">
        <CardContent>
          <AddSurpriseForm categories={categories?.data || []} />
        </CardContent>
      </Card>
    </div>
  );
}
