import { Card, CardContent } from "@/components/ui/card";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import ModeratorRegisterForm from "@/components/modules/Admin/ModeratorsManagement/ModeratorRegisterForm";

export default async function ModeratorRegisterPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {
  const params = (await searchParams) || {};
  return (
    <div className="space-y-1">
      <ManagementPageHeader
        title="Moderator Registration"
        description="This is a Moderator Registration"
      />

      <Card className="w-full max-w-3xl">
        <CardContent>
          <ModeratorRegisterForm redirectPath={params?.redirect} />
        </CardContent>
      </Card>
    </div>
  );
}
