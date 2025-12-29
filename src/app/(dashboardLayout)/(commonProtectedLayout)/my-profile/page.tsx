import ProfileForm from "@/components/modules/Profile/ProfileForm";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function ProfilePage() {
  const userInfo = await getUserInfo();

  if (!userInfo) return <div>Loading...</div>;

  return (
    <section className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <ProfileForm userInfo={userInfo} />
    </section>
  );
}
