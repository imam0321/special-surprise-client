import SharedOrdersManagement from "@/components/modules/Shared/Dashboard/SharedOrdersManagement";

export default function OrdersManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <SharedOrdersManagement searchParams={searchParams} />;
}

