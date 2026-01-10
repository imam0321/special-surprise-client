import ProfileForm from "@/components/modules/Profile/ProfileForm";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function ProfilePage() {
  const userInfo = await getUserInfo();

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <ManagementPageHeader title="My Profile" />
      <ProfileForm userInfo={userInfo} />
    </div>
  );
}
