import AddSurpriseForm from "@/components/modules/Admin/SurprisesManagement/AddSurpriseForm";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCategories } from "@/services/product/categories";
import { getProductByCode } from "@/services/product/product";

export default async function EditSurprisePage({
  params,
}: {
  params: { productCode: string };
}) {
  const { productCode } = await params;
  const [surprise, categories] = await Promise.all([
    getProductByCode(productCode),
    getAllCategories(""),
  ]);

  return (
    <div className="space-y-1">
      <ManagementPageHeader
        title="Edit Surprise"
        description="This is a Edit Surprise"
      />

      <Card className="w-full max-w-3xl">
        <CardContent>
          <AddSurpriseForm
            surprise={surprise?.data || ""}
            categories={categories?.data || []}
          />
        </CardContent>
      </Card>
    </div>
  );
}
