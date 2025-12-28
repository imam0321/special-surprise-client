import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function MyProfilePage() {
    const userInfo = await getUserInfo();
    console.log(userInfo)
  return (
    <div>MyProfilePage {userInfo?.name}</div>
  )
}