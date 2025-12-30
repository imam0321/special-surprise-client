import AddSurpriseForm from "@/components/modules/Admin/SurprisesManagement/AddSurpriseForm";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function AddSurprisePage() {
  return (
    <div className="space-y-1">
      <ManagementPageHeader
        title="Create Surprise"
        description="This is a Create Surprise"
      />

      <Card className="w-full max-w-3xl">
        <CardContent>
          <AddSurpriseForm />
        </CardContent>
      </Card>
    </div>
  );
}
