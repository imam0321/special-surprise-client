import SharedUsersManagement from "@/components/modules/Shared/Dashboard/SharedUsersManagement";

export default function UsersManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <SharedUsersManagement searchParams={searchParams} />;
}

