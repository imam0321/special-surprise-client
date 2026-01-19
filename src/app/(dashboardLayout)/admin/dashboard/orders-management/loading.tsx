import { ManagementPageLoading } from '@/components/shared/ManagementPageLoading'


export default function OrdersManagementLoading() {
  return (
    <ManagementPageLoading
      columns={6}
      filterCount={2}
      filterWidths={["w-48", "w-32", "w-40", "w-24", "w-36", "w-24"]}
    />
  )
}
