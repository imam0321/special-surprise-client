import ProfileForm from "@/components/modules/Profile/ProfileForm";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function ProfilePage() {
  const userInfo = await getUserInfo();

  return <ProfileForm userInfo={userInfo} />;
}
