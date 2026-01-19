import SharedSurprisesManagement from "@/components/modules/Shared/Dashboard/SharedSurprisesManagement";

export default function SurprisesManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <SharedSurprisesManagement searchParams={searchParams} />;
}

