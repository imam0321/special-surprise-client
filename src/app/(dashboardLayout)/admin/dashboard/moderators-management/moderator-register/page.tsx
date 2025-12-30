import { Card, CardContent } from "@/components/ui/card";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import ModeratorRegisterForm from "@/components/modules/Admin/ModeratorsManagement/ModeratorRegisterForm";

export default function ModeratorRegisterPage() {
  return (
    <div className="space-y-1">
      <ManagementPageHeader
        title="Moderator Registration"
        description="This is a Moderator Registration"
      />

      <Card className="w-full max-w-3xl">
        <CardContent>
          <ModeratorRegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
