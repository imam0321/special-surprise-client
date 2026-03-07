import ChangePasswordForm from "@/components/modules/Auth/ChangePasswordForm";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

export default function ChangePasswordPage() {
  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Change Password"
        description="This is a Change Password"
      />
      <div className="flex items-center gap-2">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
